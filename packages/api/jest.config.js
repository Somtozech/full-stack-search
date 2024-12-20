/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  //  Automatically restore mock state between every test
  restoreMocks: true,

  testTimeout: 10000,

  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],

  // A path to a module which exports an async function that is triggered once before all test suites
  globalSetup: "<rootDir>/test/globalSetup.ts",

  // A path to a module which exports an async function that is triggered once after all test suites
  globalTeardown: "<rootDir>/test/globalTeardown.ts",
};
