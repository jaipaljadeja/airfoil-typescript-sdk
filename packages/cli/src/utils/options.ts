import { Options } from "@effect/cli";

/**
 * Common server connection options
 */
export const hostOption = Options.text("host").pipe(
  Options.withDescription("Server host"),
  Options.withDefault("localhost"),
);

export const portOption = Options.integer("port").pipe(
  Options.withDescription("Server port"),
  Options.withAlias("p"),
  Options.withDefault(7777),
);

/**
 * Common pagination options
 */
export const pageSizeOption = Options.integer("page-size").pipe(
  Options.withDescription("Number of items to return (max: 1000)"),
  Options.withDefault(100),
);

export const pageTokenOption = Options.text("page-token").pipe(
  Options.withDescription("Continuation token for pagination"),
  Options.optional,
);

/**
 * Force flag for destructive operations
 */
export const forceOption = Options.boolean("force").pipe(
  Options.withDescription("Skip confirmation prompt"),
  Options.withDefault(false),
);
