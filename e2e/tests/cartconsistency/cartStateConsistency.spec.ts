import { expect } from '@playwright/test';
import { test } from '../../utils/baseTest';
import { TestData } from '../../utils/testData';

test.describe('Cart State Consistency Tests', () => {

  test('Positive: Cart retains items after navigation', async ({
    loginPage,
    inventoryPage,
    cartPage
  }) => {

    const user = TestData.getUser("STANDARD");

    // Login
    await loginPage.navigateToLoginPage();
    await loginPage.login(user.username, user.password);

    // Add item
    await inventoryPage.addBackpackToCart();

    // Go to cart
    await inventoryPage.goToCart();
    const initialCount = await cartPage.getCartItemCount();
    expect(initialCount).toBeGreaterThan(0);

    // Navigate back and return
    await inventoryPage.goBack();
    await inventoryPage.goToCart();

    const finalCount = await cartPage.getCartItemCount();

    expect(finalCount).toBe(initialCount);
  });

  test('Positive: Cart retains items after page refresh', async ({
    loginPage,
    inventoryPage,
    cartPage,
    page
  }) => {

    const user = TestData.getUser("STANDARD");

    // Login
    await loginPage.navigateToLoginPage();
    await loginPage.login(user.username, user.password);

    // Add item
    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();

    const beforeRefresh = await cartPage.getCartItemCount();
    expect(beforeRefresh).toBeGreaterThan(0);

    // Refresh page
    await page.reload();

    // Ensure page is stable
    await expect(cartPage.cartItems.first()).toBeVisible();

    const afterRefresh = await cartPage.getCartItemCount();

    expect(afterRefresh).toBe(beforeRefresh);
  });

  test('Edge: Cart count remains consistent across multiple navigations', async ({
    loginPage,
    inventoryPage,
    cartPage
  }) => {

    const user = TestData.getUser("STANDARD");

    // Login
    await loginPage.navigateToLoginPage();
    await loginPage.login(user.username, user.password);

    // Add item
    await inventoryPage.addBackpackToCart();

    // Multiple navigation cycles
    for (let i = 0; i < 3; i++) {
      await inventoryPage.goToCart();

      const count = await cartPage.getCartItemCount();
      expect(count).toBe(1);

      await inventoryPage.goBack();
    }

    // Final validation
    await inventoryPage.goToCart();
    const finalCount = await cartPage.getCartItemCount();

    expect(finalCount).toBe(1);
  });

});