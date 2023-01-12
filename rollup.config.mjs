import process from "node:process";
import path from "path";
import { readFile } from "fs/promises";

// - Plugins
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";

// - Paths
const PACKAGE_ROOT = process.cwd();
const WORKSPACE_ROOT = path.resolve(PACKAGE_ROOT, "../../");
const PACKAGE_JSON_PATH = path.resolve(PACKAGE_ROOT, "package.json");
const TS_CONFIG_PATH = path.resolve(PACKAGE_ROOT, "tsconfig.json");
const DTS_DIR_PATH = path.resolve(PACKAGE_ROOT, "dist", "dts");

// - Data
const packageJson = JSON.parse(
  await readFile(new URL(PACKAGE_JSON_PATH, import.meta.url))
);

// - Output
console.log([
  ["Generating project:", packageJson.name],
  "With following paths:",
  ["Workspace:", WORKSPACE_ROOT],
  ["Package:", PACKAGE_ROOT],
  ["package.json:", PACKAGE_JSON_PATH],
  ["tsconfig.json:", TS_CONFIG_PATH],
  ["Declarations:", DTS_DIR_PATH],
]);

// - Configs
const bundlePackage = () => ({
  input: path.resolve(PACKAGE_ROOT, packageJson.entry),
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: false,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: false,
    },
  ],
  plugins: [
    json(),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: TS_CONFIG_PATH,
      useTsconfigDeclarationDir: true,
    }),
    terser(),
  ],
});

const bundleDecelerations = () => ({
  input: `${DTS_DIR_PATH}/index.d.ts`,
  output: {
    file: packageJson.types,
    format: "esm",
  },
  plugins: [dts()],
});

// - Export
export default [bundlePackage(), bundleDecelerations()];
