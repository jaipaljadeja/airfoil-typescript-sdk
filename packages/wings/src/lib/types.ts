import type { proto as proto_flight } from "@airfoil/flight";

export type FlightData = ReturnType<
  typeof proto_flight.arrow_flight.FlightData.decode
>;

export type PutResult = ReturnType<
  typeof proto_flight.arrow_flight.PutResult.decode
>;
