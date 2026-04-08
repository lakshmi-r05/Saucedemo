import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.cartItems = page.getByTestId('inventory-item');
    this.checkoutBtn = page.getByTestId('checkout');
  }

  async clickCheckout() {
    await this.checkoutBtn.click();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }
}