import { Command } from "@effect/cli";
import { Effect } from "effect";
import { createDataLakeIcebergCommand } from "./create-iceberg.js";
import { createDataLakeParquetCommand } from "./create-parquet.js";

export const createDataLakeCommand = Command.make(
  "create-data-lake",
  {},
  () => Effect.void,
).pipe(
  Command.withDescription("Create a new data lake"),
  Command.withSubcommands([
    createDataLakeIcebergCommand,
    createDataLakeParquetCommand,
  ]),
);
