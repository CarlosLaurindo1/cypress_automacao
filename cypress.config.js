const { defineConfig } = require('cypress')

module.exports = defineConfig({
  pageLoadTimeout: 100000,
  projectId: '7t6z3m',
  viewportWidth: 1920,
  viewportHeight: 1080,
  videoUploadOnPasses: false,
  video: false,
  trashAssetsBeforeRuns: true,
  defaultCommandTimeout: 10000,
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})