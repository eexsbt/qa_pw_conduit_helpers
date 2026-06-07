import { test } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';


test.describe('Edit existing article tags', () => {
  test('Add the tag for the existing article without tags', async ({ page }) => {
    const user = generateNewUserData();
    const article = generateNewArticleData(0);
    const addedTag = 'newtag';

    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await test.step('Sign up user', async () => {
      await signUpUser(page, user);
    });

    await test.step('Create new article', async () => {
      await createNewArticle(page, article);
    });

    await test.step("Click 'Edit Article' button", async () => {
      await viewArticlePage.clickEditArticleButton();
    });

    await test.step(`Add tag '${addedTag}'`, async () => {
      await createArticlePage.addTag(addedTag);
    });

    await test.step('Publish article', async () => {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        createArticlePage.clickPublishArticleButton(),
      ]);
    });

    await test.step('Reload article page', async () => {
      await viewArticlePage.reloadArticlePage();
    });

    await test.step(`Assert tag '${addedTag}' is visible`, async () => {
      await viewArticlePage.assertTagIsVisible(addedTag);
    });
  });

  test('Add the tag for the existing article with tags', async ({ page }) => {
    const user = generateNewUserData();
    const article = generateNewArticleData(1);
    const newTag = 'addedtag';

    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await test.step('Sign up user', async () => {
      await signUpUser(page, user);
    });

    await test.step('Create new article', async () => {
      await createNewArticle(page, article);
    });

    await test.step("Click 'Edit Article' button", async () => {
      await viewArticlePage.clickEditArticleButton();
    });

    await test.step(`Add tag '${newTag}'`, async () => {
      await createArticlePage.addTag(newTag);
    });

    await test.step('Publish article', async () => {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        createArticlePage.clickPublishArticleButton(),
      ]);
    });

    await test.step('Reload article page', async () => {
      await viewArticlePage.reloadArticlePage();
    });

    await test.step(`Assert original tag is visible`, async () => {
      await viewArticlePage.assertTagIsVisible(article.tags[0]);
    });

    await test.step(`Assert tag '${newTag}' is visible`, async () => {
      await viewArticlePage.assertTagIsVisible(newTag);
    });
  });

  test('Remove an article tag for the existing article with tag', async ({ page }) => {
    const user = generateNewUserData();
    const article = generateNewArticleData(2);
    const removedTag = article.tags[0];
    const keptTag = article.tags[1];

    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await test.step('Sign up user', async () => {
      await signUpUser(page, user);
    });

    await test.step('Create new article', async () => {
      await createNewArticle(page, article);
    });

    await test.step("Click 'Edit Article' button", async () => {
      await viewArticlePage.clickEditArticleButton();
    });

    await test.step(`Remove tag '${removedTag}'`, async () => {
      await createArticlePage.removeTag(removedTag);
    });

    await test.step('Publish article', async () => {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        createArticlePage.clickPublishArticleButton(),
      ]);
    });

    await test.step('Reload article page', async () => {
      await viewArticlePage.reloadArticlePage();
    });

    await test.step(`Assert tag '${removedTag}' is not visible`, async () => {
      await viewArticlePage.assertTagIsNotVisible(removedTag);
    });

    await test.step(`Assert kept tag '${keptTag}' is visible`, async () => {
      await viewArticlePage.assertTagIsVisible(keptTag);
    });
  });
});
