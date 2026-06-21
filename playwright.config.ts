import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  outputDir: "test-results",
  timeout: 90_000,
  expect: {
    timeout: 10_000
  },
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: "http://127.0.0.1:3000"
  },
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure"
  },
  projects: [
    {
      name: "desktop-chromium",
      use: {
        ...devices["Desktop Chrome"],
        deviceScaleFactor: 1,
        viewport: { width: 1440, height: 1000 }
      }
    },
    {
      name: "mobile-chromium",
      use: {
        ...devices["iPhone 14"],
        browserName: "chromium",
        viewport: { width: 390, height: 844 }
      }
    }
  ]
});
