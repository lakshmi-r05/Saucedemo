import { test, expect } from '../../utils/baseTest';
import { TestData } from '../../utils/testData';

test.describe('Session Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    const user = TestData.getUser('STANDARD');
    await loginPage.navigateToLoginPage();
    await loginPage.login(user.username, user.password);
    await loginPage.waitForInventoryPage();
  });
  test('Logout should redirect to login page', async ({
    inventoryPage,
    loginPage
  }) => {
    await inventoryPage.logout();
    const isLoginVisible = await loginPage.isLoginButtonVisible();
    expect(isLoginVisible).toBe(true);
  });

    test('Unauthorized URL access', async ({
    inventoryPage,
    loginPage
  }) => {
    const inventoryUrl = await inventoryPage.getCurrentUrl();
    await inventoryPage.logout();
    await inventoryPage.goto(inventoryUrl);
    const isLoginVisible = await loginPage.isLoginButtonVisible();
    expect(isLoginVisible).toBe(true);
  });

    
  test('Reset App State', async ({
    inventoryPage
  }) => {

    await inventoryPage.addBackpackToCart();
    await inventoryPage.resetAppState();
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(0);
  });

    test('Back button after logout', async ({
    inventoryPage,
    loginPage
  }) => {

    await inventoryPage.logout();
    await inventoryPage.goBack();
    const isLoginVisible = await loginPage.isLoginButtonVisible();
    expect(isLoginVisible).toBe(true);
  });

  test('Session persists after refresh', async ({
    inventoryPage
  }) => {

    await inventoryPage.addBackpackToCart();
    await inventoryPage.refreshPage();
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBeGreaterThan(0);
  });
});