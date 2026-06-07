import { SignUpPage } from '../../pages/auth/SignUpPage';
import { HomePage } from '../../pages/HomePage';

export async function signUpUser(page, user) {
  const signUpPage = new SignUpPage(page);
  const homePage = new HomePage(page);

  await signUpPage.open();
  await signUpPage.submitSignUpForm(user);

  await homePage.assertYourFeedTabIsVisible();
}
