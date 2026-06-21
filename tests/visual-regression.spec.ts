import { expect, test, type Page, type TestInfo } from "@playwright/test";

async function dismissBoot(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: /skip intro/i }).click();
  await expect(page.locator("canvas")).toBeVisible();
  await page.waitForTimeout(700);
}

async function scrollToPinnedProgress(page: Page, id: string, progress: number) {
  await page.evaluate(
    ({ id: sectionId, progress: sectionProgress }) => {
      const element = document.getElementById(sectionId);
      if (!element) throw new Error(`Missing section #${sectionId}`);
      const duration = Math.max(element.offsetHeight - window.innerHeight, window.innerHeight);
      window.scrollTo(0, element.offsetTop + duration * sectionProgress);
    },
    { id, progress }
  );
  await page.waitForTimeout(900);
}

async function scrollToViewportProgress(page: Page, id: string, progress: number) {
  await page.evaluate(
    ({ id: sectionId, progress: sectionProgress }) => {
      const element = document.getElementById(sectionId);
      if (!element) throw new Error(`Missing section #${sectionId}`);
      const start = element.offsetTop - window.innerHeight * 0.62;
      const duration = Math.max(element.offsetHeight + window.innerHeight * 0.42, window.innerHeight);
      window.scrollTo(0, start + duration * sectionProgress);
    },
    { id, progress }
  );
  await page.waitForTimeout(900);
}

async function attachViewportScreenshot(page: Page, testInfo: TestInfo, name: string) {
  await testInfo.attach(`${name}.png`, {
    body: await page.screenshot({ fullPage: false }),
    contentType: "image/png"
  });
}

test("desktop cinematic city labels stay anchored and open journey modal", async ({
  page
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "desktop-only 3D label pass");

  await dismissBoot(page);
  await attachViewportScreenshot(page, testInfo, "01-hero-monolith");

  await scrollToPinnedProgress(page, "city", 0.24);
  await expect(page.getByTestId("journey-hotspot-visync")).toBeVisible();
  await attachViewportScreenshot(page, testInfo, "02-city-labels");

  await page.getByTestId("journey-hotspot-visync").click();
  await expect(page.getByTestId("journey-modal-visync")).toBeVisible();
  await expect(page.getByText("Journey draft coming soon.").first()).toBeVisible();
  await attachViewportScreenshot(page, testInfo, "03-city-journey-modal");
  await page.getByTestId("journey-modal-close").click();

  await scrollToPinnedProgress(page, "city", 0.58);
  await attachViewportScreenshot(page, testInfo, "04-city-orbit");

  await scrollToViewportProgress(page, "core", 0.32);
  await attachViewportScreenshot(page, testInfo, "05-core-reveal");
});

test("mobile keeps the simplified journey card fallback responsive", async ({
  page
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "mobile-only fallback pass");

  await dismissBoot(page);
  await scrollToPinnedProgress(page, "city", 0.16);
  await expect(page.getByTestId("mobile-journey-visync")).toBeVisible();
  await attachViewportScreenshot(page, testInfo, "mobile-city-cards");

  await page.getByTestId("mobile-journey-visync").click();
  await expect(page.getByTestId("journey-modal-visync")).toBeVisible();
  await expect(page.getByText("Journey draft coming soon.").first()).toBeVisible();
  await attachViewportScreenshot(page, testInfo, "mobile-journey-modal");
});
