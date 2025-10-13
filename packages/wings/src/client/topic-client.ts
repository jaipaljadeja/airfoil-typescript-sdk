import type { ArrowFlightClient, Metadata } from "@airfoil/flight";
import type { Schema } from "apache-arrow";
import { WingsFlightDataEncoder } from "../encode/flight-encoder";
import { getClusterMetadataClient } from "../lib";
import type { FlightData, PutResult } from "../lib/types";
import { type DeserializedTopic, deserializeTopic } from "../lib/utils";
import type { PartitionValue } from "../proto/wings/log_metadata";
import type {
  AcceptedBatchInfo,
  RejectedBatchInfo,
} from "../proto/wings/utils";

export interface PushOptions {
  partitionValue?: PartitionValue;
  timestamp?: Date;
}

export interface PushResult {
  requestId: bigint;
  accepted?: AcceptedBatchInfo;
  rejected?: RejectedBatchInfo;
}

type TopicClientOptions = {
  flightClient: ArrowFlightClient;
  namespace: string;
  topicName: string;
  schema: Schema;
  metadata: Metadata;
};

export class TopicClient {
  private readonly encoder: WingsFlightDataEncoder;
  private nextRequestId = BigInt(1);

  constructor(private readonly options: TopicClientOptions) {
    this.encoder = new WingsFlightDataEncoder();
  }

  async push(
    data: Record<string, unknown> | Record<string, unknown>[],
    options: PushOptions = {},
  ): Promise<void> {
    const requestId = this.nextRequestId++;

    const requestStream = this.createRequestStream(data, requestId, options);

    const responseStream = this.options.flightClient.doPut(requestStream, {
      metadata: this.options.metadata,
    });

    return this.waitForResponse(responseStream, requestId);
  }

  private async *createRequestStream(
    data: Record<string, unknown> | Record<string, unknown>[],
    requestId: bigint,
    options: PushOptions,
  ): AsyncIterable<FlightData> {
    const schemaMessage = this.encoder.encodeSchema(
      this.options.topicName,
      this.options.schema,
    );
    console.log("schemaMessage", schemaMessage);
    yield schemaMessage;

    try {
      const dataMessage = this.encoder.encodeJsonData(
        data,
        this.options.schema,
        {
          requestId,
          partitionValue: options.partitionValue,
          timestamp: options.timestamp,
        },
      );
      console.log("dataMessage", dataMessage);
      yield dataMessage;
    } catch (error) {
      console.error("Error encoding data message:", error);
      throw error;
    }
  }

  private async waitForResponse(
    responseStream: AsyncIterable<PutResult>,
    _requestId: bigint,
  ): Promise<void> {
    try {
      for await (const putResult of responseStream) {
        console.log("putResult", putResult);
      }
    } catch (error) {
      throw new Error(`Error waiting for response`, { cause: error });
    }
  }

  static async getTopic(
    topicName: string,
    connectionString: string,
  ): Promise<DeserializedTopic> {
    const flightClient = getClusterMetadataClient({ connectionString });
    const topic = await flightClient.getTopic({ name: topicName });
    const deserializedTopic = deserializeTopic(topic);
    return deserializedTopic;
  }
}
