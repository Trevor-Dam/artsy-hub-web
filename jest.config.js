module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['**/src/**/*.test.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};