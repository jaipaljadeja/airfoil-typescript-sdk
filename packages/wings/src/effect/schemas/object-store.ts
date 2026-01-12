import { Schema } from "effect";

import { tag } from "./helpers";

export const AwsConfiguration = Schema.Struct({
  _tag: tag("aws"),
  aws: Schema.Struct({
    /** Bucket name. */
    bucketName: Schema.String,
    /** Bucket prefix. */
    prefix: Schema.optional(Schema.String),
    /** `AWS_ACCESS_KEY_ID` */
    accessKeyId: Schema.String,
    /** `AWS_SECRET_ACCESS_KEY` */
    secretAccessKey: Schema.String,
    /** `AWS_DEFAULT_REGION` */
    region: Schema.optional(Schema.String),
  }),
});

export type AwsConfiguration = typeof AwsConfiguration.Type;

export const AzureConfiguration = Schema.Struct({
  _tag: tag("azure"),
  azure: Schema.Struct({
    /** Azure container name. */
    containerName: Schema.String,
    /** Container prefix. */
    prefix: Schema.optional(Schema.String),
    /** `AZURE_STORAGE_ACCOUNT_NAME` */
    storageAccountName: Schema.String,
    /** `AZURE_STORAGE_ACCOUNT_KEY` */
    storageAccountKey: Schema.String,
  }),
});

export type AzureConfiguration = typeof AzureConfiguration.Type;

export const GoogleConfiguration = Schema.Struct({
  _tag: tag("google"),
  google: Schema.Struct({
    /** Bucket name. */
    bucketName: Schema.String,
    /** Bucket prefix. */
    prefix: Schema.optional(Schema.String),
    /** `GOOGLE_SERVICE_ACCOUNT` */
    serviceAccount: Schema.String,
    /** `GOOGLE_SERVICE_ACCOUNT_KEY` */
    serviceAccountKey: Schema.String,
  }),
});

export type GoogleConfiguration = typeof GoogleConfiguration.Type;

export const S3CompatibleConfiguration = Schema.Struct({
  _tag: tag("s3Compatible"),
  s3Compatible: Schema.Struct({
    /** Bucket name. */
    bucketName: Schema.String,
    /** Bucket prefix. */
    prefix: Schema.optional(Schema.String),
    /** `AWS_ACCESS_KEY_ID` */
    accessKeyId: Schema.String,
    /** `AWS_SECRET_ACCESS_KEY` */
    secretAccessKey: Schema.String,
    /** `AWS_DEFAULT_REGION` */
    region: Schema.optional(Schema.String),
    /** `AWS_ENDPOINT` */
    endpoint: Schema.String,
  }),
});

export type S3CompatibleConfiguration = typeof S3CompatibleConfiguration.Type;

export const ObjectStoreConfig = Schema.Union(
  AwsConfiguration,
  AzureConfiguration,
  GoogleConfiguration,
  S3CompatibleConfiguration,
);

export type ObjectStoreConfig = typeof ObjectStoreConfig.Type;

export const CreateObjectStoreRequest = Schema.Struct({
  /**
   * The tenant that owns the object store.
   *
   * Format: tenants/{tenant}
   */
  parent: Schema.String,
  /** The object store id. */
  objectStoreId: Schema.String,
  /** Object store configuration. */
  objectStoreConfig: ObjectStoreConfig,
});

export type CreateObjectStoreRequest = typeof CreateObjectStoreRequest.Type;

export const GetObjectStoreRequest = Schema.Struct({
  /**
   * The object store name.
   *
   * Format: tenants/{tenant}/object-stores/{object-store}
   */
  name: Schema.String,
});

export type GetObjectStoreRequest = typeof GetObjectStoreRequest.Type;

export const ListObjectStoresRequest = Schema.Struct({
  /**
   * The parent tenant.
   *
   * Format: tenants/{tenant}
   */
  parent: Schema.String,
  /** The number of object stores to return. */
  pageSize: Schema.optional(Schema.Number),
  /** The continuation token. */
  pageToken: Schema.optional(Schema.String),
});

export type ListObjectStoresRequest = typeof ListObjectStoresRequest.Type;

export const ObjectStore = Schema.Struct({
  /**
   * The object store name.
   *
   * Format: tenants/{tenant}/object-stores/{object-store}
   */
  name: Schema.String,
  /** Object store configuration. */
  objectStoreConfig: ObjectStoreConfig,
});

export type ObjectStore = typeof ObjectStore.Type;

export const ListObjectStoresResponse = Schema.Struct({
  /** The object stores. */
  objectStores: Schema.Array(ObjectStore),
  /** The continuation token. */
  nextPageToken: Schema.String,
});

export type ListObjectStoresResponse = typeof ListObjectStoresResponse.Type;

export const DeleteObjectStoreRequest = Schema.Struct({
  /**
   * The object store name.
   *
   * Format: tenants/{tenant}/object-stores/{object-store}
   */
  name: Schema.String,
});

export type DeleteObjectStoreRequest = typeof DeleteObjectStoreRequest.Type;
