import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  // Navigation
  readonly menuBtn: Locator;
  readonly cartBtn: Locator;

  //Common UI
  readonly backBtn: Locator;

  constructor(page: Page) {
    this.page = page;

     this.menuBtn = page.getByRole('button', { name: 'Open Menu' });
    this.cartBtn = page.getByTestId('shopping-cart-link');
    this.backBtn = page.getByRole('button', { name: 'Back' });
  }

  //Common methods
  async goto(url: string) {
    await this.page.goto(url);
  }

  async goBack() {
    await this.backBtn.click();
  }

  async wait(ms: number) {
    await this.page.waitForTimeout(ms);
  }
  async openMenu() {
  await this.menuBtn.click();
}
async goToCart() {
    await this.cartBtn.click();
  }
}