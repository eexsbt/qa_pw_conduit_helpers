import { test } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/auth/article/createNewArticle';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';


test.describe('Edit existing article description', () => {
  test('Edit existing article description', async ({ page }) => {
    const user = generateNewUserData();
    const article = generateNewArticleData(1);
    const updatedDescription = 'Updated article description for editing test.';

    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await signUpUser(page, user);
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillDescriptionField(updatedDescription);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      createArticlePage.clickPublishArticleButton(),
    ]);

    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.assertDescriptionFieldValue(updatedDescription);
  });

  test('Remove an article description for the existing article', async ({ page }) => {
    const user = generateNewUserData();
    const article = generateNewArticleData(1);

    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await signUpUser(page, user);
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillDescriptionField('');
    await createArticlePage.clickPublishArticleButton();

    await createArticlePage.assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
  });
});
