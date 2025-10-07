import { test, expect } from '@playwright/test';

test.describe('Seed: Demo SaaS landing', () => {
  test('seed', async ({ page }) => {
    await page.goto('https://demo-saas.bugbug.io/');
    await expect(page.getByRole('link', { name: 'Sign up' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log in' }).first()).toBeVisible();
  });
});
