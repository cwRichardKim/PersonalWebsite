import { test, expect } from './base-test';

test.describe('Core Visual Tests', () => {
  test('homepage - desktop full page', async ({ page, takeScreenshot }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);
    
    await takeScreenshot(page, 'homepage-desktop-full.png', { fullPage: true });
  });

  test('homepage - desktop viewport', async ({ page, takeScreenshot }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);
    
    await takeScreenshot(page, 'homepage-desktop-viewport.png');
  });

  test('homepage - mobile', async ({ page, takeScreenshot }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForTimeout(3000);
    
    await takeScreenshot(page, 'homepage-mobile.png', { fullPage: true });
  });

  test('homepage - tablet', async ({ page, takeScreenshot }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForTimeout(3000);
    
    await takeScreenshot(page, 'homepage-tablet.png', { fullPage: true });
  });
});

test.describe('Project Pages', () => {
  test('twindr project page', async ({ page, takeScreenshot }) => {
    await page.goto('/twindr');
    await page.waitForLoadState('networkidle');
    
    await takeScreenshot(page, 'twindr-page.png', { fullPage: true });
  });

  test('opensource project page', async ({ page, takeScreenshot }) => {
    await page.goto('/opensource');
    await page.waitForLoadState('networkidle');
    
    await takeScreenshot(page, 'opensource-page.png', { fullPage: true });
  });
});