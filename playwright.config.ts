import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./e2e-tests",
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  timeout: process.env.CI ? 180_000 : 30_000,
  // Use a custom snapshot path template because Playwright's default
  // is platform-specific which isn't necessary for Dyad e2e tests
  // which should be platform agnostic (we don't do screenshots; only textual diffs).
  snapshotPathTemplate:
    "{testDir}/{testFileDir}/snapshots/{testFileName}_{arg}{ext}",

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",

    // These options do NOT work for electron playwright.
    // Instead, you need to do a workaround.
    // See https://github.com/microsoft/playwright/issues/8208
    //
    // screenshot: "on",
    // video: "retain-on-failure",
  },

  webServer: {
    command: `cd testing/fake-llm-server && npm run build && npm start`,
    url: "http://localhost:3500/health",
  },
};

export default config;
