import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckOutPage } from '../pages/CheckOutPage';
import { TestData } from './testData';

type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkOutPage: CheckOutPage;
  authenticatedPage: Page; // page after login
};

// Extend base test with custom fixtures
export const test = base.extend<Pages>({
  loginPage: async ({ page }: { page: Page }, use) => {
    await use(new LoginPage(page));
  },

  authenticatedPage: async ({ page, loginPage }: { page: Page; loginPage: LoginPage }, use) => {
    const user = TestData.getUser('STANDARD'); // get credentials dynamically
    await loginPage.navigateToLoginPage();
    await loginPage.login(user.username, user.password);
    await use(page); // page is now authenticated
  },

  inventoryPage: async ({ authenticatedPage }: { authenticatedPage: Page }, use) => {
    await use(new InventoryPage(authenticatedPage));
  },

  cartPage: async ({ authenticatedPage }: { authenticatedPage: Page }, use) => {
    await use(new CartPage(authenticatedPage));
  },

  checkOutPage: async ({ authenticatedPage }: { authenticatedPage: Page }, use) => {
    await use(new CheckOutPage(authenticatedPage));
  },
});

export const expect = base.expect; // optional, can also import directly from @playwright/test