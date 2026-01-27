import { WingsClusterMetadata } from "@airfoil/wings/effect";

export const makeClusterMetadataLayer = (host: string, port: number) =>
  WingsClusterMetadata.layer({
    host: `${host}:${port}`,
  });
