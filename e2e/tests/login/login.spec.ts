import { expect } from '@playwright/test';
import { test } from '../../utils/baseTest';
import { TestData } from '../../utils/testData';

test("Login with standard user", async ({ loginPage, inventoryPage, page }) => {

  const user = TestData.getUser("STANDARD");

  // Navigate to login page
  await loginPage.navigateToLoginPage();

  // Perform login
  await loginPage.login(user.username, user.password);

  // Wait for inventory page (POM method)
  await inventoryPage.waitForInventoryPage();

  // Assertion (best Playwright practice)
  await expect(page).toHaveURL(/inventory/);
});