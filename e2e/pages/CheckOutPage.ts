import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckOutPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueBtn: Locator;
  readonly finishBtn: Locator;
  readonly successMessage: Locator;
  readonly firstNameError: Locator;

  constructor(page: Page) {
    super(page);

    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueBtn = page.getByTestId('continue');
    this.finishBtn = page.getByTestId('finish');
    this.successMessage = page.getByText('Thank you for your order!');
    this.firstNameError = page.getByText('Error: First Name is required');
  }

  async fillUserDetails(fname: string, lname: string, zip: string) {
    await this.firstName.fill(fname);
    await this.lastName.fill(lname);
    await this.postalCode.fill(zip);
   
  }
  
  async clickContinue() {
    await this.continueBtn.click();
  }

  async verifyFirstNameError() {
    await expect(this.firstNameError).toBeVisible();
}

  async finishOrder() {
    await this.finishBtn.click();
  }

  async verifyOrderSuccess() {
    await expect(this.successMessage).toBeVisible();
  }
}