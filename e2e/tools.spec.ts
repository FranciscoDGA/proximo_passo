import { test, expect } from '@playwright/test';

test.describe('Interactive Tools', () => {
  test('should load tools page', async ({ page }) => {
    await page.goto('/tools');

    // Verify page title
    await expect(page.locator('h1')).toContainText('Ferramentas Interativas');

    // Verify all 5 tools are visible
    const tools = ['Calculadora MEI', 'Simulador de Financiamento', 'Simulador FGTS', 'Organizador de Documentos', 'Comparador de Benefícios'];

    for (const tool of tools) {
      await expect(page.locator(`text=${tool}`)).toBeVisible();
    }
  });

  test('MEI Calculator should calculate costs', async ({ page }) => {
    await page.goto('/tools');

    // Find MEI calculator section
    const meiSection = page.locator('text=Calculadora MEI').first();
    await meiSection.scrollIntoViewIfNeeded();

    // Find range input for revenue
    const revenueInput = meiSection.locator('input[type="range"]').first();
    await revenueInput.fill('10000');

    // Check calculation appears
    const results = page.locator('text=Total Mensal');
    await expect(results).toBeVisible();
  });

  test('Financing Simulator should calculate', async ({ page }) => {
    await page.goto('/tools');

    // Find financing simulator section
    const simulatorSection = page.locator('text=Simulador de Financiamento').first();
    await simulatorSection.scrollIntoViewIfNeeded();

    // Set property value
    const propertyInput = simulatorSection.locator('input[type="range"]').nth(0);
    await propertyInput.fill('500000');

    // Check monthly payment appears
    const payment = page.locator('text=Prestação Mensal');
    await expect(payment).toBeVisible();
  });

  test('FGTS Calculator should work', async ({ page }) => {
    await page.goto('/tools');

    // Find FGTS calculator section
    const fgtsSection = page.locator('text=Simulador FGTS').first();
    await fgtsSection.scrollIntoViewIfNeeded();

    // Set balance
    const balanceInput = fgtsSection.locator('input[type="range"]').first();
    await balanceInput.fill('50000');

    // Check results appear
    const results = page.locator('text=Rendimentos').first();
    await expect(results).toBeVisible();
  });

  test('Documents Organizer should track documents', async ({ page }) => {
    await page.goto('/tools');

    // Find documents organizer
    const docSection = page.locator('text=Organizador de Documentos').first();
    await docSection.scrollIntoViewIfNeeded();

    // Change category
    const categorySelect = docSection.locator('select').first();
    await categorySelect.selectOption('casamento');

    // Add a document template
    const addButton = docSection.locator('button:has-text("Usar Template")');
    if (await addButton.isVisible()) {
      await addButton.click();

      // Verify template items appear
      const docItems = docSection.locator('button:has-text("Plus")');
      expect(await docItems.count()).toBeGreaterThan(0);
    }
  });

  test('should export tool results', async ({ page }) => {
    await page.goto('/tools');

    // Find MEI calculator
    const meiSection = page.locator('text=Calculadora MEI').first();
    await meiSection.scrollIntoViewIfNeeded();

    // Click download button
    const downloadButton = meiSection.locator('button:has-text("Baixar")');

    // Start waiting for download
    const downloadPromise = page.waitForEvent('download');

    if (await downloadButton.isVisible()) {
      await downloadButton.click();

      // Wait for download to complete
      const download = await downloadPromise;
      expect(download.suggestedFilename()).toContain('.txt');
    }
  });

  test('should support dark mode on tools', async ({ page }) => {
    await page.goto('/tools');

    // Get a tool card
    const toolCard = page.locator('[class*="Card"]').first();

    // Check it has dark mode classes
    const classes = await toolCard.getAttribute('class');
    expect(classes).toContain('dark');
  });
});
