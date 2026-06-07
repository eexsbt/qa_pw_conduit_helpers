import { test } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/auth/article/createNewArticle';
import { BODY_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';


test.describe('Edit existing article text', () => {
  test('Edit existing article text', async ({ page }) => {
    const user = generateNewUserData();
    const article = generateNewArticleData(1);
    const updatedText = 'Updated article body text for editing test.';

    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await signUpUser(page, user);
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTextField(updatedText);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      createArticlePage.clickPublishArticleButton(),
    ]);

    await viewArticlePage.reloadArticlePage();
    await viewArticlePage.assertArticleTextIsVisible(updatedText);
  });

  test('Remove the article text for the existing article', async ({ page }) => {
    const user = generateNewUserData();
    const article = generateNewArticleData(1);

    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await signUpUser(page, user);
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTextField('');
    await createArticlePage.clickPublishArticleButton();

    await createArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
  });
});
