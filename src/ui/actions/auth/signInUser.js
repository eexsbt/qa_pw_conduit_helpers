import { SignInPage } from '../../pages/auth/SignInPage';
import { HomePage } from '../../pages/HomePage';

export async function signInUser(page, credentials) {
  const signInPage = new SignInPage(page);
  const homePage = new HomePage(page);

  await signInPage.open();
  await signInPage.fillEmailField(credentials.username);
  await signInPage.fillPasswordField(credentials.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
}
