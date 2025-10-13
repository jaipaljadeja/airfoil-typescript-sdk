import {
  type ArrowFlightClient,
  type CreateArrowFlightClientOptions,
  createArrowFlightClient,
  Metadata,
} from "@airfoil/flight";
import { TopicClient } from "./topic-client";

export interface WingsClientOptions {
  connectionString: string;
  clientOptions?: CreateArrowFlightClientOptions;
  namespace: string;
}

export class WingsClient {
  private readonly flightClient: ArrowFlightClient;
  private readonly metadata: Metadata;

  constructor(private readonly options: WingsClientOptions) {
    this.flightClient = createArrowFlightClient(
      options.connectionString,
      options.clientOptions,
    );
    this.metadata = new Metadata();
    this.metadata.set("x-wings-namespace", options.namespace);
  }

  async topic(topicName: string): Promise<TopicClient> {
    const topic = await TopicClient.getTopic(
      topicName,
      this.options.connectionString,
    );

    return new TopicClient({
      flightClient: this.flightClient,
      namespace: this.options.namespace,
      topicName: topic.name,
      schema: topic.schema,
      metadata: this.metadata,
    });
  }
}
