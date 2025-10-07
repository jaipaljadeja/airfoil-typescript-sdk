import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index.ts"],
  clean: true,
  outDir: "./dist",
  declaration: true,
  sourcemap: true,
  rollup: {
    emitCJS: true,
  },
  hooks: {
    "rollup:options"(_ctx, options) {
      const originalOnwarn = options.onwarn;
      options.onwarn = (warning, warn) => {
        if (
          warning.message?.includes(
            "evaluated because it duplicates an earlier case clause",
          )
        ) {
          return;
        }

        if (originalOnwarn) {
          originalOnwarn(warning, warn);
        } else {
          warn(warning);
        }
      };
    },
  },
});
