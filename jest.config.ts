import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transformIgnorePatterns: [],
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
        "^.+\\.(js|mjs|cjs)?$": "babel-jest",
      },
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
        "^.+\\.(js|mjs|cjs|jsx)?$": "babel-jest",
      },
      transformIgnorePatterns: [],
    },
  ],
};

export default config;
