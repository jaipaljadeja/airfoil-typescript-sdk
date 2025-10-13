import { type Field, Schema } from "apache-arrow";
import { Schema as _Schema } from "apache-arrow/fb/schema";
import { toUint8Array } from "apache-arrow/util/buffer";
import * as flatbuffers from "flatbuffers";
import type * as proto from "../proto";

/**
 * Deserializes an Apache Arrow Schema from bytes using flatbuffers
 * @param bytes - The bytes to deserialize
 * @returns The deserialized Apache Arrow Schema
 */
export function deserializeArrowSchema(bytes: Uint8Array): Schema {
  const byteBuffer = new flatbuffers.ByteBuffer(toUint8Array(bytes));
  const _schema = _Schema.getRootAsSchema(byteBuffer);
  return Schema.decode(_schema);
}

// client types
export type DeserializedTopic = {
  name: string;
  schema: Schema;
  fields: Field[];
  partitionKey?: number;
};

export function deserializeTopic(
  topic: proto.cluster_metadata.Topic,
): DeserializedTopic {
  const deserializedSchema = deserializeArrowSchema(topic.fields);
  return {
    ...topic,
    fields: deserializedSchema.fields,
    schema: deserializedSchema,
  };
}
