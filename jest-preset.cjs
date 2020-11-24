const {resolve} = require('path');

module.exports = {
  globalSetup: resolve(__dirname, './jest-setup.cjs'),
  globalTeardown: resolve(__dirname, './jest-teardown.cjs'),
  testEnvironment: resolve(__dirname, './jest-environment.cjs')
};