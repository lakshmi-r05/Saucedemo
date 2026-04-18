import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  // Navigation
  readonly menuBtn: Locator;
  readonly cartBtn: Locator;

  // Menu options
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;

  // Common UI
  readonly backBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.menuBtn = page.locator('#react-burger-menu-btn'); // no testId available
    this.cartBtn = page.getByTestId('shopping-cart-link');

    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.resetAppStateLink = page.getByTestId('reset-sidebar-link');

    this.backBtn = page.getByRole('button', { name: 'Back' });
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async goBack() {
    await this.page.goBack();
  }

  async goToCart() {
    await this.cartBtn.click();
  }

  // ✅ Stable menu handling
async openMenu() {
  // 1. Ensure we are on inventory page
  await this.page.waitForURL(/inventory/);

  // 2. Wait for button to be ready
  await this.menuBtn.waitFor({ state: 'visible' });

  // 3. Scroll (important for viewport issues)
  await this.menuBtn.scrollIntoViewIfNeeded();

  // 4. Click safely
  await this.menuBtn.click({ force: true });

  // 5. Wait for menu panel
  await this.page.locator('.bm-menu-wrap').waitFor({ state: 'visible' });
}
  // ✅ Stable logout
 async logout() {
  await this.openMenu();

  await this.logoutLink.scrollIntoViewIfNeeded();

  // 🔥 Ensure it's really clickable
  await this.logoutLink.waitFor({ state: 'visible' });

  await this.logoutLink.click();
}
  async resetAppState() {
    await this.openMenu();
    await this.resetAppStateLink.click();
  }

  async refreshPage() {
    await this.page.reload();
  }
}