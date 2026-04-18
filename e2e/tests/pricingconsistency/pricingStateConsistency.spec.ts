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

  // 🔥 dynamic checkout data
  const { firstName, lastName, zip } = TestData.getCheckoutData();

  // Login
  await loginPage.navigateToLoginPage();
  await loginPage.login(user.username, user.password);

  // -------- INVENTORY --------
  const item = inventoryPage.inventoryItems.first();

  const invName = await item.getByTestId('inventory-item-name').textContent();
  const invPrice = await item.getByTestId('inventory-item-price').textContent();

  expect(invName).not.toBeNull();
  expect(invPrice).not.toBeNull();

  await inventoryPage.addBackpackToCart();

  // -------- CART --------
  await inventoryPage.goToCart();

  const cartItem = cartPage.cartItems.first();

  const cartName = await cartItem.getByTestId('inventory-item-name').textContent();
  const cartPrice = await cartItem.getByTestId('inventory-item-price').textContent();

  expect(cartName).toBe(invName);
  expect(cartPrice).toBe(invPrice);

  // -------- CHECKOUT --------
  await cartPage.clickCheckout();

  await checkOutPage.fillUserDetails(firstName, lastName, zip);
  await checkOutPage.clickContinue();

  const checkoutItem = cartPage.cartItems.first();

  const checkoutName = await checkoutItem.getByTestId('inventory-item-name').textContent();
  const checkoutPrice = await checkoutItem.getByTestId('inventory-item-price').textContent();

  expect(checkoutName).toBe(invName);
  expect(checkoutPrice).toBe(invPrice);
});