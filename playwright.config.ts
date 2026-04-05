import { defineConfig, devices } from "@playwright/test";
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

// Read ENV values
const BASE_URL = process.env.BASE_URL || "https://www.saucedemo.com";
const WORKERS = process.env.WORKERS
  ? Number(process.env.WORKERS)
  : undefined;

export default defineConfig({
  testDir: "./e2e/tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: WORKERS || (process.env.CI ? 1 : 2),

  timeout: 120000,

  expect: {
    timeout: 10000,
  },

  reporter: process.env.CI
    ? [
        ["list"],
        ["html", { outputFolder: "playwright-report", open: "never" }],
        ["junit", { outputFile: "results/junit.xml" }],
        ["json", { outputFile: "artifacts/report.json" }],
      ]
    : [
        ["list"],
        ["html", { outputFolder: "playwright-report", open: "on-failure" }],
      ],

  use: {
    baseURL: BASE_URL,
    headless: true,
    testIdAttribute: 'data-test',
    actionTimeout: 10000,
    navigationTimeout: 30000,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    contextOptions: {
      permissions: ["clipboard-read"],
    },
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
      },
    },
    {
      name: "Mobile Safari",
      use: {
        ...devices["iPhone 12"],
      },
    },
  ],
});