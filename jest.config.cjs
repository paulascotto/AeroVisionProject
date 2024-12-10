/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  preset: 'ts-jest',
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  coverageDirectory: "coverage",
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: "jest-environment-jsdom",
};

module.exports = config;
