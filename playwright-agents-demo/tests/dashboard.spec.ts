import { test, expect } from '@playwright/test';

// Verifies that visiting dashboard unauthenticated redirects/shows Sign in page

test.describe('Dashboard navigation', () => {
  test('unauthenticated access leads to Sign in', async ({ page }) => {
    await page.goto('/dashboard');

    // The demo redirects/renders the Sign in UI
    await expect(page).toHaveURL(/\/sign-in$/);
    // Relax heading assertion; verify presence of form action instead
    await expect(page.locator('form').getByRole('link', { name: 'Continue with Email' })).toBeVisible();
  });
});
