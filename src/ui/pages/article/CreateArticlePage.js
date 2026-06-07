import { expect } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.locator('button:has-text("Publish Article"), button:has-text("Update Article")').first();
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async open() {
    await this.page.goto('/editor');
  }

  async fillTitleField(title) {
    await this.titleField.fill(title);
  }

  async fillDescriptionField(description) {
    await this.descriptionField.fill(description);
  }

  async fillTextField(text) {
    await this.textField.fill(text);
  }

  async assertDescriptionFieldValue(description) {
    await expect(this.descriptionField).toHaveValue(description);
  }

  async submitCreateArticleForm(article) {
    await this.fillTitleField(article.title);
    await this.fillDescriptionField(article.description);
    await this.fillTextField(article.text);
    await this.clickPublishArticleButton();
  }

  async addTag(tag) {
    await this.tagField.fill(tag);
    await this.tagField.press('Enter');
  }

  async removeTag(tag) {
    const tagLocator = this.page.locator('.tag-list span', { hasText: tag });
    await tagLocator.locator('i').click();
  }

  async assertTagIsVisible(tag) {
    await expect(this.page.locator('.tag-list span', { hasText: tag })).toBeVisible();
  }

  async assertTagIsNotVisible(tag) {
    await expect(this.page.locator('.tag-list span', { hasText: tag })).toBeHidden();
  }

  async clickPublishArticleButton() {
    await this.publishArticleButton.click();
  }

  async assertErrorMessageContainsText(messageText) {
    await expect(this.errorMessage).toContainText(messageText);
  }
}
