import {
  type ChannelCredentials,
  type ChannelOptions,
  createChannel,
  type DefaultCallOptions,
  createClient as grpcCreateClient,
  type NormalizedServiceDefinition,
} from "nice-grpc";
import type { ClientCallOptions } from "./common";
import * as proto from "./proto";

/** Arrow Flight client. */
export interface ArrowFlightClient {
  /** Handshake between client and server for authentication. */
  handshake(
    request: AsyncIterable<proto.arrow_flight.HandshakeRequest>,
    options?: ClientCallOptions,
  ): AsyncIterable<proto.arrow_flight.HandshakeResponse>;

  /** Get a list of available streams given a particular criteria. */
  listFlights(
    request: proto.arrow_flight.Criteria,
    options?: ClientCallOptions,
  ): AsyncIterable<proto.arrow_flight.FlightInfo>;

  /** Get information about how a flight can be consumed. */
  getFlightInfo(
    request: proto.arrow_flight.FlightDescriptor,
    options?: ClientCallOptions,
  ): Promise<proto.arrow_flight.FlightInfo>;

  /** Start a query and get information to poll its execution status. */
  pollFlightInfo(
    request: proto.arrow_flight.FlightDescriptor,
    options?: ClientCallOptions,
  ): Promise<proto.arrow_flight.PollInfo>;

  /** Get the schema for a given FlightDescriptor. */
  getSchema(
    request: proto.arrow_flight.FlightDescriptor,
    options?: ClientCallOptions,
  ): Promise<proto.arrow_flight.SchemaResult>;

  /** Retrieve a single stream associated with a particular ticket. */
  doGet(
    request: proto.arrow_flight.Ticket,
    options?: ClientCallOptions,
  ): AsyncIterable<proto.arrow_flight.FlightData>;

  /** Push a stream to the flight service. */
  doPut(
    request: AsyncIterable<proto.arrow_flight.FlightData>,
    options?: ClientCallOptions,
  ): AsyncIterable<proto.arrow_flight.PutResult>;

  /** Open a bidirectional data channel for a given descriptor. */
  doExchange(
    request: AsyncIterable<proto.arrow_flight.FlightData>,
    options?: ClientCallOptions,
  ): AsyncIterable<proto.arrow_flight.FlightData>;

  /** Execute a specific action against the flight service. */
  doAction(
    request: proto.arrow_flight.Action,
    options?: ClientCallOptions,
  ): AsyncIterable<proto.arrow_flight.Result>;

  /** Get all available action types. */
  listActions(
    request: proto.arrow_flight.Empty,
    options?: ClientCallOptions,
  ): AsyncIterable<proto.arrow_flight.ActionType>;
}

export type CreateArrowFlightClientOptions = {
  defaultCallOptions?: DefaultCallOptions<
    NormalizedServiceDefinition<proto.arrow_flight.FlightServiceDefinition>
  >;
  credentials?: ChannelCredentials;
  channelOptions?: ChannelOptions;
};

/** Create a client connecting to the Arrow Flight service. */
export function createArrowFlightClient(
  serviceUrl: string,
  options: CreateArrowFlightClientOptions = {},
): ArrowFlightClient {
  const channel = createChannel(
    serviceUrl,
    options?.credentials,
    options?.channelOptions,
  );

  const client: proto.arrow_flight.FlightServiceClient = grpcCreateClient(
    proto.arrow_flight.FlightServiceDefinition,
    channel,
    options?.defaultCallOptions,
  );

  return new ArrowFlightClientImpl(client);
}

export class ArrowFlightClientImpl implements ArrowFlightClient {
  constructor(private client: proto.arrow_flight.FlightServiceClient) {}

  handshake(
    request: AsyncIterable<proto.arrow_flight.HandshakeRequest>,
    options?: ClientCallOptions,
  ) {
    return this.client.handshake(request, options);
  }

  listFlights(
    request: proto.arrow_flight.Criteria,
    options?: ClientCallOptions,
  ) {
    return this.client.listFlights(request, options);
  }

  async getFlightInfo(
    request: proto.arrow_flight.FlightDescriptor,
    options?: ClientCallOptions,
  ) {
    return this.client.getFlightInfo(request, options);
  }

  async pollFlightInfo(
    request: proto.arrow_flight.FlightDescriptor,
    options?: ClientCallOptions,
  ) {
    return this.client.pollFlightInfo(request, options);
  }

  async getSchema(
    request: proto.arrow_flight.FlightDescriptor,
    options?: ClientCallOptions,
  ) {
    return this.client.getSchema(request, options);
  }

  doGet(request: proto.arrow_flight.Ticket, options?: ClientCallOptions) {
    return this.client.doGet(request, options);
  }

  doPut(
    request: AsyncIterable<proto.arrow_flight.FlightData>,
    options?: ClientCallOptions,
  ) {
    return this.client.doPut(request, options);
  }

  doExchange(
    request: AsyncIterable<proto.arrow_flight.FlightData>,
    options?: ClientCallOptions,
  ) {
    return this.client.doExchange(request, options);
  }

  doAction(request: proto.arrow_flight.Action, options?: ClientCallOptions) {
    return this.client.doAction(request, options);
  }

  listActions(request: proto.arrow_flight.Empty, options?: ClientCallOptions) {
    return this.client.listActions(request, options);
  }
}
