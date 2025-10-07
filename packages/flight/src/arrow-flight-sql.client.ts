import type {
  ChannelCredentials,
  ChannelOptions,
  DefaultCallOptions,
  NormalizedServiceDefinition,
} from "nice-grpc";
import type { ArrowFlightClient } from "./arrow-flight.client";
import { createArrowFlightClient } from "./arrow-flight.client";
import type { ClientCallOptions } from "./common";
import * as proto from "./proto";

/** Arrow Flight SQL client for executing SQL queries via Arrow Flight. */
export interface ArrowFlightSqlClient {
  /** Get SQL-related metadata information. */
  getSqlInfo(
    request: proto.arrow_flight_sql.CommandGetSqlInfo,
    options?: ClientCallOptions,
  ): Promise<proto.arrow_flight.FlightInfo>;

  /** Get metadata about database catalogs. */
  getCatalogs(
    request: proto.arrow_flight_sql.CommandGetCatalogs,
    options?: ClientCallOptions,
  ): Promise<proto.arrow_flight.FlightInfo>;

  /** Get metadata about database schemas. */
  getDbSchemas(
    request: proto.arrow_flight_sql.CommandGetDbSchemas,
    options?: ClientCallOptions,
  ): Promise<proto.arrow_flight.FlightInfo>;

  /** Get metadata about tables. */
  getTables(
    request: proto.arrow_flight_sql.CommandGetTables,
    options?: ClientCallOptions,
  ): Promise<proto.arrow_flight.FlightInfo>;

  /** Get metadata about table types. */
  getTableTypes(
    request: proto.arrow_flight_sql.CommandGetTableTypes,
    options?: ClientCallOptions,
  ): Promise<proto.arrow_flight.FlightInfo>;

  /** Get primary keys for a table. */
  getPrimaryKeys(
    request: proto.arrow_flight_sql.CommandGetPrimaryKeys,
    options?: ClientCallOptions,
  ): Promise<proto.arrow_flight.FlightInfo>;

  /** Get exported keys for a table. */
  getExportedKeys(
    request: proto.arrow_flight_sql.CommandGetExportedKeys,
    options?: ClientCallOptions,
  ): Promise<proto.arrow_flight.FlightInfo>;

  /** Get imported keys for a table. */
  getImportedKeys(
    request: proto.arrow_flight_sql.CommandGetImportedKeys,
    options?: ClientCallOptions,
  ): Promise<proto.arrow_flight.FlightInfo>;

  /** Get cross reference information between tables. */
  getCrossReference(
    request: proto.arrow_flight_sql.CommandGetCrossReference,
    options?: ClientCallOptions,
  ): Promise<proto.arrow_flight.FlightInfo>;

  /** Get XDBC type information. */
  getXdbcTypeInfo(
    request: proto.arrow_flight_sql.CommandGetXdbcTypeInfo,
    options?: ClientCallOptions,
  ): Promise<proto.arrow_flight.FlightInfo>;

  /** Execute a SQL query and get flight info. */
  executeQuery(
    request: proto.arrow_flight_sql.CommandStatementQuery,
    options?: ClientCallOptions,
  ): Promise<proto.arrow_flight.FlightInfo>;

  /** Execute a Substrait plan and get flight info. */
  executeSubstraitPlan(
    request: proto.arrow_flight_sql.CommandStatementSubstraitPlan,
    options?: ClientCallOptions,
  ): Promise<proto.arrow_flight.FlightInfo>;

  /** Execute a SQL update statement. */
  executeUpdate(
    request: proto.arrow_flight_sql.CommandStatementUpdate,
    options?: ClientCallOptions,
  ): Promise<proto.arrow_flight.FlightInfo>;

  /** Create a prepared statement. */
  createPreparedStatement(
    request: proto.arrow_flight_sql.ActionCreatePreparedStatementRequest,
    options?: ClientCallOptions,
  ): AsyncIterable<proto.arrow_flight.Result>;

  /** Close a prepared statement. */
  closePreparedStatement(
    request: proto.arrow_flight_sql.ActionClosePreparedStatementRequest,
    options?: ClientCallOptions,
  ): AsyncIterable<proto.arrow_flight.Result>;

  /** Begin a transaction. */
  beginTransaction(
    request: proto.arrow_flight_sql.ActionBeginTransactionRequest,
    options?: ClientCallOptions,
  ): AsyncIterable<proto.arrow_flight.Result>;

  /** End a transaction. */
  endTransaction(
    request: proto.arrow_flight_sql.ActionEndTransactionRequest,
    options?: ClientCallOptions,
  ): AsyncIterable<proto.arrow_flight.Result>;

  /** Begin a savepoint. */
  beginSavepoint(
    request: proto.arrow_flight_sql.ActionBeginSavepointRequest,
    options?: ClientCallOptions,
  ): AsyncIterable<proto.arrow_flight.Result>;

  /** End a savepoint. */
  endSavepoint(
    request: proto.arrow_flight_sql.ActionEndSavepointRequest,
    options?: ClientCallOptions,
  ): AsyncIterable<proto.arrow_flight.Result>;

  /** Cancel a query. */
  cancelQuery(
    request: proto.arrow_flight_sql.ActionCancelQueryRequest,
    options?: ClientCallOptions,
  ): AsyncIterable<proto.arrow_flight.Result>;

  /** Get the underlying Arrow Flight client. */
  getFlightClient(): ArrowFlightClient;
}

export type CreateArrowFlightSqlClientOptions = {
  defaultCallOptions?: DefaultCallOptions<
    NormalizedServiceDefinition<proto.arrow_flight.FlightServiceDefinition>
  >;
  credentials?: ChannelCredentials;
  channelOptions?: ChannelOptions;
};

/** Create a client for executing SQL queries via Arrow Flight SQL. */
export function createArrowFlightSqlClient(
  serviceUrl: string,
  options: CreateArrowFlightSqlClientOptions = {},
): ArrowFlightSqlClient {
  const flightClient = createArrowFlightClient(serviceUrl, options);
  return new ArrowFlightSqlClientImpl(flightClient);
}

export class ArrowFlightSqlClientImpl implements ArrowFlightSqlClient {
  constructor(private flightClient: ArrowFlightClient) {}

  getFlightClient(): ArrowFlightClient {
    return this.flightClient;
  }

  async getSqlInfo(
    request: proto.arrow_flight_sql.CommandGetSqlInfo,
    options?: ClientCallOptions,
  ) {
    const descriptor = this.createCommandDescriptor(
      "arrow.flight.protocol.sql.CommandGetSqlInfo",
      proto.arrow_flight_sql.CommandGetSqlInfo.encode(request).finish(),
    );
    return this.flightClient.getFlightInfo(descriptor, options);
  }

  async getCatalogs(
    request: proto.arrow_flight_sql.CommandGetCatalogs,
    options?: ClientCallOptions,
  ) {
    const descriptor = this.createCommandDescriptor(
      "arrow.flight.protocol.sql.CommandGetCatalogs",
      proto.arrow_flight_sql.CommandGetCatalogs.encode(request).finish(),
    );
    return this.flightClient.getFlightInfo(descriptor, options);
  }

  async getDbSchemas(
    request: proto.arrow_flight_sql.CommandGetDbSchemas,
    options?: ClientCallOptions,
  ) {
    const descriptor = this.createCommandDescriptor(
      "arrow.flight.protocol.sql.CommandGetDbSchemas",
      proto.arrow_flight_sql.CommandGetDbSchemas.encode(request).finish(),
    );
    return this.flightClient.getFlightInfo(descriptor, options);
  }

  async getTables(
    request: proto.arrow_flight_sql.CommandGetTables,
    options?: ClientCallOptions,
  ) {
    const descriptor = this.createCommandDescriptor(
      "arrow.flight.protocol.sql.CommandGetTables",
      proto.arrow_flight_sql.CommandGetTables.encode(request).finish(),
    );
    return this.flightClient.getFlightInfo(descriptor, options);
  }

  async getTableTypes(
    request: proto.arrow_flight_sql.CommandGetTableTypes,
    options?: ClientCallOptions,
  ) {
    const descriptor = this.createCommandDescriptor(
      "arrow.flight.protocol.sql.CommandGetTableTypes",
      proto.arrow_flight_sql.CommandGetTableTypes.encode(request).finish(),
    );
    return this.flightClient.getFlightInfo(descriptor, options);
  }

  async getPrimaryKeys(
    request: proto.arrow_flight_sql.CommandGetPrimaryKeys,
    options?: ClientCallOptions,
  ) {
    const descriptor = this.createCommandDescriptor(
      "arrow.flight.protocol.sql.CommandGetPrimaryKeys",
      proto.arrow_flight_sql.CommandGetPrimaryKeys.encode(request).finish(),
    );
    return this.flightClient.getFlightInfo(descriptor, options);
  }

  async getExportedKeys(
    request: proto.arrow_flight_sql.CommandGetExportedKeys,
    options?: ClientCallOptions,
  ) {
    const descriptor = this.createCommandDescriptor(
      "arrow.flight.protocol.sql.CommandGetExportedKeys",
      proto.arrow_flight_sql.CommandGetExportedKeys.encode(request).finish(),
    );
    return this.flightClient.getFlightInfo(descriptor, options);
  }

  async getImportedKeys(
    request: proto.arrow_flight_sql.CommandGetImportedKeys,
    options?: ClientCallOptions,
  ) {
    const descriptor = this.createCommandDescriptor(
      "arrow.flight.protocol.sql.CommandGetImportedKeys",
      proto.arrow_flight_sql.CommandGetImportedKeys.encode(request).finish(),
    );
    return this.flightClient.getFlightInfo(descriptor, options);
  }

  async getCrossReference(
    request: proto.arrow_flight_sql.CommandGetCrossReference,
    options?: ClientCallOptions,
  ) {
    const descriptor = this.createCommandDescriptor(
      "arrow.flight.protocol.sql.CommandGetCrossReference",
      proto.arrow_flight_sql.CommandGetCrossReference.encode(request).finish(),
    );
    return this.flightClient.getFlightInfo(descriptor, options);
  }

  async getXdbcTypeInfo(
    request: proto.arrow_flight_sql.CommandGetXdbcTypeInfo,
    options?: ClientCallOptions,
  ) {
    const descriptor = this.createCommandDescriptor(
      "arrow.flight.protocol.sql.CommandGetXdbcTypeInfo",
      proto.arrow_flight_sql.CommandGetXdbcTypeInfo.encode(request).finish(),
    );
    return this.flightClient.getFlightInfo(descriptor, options);
  }

  async executeQuery(
    request: proto.arrow_flight_sql.CommandStatementQuery,
    options?: ClientCallOptions,
  ) {
    const descriptor = this.createCommandDescriptor(
      "arrow.flight.protocol.sql.CommandStatementQuery",
      proto.arrow_flight_sql.CommandStatementQuery.encode(request).finish(),
    );
    return this.flightClient.getFlightInfo(descriptor, options);
  }

  async executeSubstraitPlan(
    request: proto.arrow_flight_sql.CommandStatementSubstraitPlan,
    options?: ClientCallOptions,
  ) {
    const descriptor = this.createCommandDescriptor(
      "arrow.flight.protocol.sql.CommandStatementSubstraitPlan",
      proto.arrow_flight_sql.CommandStatementSubstraitPlan.encode(
        request,
      ).finish(),
    );
    return this.flightClient.getFlightInfo(descriptor, options);
  }

  async executeUpdate(
    request: proto.arrow_flight_sql.CommandStatementUpdate,
    options?: ClientCallOptions,
  ) {
    const descriptor = this.createCommandDescriptor(
      "arrow.flight.protocol.sql.CommandStatementUpdate",
      proto.arrow_flight_sql.CommandStatementUpdate.encode(request).finish(),
    );
    return this.flightClient.getFlightInfo(descriptor, options);
  }

  createPreparedStatement(
    request: proto.arrow_flight_sql.ActionCreatePreparedStatementRequest,
    options?: ClientCallOptions,
  ) {
    const action: proto.arrow_flight.Action = {
      type: "CreatePreparedStatement",
      body: proto.arrow_flight_sql.ActionCreatePreparedStatementRequest.encode(
        request,
      ).finish(),
    };
    return this.flightClient.doAction(action, options);
  }

  closePreparedStatement(
    request: proto.arrow_flight_sql.ActionClosePreparedStatementRequest,
    options?: ClientCallOptions,
  ) {
    const action: proto.arrow_flight.Action = {
      type: "ClosePreparedStatement",
      body: proto.arrow_flight_sql.ActionClosePreparedStatementRequest.encode(
        request,
      ).finish(),
    };
    return this.flightClient.doAction(action, options);
  }

  beginTransaction(
    request: proto.arrow_flight_sql.ActionBeginTransactionRequest,
    options?: ClientCallOptions,
  ) {
    const action: proto.arrow_flight.Action = {
      type: "BeginTransaction",
      body: proto.arrow_flight_sql.ActionBeginTransactionRequest.encode(
        request,
      ).finish(),
    };
    return this.flightClient.doAction(action, options);
  }

  endTransaction(
    request: proto.arrow_flight_sql.ActionEndTransactionRequest,
    options?: ClientCallOptions,
  ) {
    const action: proto.arrow_flight.Action = {
      type: "EndTransaction",
      body: proto.arrow_flight_sql.ActionEndTransactionRequest.encode(
        request,
      ).finish(),
    };
    return this.flightClient.doAction(action, options);
  }

  beginSavepoint(
    request: proto.arrow_flight_sql.ActionBeginSavepointRequest,
    options?: ClientCallOptions,
  ) {
    const action: proto.arrow_flight.Action = {
      type: "BeginSavepoint",
      body: proto.arrow_flight_sql.ActionBeginSavepointRequest.encode(
        request,
      ).finish(),
    };
    return this.flightClient.doAction(action, options);
  }

  endSavepoint(
    request: proto.arrow_flight_sql.ActionEndSavepointRequest,
    options?: ClientCallOptions,
  ) {
    const action: proto.arrow_flight.Action = {
      type: "EndSavepoint",
      body: proto.arrow_flight_sql.ActionEndSavepointRequest.encode(
        request,
      ).finish(),
    };
    return this.flightClient.doAction(action, options);
  }

  cancelQuery(
    request: proto.arrow_flight_sql.ActionCancelQueryRequest,
    options?: ClientCallOptions,
  ) {
    const action: proto.arrow_flight.Action = {
      type: "CancelQuery",
      body: proto.arrow_flight_sql.ActionCancelQueryRequest.encode(
        request,
      ).finish(),
    };
    return this.flightClient.doAction(action, options);
  }

  /**
   * Create a FlightDescriptor with a Flight SQL command properly encoded using google.protobuf.Any.
   */
  private createCommandDescriptor(
    typeUrl: string,
    value: Uint8Array,
  ): proto.arrow_flight.FlightDescriptor {
    const anyMessage: proto.google_any.Any = {
      typeUrl: `type.googleapis.com/${typeUrl}`,
      value,
    };

    const cmd = proto.google_any.Any.encode(anyMessage).finish();

    return {
      type: proto.arrow_flight.FlightDescriptor_DescriptorType.CMD,
      cmd,
      path: [],
    };
  }
}
