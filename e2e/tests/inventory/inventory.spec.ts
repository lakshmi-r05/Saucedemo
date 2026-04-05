import { expect } from '@playwright/test';
import { test } from '../../utils/baseTest';


test('Verify inventory items are visible', async ({ inventoryPage }) => {
  // No login needed here; inventoryPage is already authenticated
  await expect(inventoryPage.title).toBeVisible();
  await expect(inventoryPage.inventoryItems).toHaveCount(6);
});