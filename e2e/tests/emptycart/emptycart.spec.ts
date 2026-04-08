import { expect } from '@playwright/test';
import { test } from '../../utils/baseTest';
import { TestData } from '../../utils/testData';
import { CheckOutPage } from '../../pages/CheckOutPage';

test('Checkout with Empty Cart', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkOutPage
}) => {

  const user = TestData.getUser("STANDARD");

  // Login
  await loginPage.navigateToLoginPage();
  await loginPage.login(user.username, user.password);

  // Go to cart WITHOUT adding product
  await inventoryPage.goToCart();

  // Validate cart is empty
  const count = await cartPage.getCartItemCount();
  expect(count).toBe(0);

  // Try checkout
  await cartPage.clickCheckout();

  //Clicking continue without filling details should not proceed to next step
  await checkOutPage.clickContinue();
  
  // Verify error message
  await checkOutPage.verifyFirstNameError();
  
});