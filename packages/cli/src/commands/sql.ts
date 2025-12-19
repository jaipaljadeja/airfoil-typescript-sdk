import { readFileSync } from "node:fs";
import { ArrowFlightSqlClient } from "@airfoil/flight";
import * as p from "@clack/prompts";
import { Command } from "commander";
import { Metadata } from "nice-grpc-common";

export const sqlCommand = new Command("sql")
  .description("Execute SQL queries using Arrow Flight SQL")
  .argument("[query]", "SQL query to execute")
  .option("-h, --host <host>", "Server host", "localhost")
  .option("-p, --port <port>", "Server port", "7777")
  .option("-f, --file <file>", "Execute SQL from file")
  .option(
    "-n, --namespace <namespace>",
    "Wings namespace",
    "tenants/default/namespaces/default",
  )
  .option("--json", "Output results as JSON")
  .action(async (query, options) => {
    try {
      await executeSQL(query, options);
    } catch (error) {
      p.cancel(error instanceof Error ? error.message : "Command failed");
      process.exit(1);
    }
  });

async function executeSQL(
  query: string | undefined,
  options: {
    host: string;
    port: string;
    file?: string;
    namespace: string;
    json?: boolean;
  },
) {
  let sqlQuery = query;

  if (options.file) {
    try {
      sqlQuery = readFileSync(options.file, "utf-8");
    } catch (error) {
      throw new Error(
        `Failed to read file: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  if (!sqlQuery) {
    p.cancel("No query provided. Use a query argument or --file option.");
    process.exit(1);
  }

  const hostPort = `${options.host}:${options.port}`;

  p.intro("🔍 Arrow Flight SQL");
  p.log.info(`Connecting to: ${hostPort}`);
  p.log.info(`Namespace: ${options.namespace}`);

  const client = new ArrowFlightSqlClient(
    {
      host: hostPort,
    },
    {
      defaultCallOptions: {
        "*": {
          metadata: Metadata({
            "x-wings-namespace": options.namespace,
          }),
        },
      },
    },
  );

  const s = p.spinner();
  s.start("Executing query...");

  try {
    const flightInfo = await client.executeQuery({
      query: sqlQuery,
    });

    const batches = await Array.fromAsync(client.executeFlightInfo(flightInfo));
    const data = batches.flatMap((batch) => batch.toArray());

    s.stop(`Query executed: ${sqlQuery}`);

    if (options.json) {
      console.log(JSON.stringify(data, null, 2));
    } else {
      if (data.length === 0) {
        p.log.warn("No results returned");
      } else {
        const normalized = data.map((row) =>
          Object.fromEntries(Object.entries(row)),
        );
        console.table(normalized);
      }
    }
    p.outro("✓ Done");
  } catch (error) {
    s.stop("Query failed");
    throw error;
  }
}
