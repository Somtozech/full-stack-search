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

  setupFilesAfterEnv: ["./test/setup.ts"],
};
