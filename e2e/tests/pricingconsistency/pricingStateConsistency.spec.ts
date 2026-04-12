import { expect } from '@playwright/test';
import { test } from '../../utils/baseTest';
import { TestData } from '../../utils/testData';

test('Pricing consistency across Inventory → Cart → Checkout', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkOutPage
}) => {

  const user = TestData.getUser("STANDARD");

  // Login
  await loginPage.navigateToLoginPage();
  await loginPage.login(user.username, user.password);

  // -------- INVENTORY --------
  const item = inventoryPage.inventoryItems.first();

  const invName = await item.locator('[data-test="inventory-item-name"]').textContent();
  const invPrice = await item.locator('[data-test="inventory-item-price"]').textContent();

  // Safety check (avoid null)
  expect(invName).not.toBeNull();
  expect(invPrice).not.toBeNull();

  // Add item
  await inventoryPage.addBackpackToCart();

  // -------- CART --------
  await inventoryPage.goToCart();

  const cartItem = cartPage.cartItems.first();

  const cartName = await cartItem.locator('[data-test="inventory-item-name"]').textContent();
  const cartPrice = await cartItem.locator('[data-test="inventory-item-price"]').textContent();

  expect(cartName).toBe(invName);
  expect(cartPrice).toBe(invPrice);

  // -------- CHECKOUT --------
  await cartPage.clickCheckout();

  await checkOutPage.fillUserDetails('John', 'Doe', '560001');
  await checkOutPage.clickContinue();

  // Reuse same locator (no change to CheckoutPage)
  const checkoutItem = cartPage.cartItems.first();

  const checkoutName = await checkoutItem.locator('[data-test="inventory-item-name"]').textContent();
  const checkoutPrice = await checkoutItem.locator('[data-test="inventory-item-price"]').textContent();

  expect(checkoutName).toBe(invName);
  expect(checkoutPrice).toBe(invPrice);
});