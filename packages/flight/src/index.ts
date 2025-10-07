import { createArrowFlightClient } from "./arrow-flight.client";
import { createArrowFlightSqlClient } from "./arrow-flight-sql.client";

export * from "./arrow-flight.client";
export * from "./arrow-flight-sql.client";
export * from "./common";

export function getFlightClient({
  wingsRpcEndpoint,
}: {
  wingsRpcEndpoint: string;
}) {
  if (!wingsRpcEndpoint) {
    throw new Error("wingsRpcEndpoint is not provided");
  }
  return createArrowFlightClient(wingsRpcEndpoint);
}

export function getFlightSqlClient({
  wingsRpcEndpoint,
}: {
  wingsRpcEndpoint: string;
}) {
  if (!wingsRpcEndpoint) {
    throw new Error("wingsRpcEndpoint is not provided");
  }
  return createArrowFlightSqlClient(wingsRpcEndpoint);
}
