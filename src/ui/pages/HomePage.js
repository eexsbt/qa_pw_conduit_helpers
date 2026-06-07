import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async clickNewArticleLink() {
    await this.newArticleLink.click();
  }

  async assertYourFeedTabIsVisible() {
    await expect(this.yourFeedTab).toBeVisible();
  }
}
