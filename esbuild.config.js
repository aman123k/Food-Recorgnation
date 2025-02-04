const esbuild = require("esbuild");
const path = require("path");

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    platform: "node",
    target: "es2020",
    outdir: path.join(__dirname, "build"),
    external: ["express"],
    loader: {
      ".ts": "ts",
      ".js": "js",
    },
    define: {
      "process.env.NODE_ENV": '"production"',
    },
  })
  .catch(() => process.exit(1));
