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
  const checkoutData = TestData.getCheckoutData();
  await loginPage.navigateToLoginPage();
  await loginPage.login(user.username, user.password);
  expect(await inventoryPage.isLoaded()).toBe(true);
  await inventoryPage.addBackpackToCart();
  await inventoryPage.goToCart();

  // Validate item added
  const count = await cartPage.getCartItemCount();
  expect(count).toBeGreaterThan(0);

  // Checkout
  await cartPage.clickCheckout();

  
  await checkOutPage.fillUserDetails(
    checkoutData.firstName,
    checkoutData.lastName,
    checkoutData.zip
  );

  await checkOutPage.clickContinue();

  // Finish order
  await checkOutPage.finishOrder();

  // Verify success
  await checkOutPage.verifyOrderSuccess();
});