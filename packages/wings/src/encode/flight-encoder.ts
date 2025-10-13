import { proto as proto_flight } from "@airfoil/flight";
import { type RecordBatch, type Schema, tableFromJSON } from "apache-arrow";
import * as metadata from "apache-arrow/ipc/metadata/message";
import { Message } from "apache-arrow/ipc/metadata/message";
import { VectorAssembler } from "apache-arrow/visitor/vectorassembler";
import type { FlightData } from "../lib/types";
import * as proto from "../proto";

export interface EncodeOptions {
  requestId: bigint;
  partitionValue?: proto.log_metadata.PartitionValue;
  timestamp?: Date;
}

export class WingsFlightDataEncoder {
  encodeSchema(topicName: string, schema: Schema): FlightData {
    const message = Message.from(schema);
    const messageBytes = Message.encode(message);

    return {
      flightDescriptor: {
        type: proto_flight.arrow_flight.FlightDescriptor_DescriptorType.PATH,
        cmd: new Uint8Array(),
        path: [topicName],
      },
      dataHeader: messageBytes,
      appMetadata: new Uint8Array(),
      dataBody: new Uint8Array(),
    };
  }

  encodeRecordBatch(batch: RecordBatch, options: EncodeOptions): FlightData {
    const requestMetadata: proto.utils.IngestionRequestMetadata = {
      requestId: options.requestId,
      partitionValue: options.partitionValue,
      timestamp: options.timestamp,
    };

    const { byteLength, nodes, bufferRegions } =
      VectorAssembler.assemble(batch);

    const metadataRecordBatch = new metadata.RecordBatch(
      batch.numRows,
      nodes,
      bufferRegions,
      null,
    );

    const message = Message.from(metadataRecordBatch, byteLength);

    const messageHeader = Message.encode(message);

    // const writer = new RecordBatchStreamWriter();
    // writer.write(batch);
    // const dataBody = writer.toUint8Array(true);

    return {
      flightDescriptor: undefined,
      // message = its a record batch and its metadata, num of rows, size etc
      dataHeader: messageHeader,
      // request metadata = its a request id, partition value, timestamp
      appMetadata:
        proto.utils.IngestionRequestMetadata.encode(requestMetadata).finish(),
      // data body = content of serialized arrow batch
      // dataBody: dataBody,
      dataBody: new Uint8Array(),
    };
  }

  jsonToRecordBatch(
    data: Record<string, unknown> | Record<string, unknown>[],
    _schema: Schema,
  ): RecordBatch {
    const dataArray = Array.isArray(data) ? data : [data];

    const table = tableFromJSON(dataArray);

    const batches = [...table.batches];
    if (batches.length === 0) {
      throw new Error("No data to encode");
    }

    const batch = batches[0];

    return batch;
  }

  encodeJsonData(
    data: Record<string, unknown> | Record<string, unknown>[],
    schema: Schema,
    options: EncodeOptions,
  ): FlightData {
    const batch = this.jsonToRecordBatch(data, schema);
    return this.encodeRecordBatch(batch, options);
  }
}
