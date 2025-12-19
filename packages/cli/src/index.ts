#!/usr/bin/env bun
import { Command } from "commander";
import { devCommand } from "./commands/dev";
import { sqlCommand } from "./commands/sql";

const program = new Command();

program
  .name("airfoil")
  .description("Airfoil CLI - Manage your Wings deployments")
  .version("0.1.0");

program.addCommand(devCommand);
program.addCommand(sqlCommand);

program.parse();
