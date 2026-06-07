import { test } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';


test.describe('Edit existing article title', () => {
  test('Edit existing article title', async ({ page }) => {
    const user = generateNewUserData();
    const article = generateNewArticleData(2);
    const updatedTitle = 'Updated Test Article Title';

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

    await test.step('Fill title field', async () => {
      await createArticlePage.fillTitleField(updatedTitle);
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

    await test.step('Assert article title is visible', async () => {
      await viewArticlePage.assertArticleTitleIsVisible(updatedTitle);
    });
  });

  test('Remove an article title for the existing article', async ({ page }) => {
    const user = generateNewUserData();
    const article = generateNewArticleData(1);

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

    await test.step('Fill title field with empty value', async () => {
      await createArticlePage.fillTitleField('');
    });

    await test.step('Click publish button', async () => {
      await createArticlePage.clickPublishArticleButton();
    });

    await test.step('Assert error message is shown', async () => {
      await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
    });
  });
});