import { expect } from '@playwright/test';

export class SignUpPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.getByPlaceholder('Username');
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('Password');
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async open() {
    await this.page.goto('/user/register');
  }

  async fillUsernameField(username) {
    await this.usernameField.fill(username);
  }

  async fillEmailField(email) {
    await this.emailField.fill(email);
  }

  async fillPasswordField(password) {
    await this.passwordField.fill(password);
  }

  async clickSignUpButton() {
    await this.signUpButton.click();
  }

  async submitSignUpForm(user) {
    await this.fillUsernameField(user.username);
    await this.fillEmailField(user.email);
    await this.fillPasswordField(user.password);
    await this.clickSignUpButton();
  }

  async assertErrorMessageContainsText(messageText) {
    await expect(this.errorMessage).toContainText(messageText);
  }
}
