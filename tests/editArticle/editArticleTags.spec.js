import { test } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/auth/article/createNewArticle';


test.describe('Edit existing article tags', () => {
  test('Add the tag for the existing article without tags', async ({ page }) => {
    const user = generateNewUserData();
    const article = generateNewArticleData(0);
    const addedTag = 'newtag';

    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await signUpUser(page, user);
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.addTag(addedTag);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      createArticlePage.clickPublishArticleButton(),
    ]);

    await viewArticlePage.reloadArticlePage();
    await viewArticlePage.assertTagIsVisible(addedTag);
  });

  test('Add the tag for the existing article with tags', async ({ page }) => {
    const user = generateNewUserData();
    const article = generateNewArticleData(1);
    const newTag = 'addedtag';

    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await signUpUser(page, user);
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.addTag(newTag);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      createArticlePage.clickPublishArticleButton(),
    ]);

    await viewArticlePage.reloadArticlePage();
    await viewArticlePage.assertTagIsVisible(article.tags[0]);
    await viewArticlePage.assertTagIsVisible(newTag);
  });

  test('Remove an article tag for the existing article with tag', async ({ page }) => {
    const user = generateNewUserData();
    const article = generateNewArticleData(2);
    const removedTag = article.tags[0];
    const keptTag = article.tags[1];

    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await signUpUser(page, user);
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.removeTag(removedTag);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      createArticlePage.clickPublishArticleButton(),
    ]);

    await viewArticlePage.reloadArticlePage();
    await viewArticlePage.assertTagIsNotVisible(removedTag);
    await viewArticlePage.assertTagIsVisible(keptTag);
  });
});
