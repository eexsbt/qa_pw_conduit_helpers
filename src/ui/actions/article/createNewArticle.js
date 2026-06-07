import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function createNewArticle(page, article) {
  const createArticlePage = new CreateArticlePage(page);
  const viewArticlePage = new ViewArticlePage(page);

  await createArticlePage.open();

  if (article.tags && article.tags.length) {
    for (const tag of article.tags) {
      await createArticlePage.addTag(tag);
    }
  }

  await createArticlePage.submitCreateArticleForm(article);

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
}
