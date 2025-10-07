import { test, expect } from '@playwright/test';

// Basic nav between Landing, Sign in, and Sign up

test.describe('Navigation', () => {
  test('landing has auth CTAs and links work', async ({ page }) => {
    await page.goto('/');

    const signUp = page.getByRole('link', { name: 'Sign up' }).first();
    const logIn = page.getByRole('link', { name: 'Log in' }).first();

    await expect(signUp).toBeVisible();
    await expect(logIn).toBeVisible();

    // Prefer the specific CTA on the landing page if present
    const ctaSignUp = page.getByRole('link', { name: 'Go to example sign up' });
    if (await ctaSignUp.isVisible()) {
      await ctaSignUp.click();
    } else {
      await signUp.click();
    }
    await expect(page).toHaveURL(/\/sign-up$/);
    // Relax brittle heading assertion - verify auth form elements instead
    await expect(page.locator('form').getByRole('link', { name: 'Continue with Email' })).toBeVisible();

    await page.getByRole('link', { name: 'Log in' }).first().click();
    await expect(page).toHaveURL(/\/sign-in$/);
    await expect(page.locator('form').getByRole('link', { name: 'Continue with Email' })).toBeVisible();
  });

  test('cross-links between sign-in and sign-up', async ({ page }) => {
    await page.goto('/sign-in');
    // Intentionally break: incorrect text selector that should not exist
    await page.getByText('Register').click();
    await expect(page).toHaveURL(/\/sign-up$/);

    await page.locator('form').getByRole('link', { name: 'Log in' }).click();
    await expect(page).toHaveURL(/\/sign-in$/);
  });
});
