import { createClusterMetadataClient } from "./cluster-metadata-client.server";
import { createLogMetadataClient } from "./log-metadata-client.server";

type WingsMetadataClientOptions = {
  connectionString: string;
};

export function getClusterMetadataClient({
  connectionString,
}: WingsMetadataClientOptions) {
  if (!connectionString) {
    throw new Error("connectionString is not set");
  }
  return createClusterMetadataClient(connectionString);
}

export function getLogMetadataClient({
  connectionString,
}: WingsMetadataClientOptions) {
  if (!connectionString) {
    throw new Error("serverUrl is not set");
  }
  return createLogMetadataClient(connectionString);
}
