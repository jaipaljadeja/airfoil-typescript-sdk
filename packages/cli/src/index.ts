#!/usr/bin/env bun
import { Command } from "@effect/cli";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Effect } from "effect";
import { clusterCommand } from "./commands/cluster/index.js";
import { devCommand } from "./commands/dev.js";
import { sqlCommand } from "./commands/sql.js";

const program = Command.make("airfoil", {}, () => Effect.void).pipe(
  Command.withSubcommands([devCommand, sqlCommand, clusterCommand]),
);

const cli = Command.run(program, {
  name: "Airfoil CLI - Manage your Wings deployments",
  version: "0.1.0",
});

cli(process.argv).pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
