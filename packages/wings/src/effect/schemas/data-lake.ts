import { Schema } from "effect";

import { tag } from "./helpers";

export const IcebergConfiguration = Schema.Struct({
  _tag: tag("iceberg"),
  iceberg: Schema.Struct({}),
});

export type IcebergConfiguration = typeof IcebergConfiguration.Type;

export const ParquetConfiguration = Schema.Struct({
  _tag: tag("parquet"),
  parquet: Schema.Struct({}),
});

export type ParquetConfiguration = typeof ParquetConfiguration.Type;

export const DataLakeConfig = Schema.Union(
  IcebergConfiguration,
  ParquetConfiguration,
);

export type DataLakeConfig = typeof DataLakeConfig.Type;

export const CreateDataLakeRequest = Schema.Struct({
  /**
   * The tenant that owns the data lake.
   *
   * Format: tenants/{tenant}
   */
  parent: Schema.String,
  /** The data lake id. */
  dataLakeId: Schema.String,
  /** Data lake configuration. */
  dataLakeConfig: DataLakeConfig,
});

export type CreateDataLakeRequest = typeof CreateDataLakeRequest.Type;

export const GetDataLakeRequest = Schema.Struct({
  /**
   * The data lake name.
   *
   * Format: tenants/{tenant}/data-lakes/{data-lake}
   */
  name: Schema.String,
});

export type GetDataLakeRequest = typeof GetDataLakeRequest.Type;

export const ListDataLakesRequest = Schema.Struct({
  /**
   * The parent tenant.
   *
   * Format: tenants/{tenant}
   */
  parent: Schema.String,
  /** The number of data lakes to return. */
  pageSize: Schema.optional(Schema.Number),
  /** The continuation token. */
  pageToken: Schema.optional(Schema.String),
});

export type ListDataLakesRequest = typeof ListDataLakesRequest.Type;

export const DataLake = Schema.Struct({
  /**
   * The data lake name.
   *
   * Format: tenants/{tenant}/data-lakes/{data-lake}
   */
  name: Schema.String,
  /** Data lake configuration. */
  dataLakeConfig: DataLakeConfig,
});

export type DataLake = typeof DataLake.Type;

export const ListDataLakesResponse = Schema.Struct({
  /** The data lakes. */
  dataLakes: Schema.Array(DataLake),
  /** The continuation token. */
  nextPageToken: Schema.String,
});

export type ListDataLakesResponse = typeof ListDataLakesResponse.Type;

export const DeleteDataLakeRequest = Schema.Struct({
  /**
   * The data lake name.
   *
   * Format: tenants/{tenant}/data-lakes/{data-lake}
   */
  name: Schema.String,
});

export type DeleteDataLakeRequest = typeof DeleteDataLakeRequest.Type;
