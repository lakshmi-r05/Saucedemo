import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckOutPage } from '../pages/CheckOutPage';
import { TestData } from './testData';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkOutPage: CheckOutPage;
  authenticatedPage: Page;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const user = TestData.getUser('STANDARD');

    await loginPage.goto('/');
    await loginPage.login(user.username, user.password);

    await use(page);
  },

  inventoryPage: async ({ authenticatedPage }, use) => {
    await use(new InventoryPage(authenticatedPage));
  },

  cartPage: async ({ authenticatedPage }, use) => {
    await use(new CartPage(authenticatedPage));
  },

  checkOutPage: async ({ authenticatedPage }, use) => {
    await use(new CheckOutPage(authenticatedPage));
  },
});

export { expect } from '@playwright/test';