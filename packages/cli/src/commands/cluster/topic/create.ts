import * as p from "@clack/prompts";
import { Command } from "commander";
import {
  hostOption,
  portOption,
  type ServerOptions,
} from "../../../utils/options";

type CreateTopicOptions = ServerOptions & {
  parent: string;
  topicId: string;
  description?: string;
  fields?: string;
  partitionKey?: string;
  freshnessSeconds: string;
  ttlSeconds?: string;
};

export const createTopicCommand = new Command("create-topic")
  .description("Create a new topic belonging to a namespace")
  .requiredOption(
    "--parent <parent>",
    "Parent namespace in format: tenants/{tenant}/namespaces/{namespace}",
  )
  .requiredOption("--topic-id <id>", "Unique identifier for the topic")
  .option("--description <description>", "Topic description")
  .option(
    "--fields <fields>",
    "Arrow schema fields as JSON string or @file path (e.g., @schema.json)",
  )
  .option("--partition-key <index>", "Index of the field used to partition")
  .option(
    "--freshness-seconds <seconds>",
    "How often to compact the topic (seconds)",
    "0",
  )
  .option("--ttl-seconds <seconds>", "How long to keep topic data (seconds)")
  .addOption(hostOption)
  .addOption(portOption)
  .action(async (options: CreateTopicOptions) => {
    p.cancel("IN DEVELOPMENT");
    process.exit(1);
  });
