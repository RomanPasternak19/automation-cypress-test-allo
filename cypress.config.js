const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    baseUrl: 'https://allo.ua',
    viewportWidth: 1200,
    viewportHeight: 660,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  "retries": {
    "runMode": 2,
    "openMode": 2
  }
});
