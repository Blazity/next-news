import { expect, test } from "@playwright/test"

test("has title", async ({ page }) => {
  await page.goto("./en")

  await expect(page).toHaveTitle(/Blazity-Hygraph news starter/)
})
