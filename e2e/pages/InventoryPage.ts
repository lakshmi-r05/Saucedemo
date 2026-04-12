import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Routes } from '../utils/constants';

export class InventoryPage extends BasePage {
  // Page elements
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly cartIcon: Locator;

  // Product specific (example)
  readonly backpackAddToCartBtn: Locator;
  readonly bikeLightAddToCartBtn: Locator;

  // Sorting
  readonly sortDropdown: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    super(page);

    // Page level
    this.title = page.getByText('Products');
    this.inventoryItems = page.getByTestId('inventory-item');
    this.cartIcon = page.getByTestId('shopping-cart-link');

    // Product actions
    this.backpackAddToCartBtn = page.getByTestId('add-to-cart-sauce-labs-backpack');
    this.bikeLightAddToCartBtn = page.getByTestId('add-to-cart-sauce-labs-bike-light');

    // Sorting (kept your locators + safer fallback)
this.sortDropdown = page.locator('.product_sort_container');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
  }

  // ===== Existing Actions (UNCHANGED) =====

  async addBackpackToCart() {
    await this.backpackAddToCartBtn.click();
  }

  async addBikeLightToCart() {
    await this.bikeLightAddToCartBtn.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  // ===== Existing Utility Methods (UNCHANGED) =====

  async getInventoryCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async isLoaded(): Promise<boolean> {
    return this.page.url().includes('inventory');
  }
    async waitForInventoryPage() {
    await this.page.waitForURL(new RegExp(Routes.INVENTORY));
    await this.title.waitFor({ state: 'visible' });
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async getItemNames(): Promise<string[]> {
    return await this.itemNames.allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    const prices = await this.itemPrices.allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  // ===== NEW METHODS (ADDED ONLY, nothing removed) =====

  async openFirstItem() {
    await this.itemNames.first().click();
  }

  async goBack() {
    await this.page.goBack();
  }

  async addFirstItemToCart() {
    await this.inventoryItems
      .first()
      .getByRole('button', { name: /add to cart/i })
      .click();
  }
}