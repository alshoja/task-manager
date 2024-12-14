/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'], // Adjust based on your folder structure
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // For absolute imports if you use them
  },
  collectCoverage: true, // Optional: collect test coverage
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
};