import { expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.locator('h1').first();
    this.editArticleLink = page.getByRole('link', { name: 'Edit Article' }).first();
  }

  async clickEditArticleButton() {
    await this.editArticleLink.click();
  }

  async assertArticleTitleIsVisible(title) {
    await expect(this.articleTitleHeader).toContainText(title);
  }

  async assertArticleTextIsVisible(text) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async assertArticleDescriptionIsVisible(description) {
    await expect(this.page.getByText(description)).toBeVisible();
  }

  async assertTagIsVisible(tag) {
    await expect(this.page.locator('.tag-list li', { hasText: tag })).toBeVisible();
  }

  async assertTagIsNotVisible(tag) {
    await expect(this.page.locator('.tag-list li', { hasText: tag })).not.toBeVisible();
  }

  async reloadArticlePage() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }
}
