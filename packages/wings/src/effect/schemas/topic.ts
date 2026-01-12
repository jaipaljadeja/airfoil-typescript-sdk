import { Schema as ArrowSchema } from "apache-arrow";
import { Schema as EffectSchema } from "effect";

import type { FieldConfig } from "../../lib/arrow";

// Schema for FieldConfig - validates that it's a valid field configuration
const FieldConfigSchema = EffectSchema.declare(
  (input: unknown): input is FieldConfig => {
    // Basic validation - check if it has required base properties
    if (typeof input !== "object" || input === null) return false;
    const obj = input as Record<string, unknown>;
    return (
      typeof obj.name === "string" &&
      typeof obj.nullable === "boolean" &&
      typeof obj.dataType === "string"
    );
  },
  {
    identifier: "FieldConfig",
    description: "A valid Arrow field configuration",
  },
);

// Schema for Apache Arrow Schema - validates it's an Arrow Schema instance
const ArrowSchemaSchema = EffectSchema.instanceOf(ArrowSchema, {
  identifier: "ArrowSchema",
  description: "An Apache Arrow Schema instance",
});

export const CompactionConfiguration = EffectSchema.Struct({
  /** How often to compact the topic, in seconds. */
  freshnessSeconds: EffectSchema.BigIntFromSelf,
  /** How long to keep the topic data, in seconds. */
  ttlSeconds: EffectSchema.optional(EffectSchema.BigIntFromSelf),
});

export type CompactionConfiguration = typeof CompactionConfiguration.Type;

export const CreateTopicRequest = EffectSchema.Struct({
  /**
   * The namespace that owns the topic.
   *
   * Format: tenants/{tenant}/namespaces/{namespace}
   */
  parent: EffectSchema.String,
  /** The topic id. */
  topicId: EffectSchema.String,
  /** The fields in the topic messages. */
  fields: EffectSchema.Array(FieldConfigSchema),
  /** The topic description. */
  description: EffectSchema.optional(EffectSchema.String),
  /** The index of the field that is used to partition the topic. */
  partitionKey: EffectSchema.optional(EffectSchema.Number),
  /** The topic compaction configuration. */
  compaction: CompactionConfiguration,
});

export type CreateTopicRequest = typeof CreateTopicRequest.Type;

export const GetTopicRequest = EffectSchema.Struct({
  /**
   * The topic name.
   *
   * Format: tenants/{tenant}/namespaces/{namespace}/topics/{topic}
   */
  name: EffectSchema.String,
});

export type GetTopicRequest = typeof GetTopicRequest.Type;

export const ListTopicsRequest = EffectSchema.Struct({
  /**
   * The parent namespace.
   *
   * Format: tenants/{tenant}/namespaces/{namespace}
   */
  parent: EffectSchema.String,
  /** The number of topics to return. */
  pageSize: EffectSchema.optional(EffectSchema.Number),
  /** The continuation token. */
  pageToken: EffectSchema.optional(EffectSchema.String),
});

export type ListTopicsRequest = typeof ListTopicsRequest.Type;

export const Topic = EffectSchema.Struct({
  /**
   * The topic name.
   *
   * Format: tenants/{tenant}/namespaces/{namespace}/topics/{topic}
   */
  name: EffectSchema.String,
  /** The fields in the topic messages. */
  fields: EffectSchema.Array(FieldConfigSchema),
  /** The schema of the topic messages. */
  schema: ArrowSchemaSchema,
  /** The topic description. */
  description: EffectSchema.optional(EffectSchema.String),
  /** The index of the field that is used to partition the topic. */
  partitionKey: EffectSchema.optional(EffectSchema.Number),
  /** The topic compaction configuration. */
  compaction: CompactionConfiguration,
});

export type Topic = typeof Topic.Type;

export const ListTopicsResponse = EffectSchema.Struct({
  /** The topics. */
  topics: EffectSchema.Array(Topic),
  /** The continuation token. */
  nextPageToken: EffectSchema.String,
});

export type ListTopicsResponse = typeof ListTopicsResponse.Type;

export const DeleteTopicRequest = EffectSchema.Struct({
  /**
   * The topic name.
   *
   * Format: tenants/{tenant}/namespaces/{namespace}/topics/{topic}
   */
  name: EffectSchema.String,
  /** If set to true, also delete data associated with the topic. */
  force: EffectSchema.Boolean,
});

export type DeleteTopicRequest = typeof DeleteTopicRequest.Type;
