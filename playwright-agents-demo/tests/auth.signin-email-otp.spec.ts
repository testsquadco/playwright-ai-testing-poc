import { test, expect } from '@playwright/test';

// Covers: Login via Email OTP entry page reachability and basic UI checks

test.describe('Auth: Sign in via Email OTP', () => {
  test('navigate from Sign in to Email OTP', async ({ page }) => {
    await page.goto('/sign-in');

    // Avoid brittle heading checks; assert URL and presence of the auth form link instead
    await expect(page).toHaveURL(/\/sign-in$/);
    await expect(page.locator('form').getByRole('link', { name: 'Continue with Email' })).toBeVisible();

    await page.locator('form').getByRole('link', { name: 'Continue with Email' }).click();
    await expect(page).toHaveURL(/\/email-otp$/);

    // Email OTP page: verify back navigation exists
    await expect(page.getByRole('link', { name: 'Back' })).toBeVisible();
  });
});
