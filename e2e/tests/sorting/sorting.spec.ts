import { test, expect } from '../../utils/baseTest';
import { SortOptions, Routes } from '../../utils/constants';
import { TestData } from '../../utils/testData';

test.describe('SauceDemo Sorting Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
  const user = TestData.getUser('STANDARD');

  await loginPage.navigateToLoginPage();
  await loginPage.login(user.username, user.password);
});

  test('Sort Name A-Z', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SortOptions.NAME_ASC);

    const names = await inventoryPage.getItemNames();
    const sorted = [...names].sort();

    expect(names).toEqual(sorted);
  });

  test('Sort Name Z-A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SortOptions.NAME_DESC);

    const names = await inventoryPage.getItemNames();
    const sorted = [...names].sort().reverse();

    expect(names).toEqual(sorted);
  });

  test('Sort Price Low to High', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SortOptions.PRICE_LOW_HIGH);

    const prices = await inventoryPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });

  test('Sort Price High to Low', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SortOptions.PRICE_HIGH_LOW);

    const prices = await inventoryPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
  });

  test('Sorting resets after navigation', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SortOptions.NAME_DESC);

    await inventoryPage.openFirstItem();
    await inventoryPage.goBack();

    const names = await inventoryPage.getItemNames();
    const defaultSorted = [...names].sort();

    expect(names).toEqual(defaultSorted);
  });

  test('Sorting unaffected after Add to Cart', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SortOptions.NAME_DESC);

    const before = await inventoryPage.getItemNames();
    const sorted = [...before].sort().reverse();

    expect(before).toEqual(sorted);

    await inventoryPage.addFirstItemToCart();

    const after = await inventoryPage.getItemNames();

    expect(after).toEqual(before);
  });

  test('Sorting Reset after refresh', async ({ inventoryPage, page }) => {
    await inventoryPage.sortBy(SortOptions.NAME_DESC);

    await page.reload();

    const names = await inventoryPage.getItemNames();
    const defaultSorted = [...names].sort();

    expect(names).toEqual(defaultSorted);
  });

  test('Sorting dropdown reflects selected option', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SortOptions.PRICE_HIGH_LOW);

    await expect(inventoryPage.sortDropdown)
      .toHaveValue(SortOptions.PRICE_HIGH_LOW);

    await inventoryPage.sortBy(SortOptions.NAME_DESC);

    await expect(inventoryPage.sortDropdown)
      .toHaveValue(SortOptions.NAME_DESC);
  });

  test('Sorting does not change product count', async ({ inventoryPage }) => {
    const countBefore = await inventoryPage.getInventoryCount();

    await inventoryPage.sortBy(SortOptions.NAME_ASC);

    const countAfter = await inventoryPage.getInventoryCount();

    expect(countAfter).toBe(countBefore);
  });

});


test.describe('Unauthenticated tests', () => {

 test('Access inventory without login redirects to login page', async ({ page }) => {

  await page.goto(Routes.BASE_URL + Routes.INVENTORY);

  // SauceDemo redirects unauthenticated users to login page (root URL)
  await expect(page).toHaveURL(Routes.BASE_URL + Routes.LOGIN);
});

});