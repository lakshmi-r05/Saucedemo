import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  // Page elements
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly cartIcon: Locator;

  // Product specific (example)
  readonly backpackAddToCartBtn: Locator;
  readonly bikeLightAddToCartBtn: Locator;

  constructor(page: Page) {
    super(page);

    // Page level
    this.title = page.getByText('Products');
    this.inventoryItems = page.getByTestId('inventory-item');
    this.cartIcon = page.getByTestId('shopping-cart-link');

    // Product actions
    this.backpackAddToCartBtn = page.getByTestId('add-to-cart-sauce-labs-backpack');
    this.bikeLightAddToCartBtn = page.getByTestId('add-to-cart-sauce-labs-bike-light');
  }

  // Actions
  async addBackpackToCart() {
    await this.backpackAddToCartBtn.click();
  }

  async addBikeLightToCart() {
    await this.bikeLightAddToCartBtn.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  //Utility methods
  async getInventoryCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async isLoaded(): Promise<boolean> {
    return await this.page.url().includes('inventory');
  }
}