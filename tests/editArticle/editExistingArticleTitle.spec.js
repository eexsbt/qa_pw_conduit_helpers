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

    await signUpUser(page, user);
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTitleField(updatedTitle);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      createArticlePage.clickPublishArticleButton(),
    ]);

    await viewArticlePage.reloadArticlePage();
    await viewArticlePage.assertArticleTitleIsVisible(updatedTitle);
  });

  test('Remove an article title for the existing article', async ({ page }) => {
    const user = generateNewUserData();
    const article = generateNewArticleData(1);

    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await signUpUser(page, user);
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTitleField('');
    await createArticlePage.clickPublishArticleButton();

    await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
  });
});