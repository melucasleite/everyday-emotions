import type { Config } from "jest";

const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.jest");

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transformIgnorePatterns: [],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node",
  ],
  projects: [
    {
      displayName: "node",
      testEnvironment: "node",
      testMatch: ["**/*.test.ts"],
      transform: {
        "^.+\\.(ts)?$": [
          "ts-jest",
          { tsconfig: "<rootDir>/tsconfig.jest.json" },
        ],
        "^.+\\.(js|mjs|cjs)?$": [
          "babel-jest",
          { configFile: "./babel.config.jest.js" },
        ],
      },
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>/",
      }),
      transformIgnorePatterns: [],
    },
    {
      displayName: "jsdom",
      testEnvironment: "jsdom",
      testMatch: ["**/*.test.tsx"],
      transform: {
        "^.+\\.(ts|tsx)?$": [
          "ts-jest",
          { tsconfig: "<rootDir>/tsconfig.jest.json" },
        ],
        "^.+\\.(js|mjs|cjs|jsx)?$": [
          "babel-jest",
          { configFile: "./babel.config.jest.js" },
        ],
      },
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>/",
      }),
      transformIgnorePatterns: [],
    },
  ],
};

export default config;
