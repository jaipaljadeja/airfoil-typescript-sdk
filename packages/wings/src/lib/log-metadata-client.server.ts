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

/** Wings Log Metadata client. */
export interface LogMetadataClient {
  /** Commit folio. */
  commitFolio(
    request: proto.log_metadata.CommitFolioRequest,
    options?: ClientCallOptions,
  ): Promise<proto.log_metadata.CommitFolioResponse>;

  /** Get log location. */
  getLogLocation(
    request: proto.log_metadata.GetLogLocationRequest,
    options?: ClientCallOptions,
  ): Promise<proto.log_metadata.GetLogLocationResponse>;

  /** List partitions. */
  listPartitions(
    request: proto.log_metadata.ListPartitionsRequest,
    options?: ClientCallOptions,
  ): Promise<proto.log_metadata.ListPartitionsResponse>;
}

export type CreateLogMetadataClientOptions = {
  defaultCallOptions?: DefaultCallOptions<
    NormalizedServiceDefinition<proto.log_metadata.LogMetadataServiceDefinition>
  >;
  credentials?: ChannelCredentials;
  channelOptions?: ChannelOptions;
};

/** Create a client connecting to the Wings Log Metadata service. */
export function createLogMetadataClient(
  serviceUrl: string,
  options: CreateLogMetadataClientOptions = {},
): LogMetadataClient {
  const channel = createChannel(
    serviceUrl,
    options?.credentials,
    options?.channelOptions,
  );

  const client: proto.log_metadata.LogMetadataServiceClient = grpcCreateClient(
    proto.log_metadata.LogMetadataServiceDefinition,
    channel,
    options?.defaultCallOptions,
  );

  return new WingsLogMetadataClient(client);
}

export class WingsLogMetadataClient implements LogMetadataClient {
  constructor(private client: proto.log_metadata.LogMetadataServiceClient) {}

  async commitFolio(
    request: proto.log_metadata.CommitFolioRequest,
    options?: ClientCallOptions,
  ) {
    return this.client.commitFolio(request, options);
  }

  async getLogLocation(
    request: proto.log_metadata.GetLogLocationRequest,
    options?: ClientCallOptions,
  ) {
    return this.client.getLogLocation(request, options);
  }

  async listPartitions(
    request: proto.log_metadata.ListPartitionsRequest,
    options?: ClientCallOptions,
  ) {
    return this.client.listPartitions(request, options);
  }
}
