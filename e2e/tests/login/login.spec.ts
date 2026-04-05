import { expect } from '@playwright/test';
import { test } from '../../utils/baseTest';
import { TestData } from '../../utils/testData';

test("Login with standard user", async ({ loginPage, inventoryPage })=> {

  const user = TestData.getUser("STANDARD");

  await loginPage.navigateToLoginPage();
  await loginPage.login(user.username, user.password);

  const isInventory = await inventoryPage.isLoaded();
  expect(isInventory).toBe(true);
  
});