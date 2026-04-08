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

  // Fill details
  await checkOutPage.fillUserDetails('John', 'Doe', '560001');
  
  //Clicking continue after filling details
  await checkOutPage.clickContinue();

  // Finish order
  await checkOutPage.finishOrder();

  // Verify success
  await checkOutPage.verifyOrderSuccess();
});