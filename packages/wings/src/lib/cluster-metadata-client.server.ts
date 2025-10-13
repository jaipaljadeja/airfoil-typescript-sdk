import {
  type ChannelCredentials,
  type ChannelOptions,
  createChannel,
  type DefaultCallOptions,
  createClient as grpcCreateClient,
  type NormalizedServiceDefinition,
} from "nice-grpc";

import * as proto from "../proto";
import type { ClientCallOptions } from "./common";

/** Wings Cluster Metadata client. */
export interface ClusterMetadataClient {
  /** Create a new tenant. */
  createTenant(
    request: proto.cluster_metadata.CreateTenantRequest,
    options?: ClientCallOptions,
  ): Promise<proto.cluster_metadata.Tenant>;

  /** Get tenant by name. */
  getTenant(
    request: proto.cluster_metadata.GetTenantRequest,
    options?: ClientCallOptions,
  ): Promise<proto.cluster_metadata.Tenant>;

  /** List all tenants. */
  listTenants(
    request: proto.cluster_metadata.ListTenantsRequest,
    options?: ClientCallOptions,
  ): Promise<proto.cluster_metadata.ListTenantsResponse>;

  /** Delete a tenant. */
  deleteTenant(
    request: proto.cluster_metadata.DeleteTenantRequest,
    options?: ClientCallOptions,
  ): Promise<proto.google_empty.Empty>;

  /** Create a new namespace. */
  createNamespace(
    request: proto.cluster_metadata.CreateNamespaceRequest,
    options?: ClientCallOptions,
  ): Promise<proto.cluster_metadata.Namespace>;

  /** Get namespace by name. */
  getNamespace(
    request: proto.cluster_metadata.GetNamespaceRequest,
    options?: ClientCallOptions,
  ): Promise<proto.cluster_metadata.Namespace>;

  /** List namespaces. */
  listNamespaces(
    request: proto.cluster_metadata.ListNamespacesRequest,
    options?: ClientCallOptions,
  ): Promise<proto.cluster_metadata.ListNamespacesResponse>;

  /** Delete a namespace. */
  deleteNamespace(
    request: proto.cluster_metadata.DeleteNamespaceRequest,
    options?: ClientCallOptions,
  ): Promise<proto.google_empty.Empty>;

  /** Create a new topic. */
  createTopic(
    request: proto.cluster_metadata.CreateTopicRequest,
    options?: ClientCallOptions,
  ): Promise<proto.cluster_metadata.Topic>;

  /** Get topic by name. */
  getTopic(
    request: proto.cluster_metadata.GetTopicRequest,
    options?: ClientCallOptions,
  ): Promise<proto.cluster_metadata.Topic>;

  /** List topics. */
  listTopics(
    request: proto.cluster_metadata.ListTopicsRequest,
    options?: ClientCallOptions,
  ): Promise<proto.cluster_metadata.ListTopicsResponse>;

  /** Delete a topic. */
  deleteTopic(
    request: proto.cluster_metadata.DeleteTopicRequest,
    options?: ClientCallOptions,
  ): Promise<proto.google_empty.Empty>;
}

export type CreateClusterMetadataClientOptions = {
  defaultCallOptions?: DefaultCallOptions<
    NormalizedServiceDefinition<proto.cluster_metadata.ClusterMetadataServiceDefinition>
  >;
  credentials?: ChannelCredentials;
  channelOptions?: ChannelOptions;
};

/** Create a client connecting to the Wings Cluster Metadata service. */
export function createClusterMetadataClient(
  serviceUrl: string,
  options: CreateClusterMetadataClientOptions = {},
): ClusterMetadataClient {
  const channel = createChannel(
    serviceUrl,
    options?.credentials,
    options?.channelOptions,
  );

  const client: proto.cluster_metadata.ClusterMetadataServiceClient =
    grpcCreateClient(
      proto.cluster_metadata.ClusterMetadataServiceDefinition,
      channel,
      options?.defaultCallOptions,
    );

  return new WingsClusterMetadataClient(client);
}

export class WingsClusterMetadataClient implements ClusterMetadataClient {
  constructor(
    private client: proto.cluster_metadata.ClusterMetadataServiceClient,
  ) {}

  async createTenant(
    request: proto.cluster_metadata.CreateTenantRequest,
    options?: ClientCallOptions,
  ) {
    return this.client.createTenant(request, options);
  }

  async getTenant(
    request: proto.cluster_metadata.GetTenantRequest,
    options?: ClientCallOptions,
  ) {
    return this.client.getTenant(request, options);
  }

  async listTenants(
    request: proto.cluster_metadata.ListTenantsRequest,
    options?: ClientCallOptions,
  ) {
    return this.client.listTenants(request, options);
  }

  async deleteTenant(
    request: proto.cluster_metadata.DeleteTenantRequest,
    options?: ClientCallOptions,
  ) {
    return this.client.deleteTenant(request, options);
  }

  async createNamespace(
    request: proto.cluster_metadata.CreateNamespaceRequest,
    options?: ClientCallOptions,
  ) {
    return this.client.createNamespace(request, options);
  }

  async getNamespace(
    request: proto.cluster_metadata.GetNamespaceRequest,
    options?: ClientCallOptions,
  ) {
    return this.client.getNamespace(request, options);
  }

  async listNamespaces(
    request: proto.cluster_metadata.ListNamespacesRequest,
    options?: ClientCallOptions,
  ) {
    return this.client.listNamespaces(request, options);
  }

  async deleteNamespace(
    request: proto.cluster_metadata.DeleteNamespaceRequest,
    options?: ClientCallOptions,
  ) {
    return this.client.deleteNamespace(request, options);
  }

  async createTopic(
    request: proto.cluster_metadata.CreateTopicRequest,
    options?: ClientCallOptions,
  ) {
    return this.client.createTopic(request, options);
  }

  async getTopic(
    request: proto.cluster_metadata.GetTopicRequest,
    options?: ClientCallOptions,
  ) {
    return this.client.getTopic(request, options);
  }

  async listTopics(
    request: proto.cluster_metadata.ListTopicsRequest,
    options?: ClientCallOptions,
  ) {
    return this.client.listTopics(request, options);
  }

  async deleteTopic(
    request: proto.cluster_metadata.DeleteTopicRequest,
    options?: ClientCallOptions,
  ) {
    return this.client.deleteTopic(request, options);
  }
}
