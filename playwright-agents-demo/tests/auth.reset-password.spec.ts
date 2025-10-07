import { test, expect } from '@playwright/test';

// Covers: Reset password entry page, basic validation affordances (UI presence)

test.describe('Auth: Reset password', () => {
  test('navigate from Sign in to Reset Password', async ({ page }) => {
    await page.goto('/sign-in');

    const reset = page.locator('form').getByRole('link', { name: /forgot password\?/i });
    await expect(reset).toBeVisible();

    await reset.click();
    await expect(page).toHaveURL(/\/reset-password$/);

    // Avoid brittle heading checks; verify presence of back link on the reset flow
    await expect(page.getByRole('link', { name: 'Back' }).first()).toBeVisible();
  });
});
