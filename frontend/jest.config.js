module.exports = {
  extensionsToTreatAsEsm: [".ts"],
  verbose: true,
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
  testPathIgnorePatterns: ["./dist"],
  globalSetup: "<rootDir>/jest.setup.ts",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};
