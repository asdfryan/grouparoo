/**
 * @jest-environment jest-environment-webdriver
 */

import os from "os";

const projectDir = `${os.tmpdir()}/test/${
  process.env.JEST_WORKER_ID ?? 1
}/uiConfig/config`;
process.env.GROUPAROO_RUN_MODE = "cli:config";
process.env.GROUPAROO_CONFIG_DIR = `${projectDir}/config`;

import path from "path";
import fs from "fs";
process.env.GROUPAROO_INJECTED_PLUGINS = JSON.stringify({
  "@grouparoo/ui-config": { path: path.join(__dirname, "..", "..") },
});
import { helper } from "@grouparoo/spec-helper";
import { config } from "actionhero";
import { SetupStep } from "@grouparoo/core";

declare var browser: any;
declare var by: any;
declare var until: any;
let url: string;

describe("integration", () => {
  beforeAll(async () => {
    fs.rmSync(projectDir, { recursive: true, force: true });
  });

  helper.grouparooTestServer({ truncate: true, resetSettings: true });
  beforeAll(() => (url = `http://localhost:${config.web.port}`));
  beforeAll(async () => {
    const setupSteps = await SetupStep.findAll();
    for (const step of setupSteps) {
      await step.update({ complete: false });
    }
  });

  test(
    "it renders the home page",
    async () => {
      await browser.get(url);
      await browser.wait(until.elementLocated(by.tagName("h2")));
      const header = await browser.findElement(by.tagName("h2")).getText();
      expect(header).toContain(
        "Sync, Segment, and Send your Product Data Everywhere"
      );
      const button = await browser.findElement(by.className("btn-primary"));
      await button.click();
    },
    helper.mediumTime
  );

  test(
    "it signs in a ConfigUser",
    async () => {
      await browser.wait(until.elementLocated(by.name("company")));

      const currentUrl = await browser.getCurrentUrl();
      expect(currentUrl).toMatch(/\/sign-in/);
      await browser.get(currentUrl);

      await browser.findElement(by.name("company")).sendKeys("demo company");
      await browser
        .findElement(by.name("email"))
        .sendKeys("test@grouparoo.com");

      const button = await browser.findElement(by.className("btn-primary"));
      await button.click();
    },
    helper.mediumTime
  );

  test(
    "it redirects to setup steps after registering",
    async () => {
      await browser.wait(until.elementLocated(by.id("setup")));
      const currentUrl = await browser.getCurrentUrl();
      expect(currentUrl).toMatch(/\/setup/);
      await browser.get(currentUrl);
    },
    helper.mediumTime
  );

  test(
    "visiting '/' after login displays a link to setup steps",
    async () => {
      await browser.get(`${url}/`);
      await browser.wait(until.elementLocated(by.className("btn-primary")));
      const button = browser.findElement(by.className("btn-primary"));
      const buttonText = await button.getText();
      expect(buttonText).toEqual("Set Up Grouparoo");

      await button.click();
    },
    helper.mediumTime
  );

  test(
    "it redirects to setup steps after clicking setup button",
    async () => {
      await browser.get(`${url}/`);
      await browser.wait(until.elementLocated(by.className("btn-primary")));
      const button = browser.findElement(by.className("btn-primary"));
      await button.click();

      await browser.wait(until.elementLocated(by.id("setup")));
      const currentUrl = await browser.getCurrentUrl();
      expect(currentUrl).toMatch(/\/setup/);
      await browser.get(currentUrl);
    },
    helper.mediumTime
  );

  test("if all the setup steps are complete, visiting / redirects to model", async () => {
    await helper.factories.model({ name: "User", id: "user", type: "profile" });

    const setupSteps = await SetupStep.findAll();
    for (const step of setupSteps) {
      await step.update({ complete: true });
    }

    await browser.get(`${url}/`);

    await helper.sleep(1000);

    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toMatch(/\/model\/user\/overview/);
    await browser.get(currentUrl);
  });
});
