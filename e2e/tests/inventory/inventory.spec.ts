import { expect } from '@playwright/test';
import { test } from '../../utils/baseTest';
import { TestData } from '../../utils/testData';

test.beforeEach(async ({ loginPage, inventoryPage }) => {
  const user = TestData.getUser('STANDARD');

  await loginPage.navigateToLoginPage();
  await loginPage.login(user.username, user.password);

  // Ensure inventory page is loaded
  await expect(inventoryPage.title).toBeVisible();
});

test('Verify inventory items are visible', async ({ inventoryPage }) => {
const count = await inventoryPage.inventoryItems.count();
expect(count).toBeGreaterThan(0);
});