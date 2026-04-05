import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginBtn = page.getByTestId('login-button');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async navigateToLoginPage() {
  await this.page.goto('/');
}

 
  async expectToBeOnInventoryPage() {
    await this.page.waitForURL(/inventory/);
    
  }
}
