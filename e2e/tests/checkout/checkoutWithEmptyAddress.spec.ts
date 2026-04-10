import { expect } from '@playwright/test';
import { test } from '../../utils/baseTest';
import { TestData } from '../../utils/testData';

test('Successful Order Placement', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkOutPage
}) => {

  const user = TestData.getUser("STANDARD");

  // Login
  await loginPage.navigateToLoginPage();
  await loginPage.login(user.username, user.password);

  // Validate inventory page
  expect(await inventoryPage.isLoaded()).toBe(true);

  // Add product
  await inventoryPage.addBackpackToCart();

  // Go to cart (use BasePage method)
  await inventoryPage.goToCart();

  // Validate item added
  const count = await cartPage.getCartItemCount();
  expect(count).toBeGreaterThan(0);

  // Checkout
  await cartPage.clickCheckout();

  //Clicking continue without filling details should not proceed to next step
  await checkOutPage.clickContinue();
  
  // Verify error message
  await checkOutPage.verifyFirstNameError();

  });