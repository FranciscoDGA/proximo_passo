import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should sign up with valid credentials', async ({ page }) => {
    await page.goto('/signup');

    // Fill form
    await page.fill('input[type="text"]', 'João Silva');
    await page.fill('input[type="email"]', `user-${Date.now()}@test.com`);
    await page.fill('input[type="password"]', 'TestPassword123');

    // Submit
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });

  test('should sign in with valid credentials', async ({ page }) => {
    // Note: This test assumes a test user exists in the database
    await page.goto('/signin');

    // Fill form
    await page.fill('input[type="email"]', 'test@proximopasso.com');
    await page.fill('input[type="password"]', 'TestPassword123');

    // Submit
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });

  test('should show error on invalid email', async ({ page }) => {
    await page.goto('/signup');

    // Fill form with invalid email
    await page.fill('input[type="text"]', 'João Silva');
    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[type="password"]', 'TestPassword123');

    // Submit
    await page.click('button[type="submit"]');

    // Should show error message
    const errorMessage = page.locator('text=email');
    await expect(errorMessage).toBeVisible();
  });

  test('should sign out successfully', async ({ page }) => {
    // First sign in
    await page.goto('/signin');
    await page.fill('input[type="email"]', 'test@proximopasso.com');
    await page.fill('input[type="password"]', 'TestPassword123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');

    // Click logout
    const logoutButton = page.locator('button:has-text("Sair")');
    if (await logoutButton.isVisible()) {
      await logoutButton.click();

      // Should redirect to home
      await expect(page).toHaveURL('/');
    }
  });
});
