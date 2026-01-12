import { Schema } from "effect";

export const CreateTenantRequest = Schema.Struct({
  /** The tenant id. */
  tenantId: Schema.String,
});

export type CreateTenantRequest = typeof CreateTenantRequest.Type;

export const GetTenantRequest = Schema.Struct({
  /**
   * The tenant name.
   *
   * Format: tenants/{tenant}
   */
  name: Schema.String,
});

export type GetTenantRequest = typeof GetTenantRequest.Type;

export const ListTenantsRequest = Schema.Struct({
  /**
   * The number of tenants to return.
   *
   * Default: 100
   * Maximum: 1000.
   */
  pageSize: Schema.optional(Schema.Number),
  /** The continuation token. */
  pageToken: Schema.optional(Schema.String),
});

export type ListTenantsRequest = typeof ListTenantsRequest.Type;

export const Tenant = Schema.Struct({
  /**
   * The tenant name.
   *
   * Format: tenants/{tenant}
   */
  name: Schema.String,
});

export type Tenant = typeof Tenant.Type;

export const ListTenantsResponse = Schema.Struct({
  /** The tenants. */
  tenants: Schema.Array(Tenant),
  /** The continuation token. */
  nextPageToken: Schema.String,
});

export type ListTenantsResponse = typeof ListTenantsResponse.Type;

export const DeleteTenantRequest = Schema.Struct({
  /**
   * The tenant name.
   *
   * Format: tenants/{tenant}
   */
  name: Schema.String,
});

export type DeleteTenantRequest = typeof DeleteTenantRequest.Type;
