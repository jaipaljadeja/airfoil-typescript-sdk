import { Schema } from "effect";

export const CreateNamespaceRequest = Schema.Struct({
  /**
   * The tenant that owns the namespace.
   *
   * Format: tenants/{tenant}
   */
  parent: Schema.String,
  /** The namespace id. */
  namespaceId: Schema.String,
  /** The size at which the current segment is flushed to object storage. */
  flushSizeBytes: Schema.BigIntFromSelf,
  /** The maximum interval at which the current segment is flushed to object storage (in milliseconds). */
  flushIntervalMillis: Schema.BigIntFromSelf,
  /** The object store used by this namespace. */
  objectStore: Schema.String,
  /** The data lake used by this namespace. */
  dataLake: Schema.String,
});

export type CreateNamespaceRequest = typeof CreateNamespaceRequest.Type;

export const GetNamespaceRequest = Schema.Struct({
  /**
   * The namespace name.
   *
   * Format: tenants/{tenant}/namespaces/{namespace}
   */
  name: Schema.String,
});

export type GetNamespaceRequest = typeof GetNamespaceRequest.Type;

export const ListNamespacesRequest = Schema.Struct({
  /**
   * The tenant name.
   *
   * Format: tenants/{tenant}
   */
  parent: Schema.String,
  /** The number of namespaces to return. */
  pageSize: Schema.optional(Schema.Number),
  /** The continuation token. */
  pageToken: Schema.optional(Schema.String),
});

export type ListNamespacesRequest = typeof ListNamespacesRequest.Type;

export const Namespace = Schema.Struct({
  /**
   * The namespace name.
   *
   * Format: tenants/{tenant}/namespaces/{namespace}
   */
  name: Schema.String,
  /** The size at which the current segment is flushed to object storage. */
  flushSizeBytes: Schema.BigIntFromSelf,
  /** The maximum interval at which the current segment is flushed to object storage (in milliseconds). */
  flushIntervalMillis: Schema.BigIntFromSelf,
  /** The object store used by this namespace. */
  objectStore: Schema.String,
  /** The data lake used by this namespace. */
  dataLake: Schema.String,
});

export type Namespace = typeof Namespace.Type;

export const ListNamespacesResponse = Schema.Struct({
  /** The namespaces. */
  namespaces: Schema.Array(Namespace),
  /** The continuation token. */
  nextPageToken: Schema.String,
});

export type ListNamespacesResponse = typeof ListNamespacesResponse.Type;

export const DeleteNamespaceRequest = Schema.Struct({
  /**
   * The namespace name.
   *
   * Format: tenants/{tenant}/namespaces/{namespace}
   */
  name: Schema.String,
});

export type DeleteNamespaceRequest = typeof DeleteNamespaceRequest.Type;
