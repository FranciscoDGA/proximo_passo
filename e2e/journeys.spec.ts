import { test, expect } from '@playwright/test';

test.describe('Journey Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Sign in before each test
    await page.goto('/signin');
    await page.fill('input[type="email"]', 'test@proximopasso.com');
    await page.fill('input[type="password"]', 'TestPassword123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should display available journeys', async ({ page }) => {
    await page.goto('/journeys');

    // Check that journey cards are visible
    const journeyCards = page.locator('[data-testid="journey-card"]');
    expect(await journeyCards.count()).toBeGreaterThan(0);
  });

  test('should access MEI journey', async ({ page }) => {
    await page.goto('/journeys/abrir-mei');

    // Check page title
    await expect(page.locator('h1')).toContainText('Abrir MEI');

    // Check checklist items are present
    const checklistItems = page.locator('[data-testid="checklist-item"]');
    expect(await checklistItems.count()).toBeGreaterThan(0);
  });

  test('should complete checklist items', async ({ page }) => {
    await page.goto('/journeys/abrir-mei');

    // Find and check first checklist item
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await firstCheckbox.click();

    // Verify it's checked
    await expect(firstCheckbox).toBeChecked();

    // Verify "Salvando..." appears
    const savingIndicator = page.locator('text=Salvando');
    await expect(savingIndicator).toBeVisible({ timeout: 2000 });
  });

  test('should track progress', async ({ page }) => {
    await page.goto('/journeys/abrir-mei');

    // Get initial progress
    const progressBar = page.locator('[data-testid="progress-bar"]');
    await expect(progressBar).toBeVisible();

    // Complete a checklist item
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await firstCheckbox.click();

    // Progress should update
    const updatedProgress = page.locator('[data-testid="progress-percentage"]');
    await expect(updatedProgress).toHaveText(/[1-9]\d?%/);
  });

  test('should save journey progress', async ({ page }) => {
    await page.goto('/journeys/comprar-casa');

    // Complete multiple items
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    const itemsToCheck = Math.min(3, count);

    for (let i = 0; i < itemsToCheck; i++) {
      await checkboxes.nth(i).click();
    }

    // Navigate away and back
    await page.goto('/journeys');
    await page.goto('/journeys/comprar-casa');

    // Verify items are still checked
    for (let i = 0; i < itemsToCheck; i++) {
      await expect(checkboxes.nth(i)).toBeChecked();
    }
  });

  test('should display tools section', async ({ page }) => {
    await page.goto('/journeys/comprar-casa');

    // Look for tools section
    const toolsSection = page.locator('text=Ferramentas');
    await expect(toolsSection).toBeVisible();
  });

  test('should display chat with specialist', async ({ page }) => {
    await page.goto('/journeys/abrir-mei');

    // Look for chat section
    const chatSection = page.locator('text=Chat|Especialista');
    await expect(chatSection).toBeVisible();
  });
});
