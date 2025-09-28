import { test as base, Page, Locator, expect } from '@playwright/test';

/**
 * Common mask selectors for dynamic elements
 */
const COMMON_MASKS = [
  'img[src$=".gif"]',
  'img[src$=".GIF"]',
  '.animated',
  '[data-animate]',
  '.loading',
  '.spinner'
];

/**
 * Extended test with screenshot utilities
 */
export const test = base.extend<{
  takeScreenshot: (page: Page, name: string, options?: {
    fullPage?: boolean;
    element?: Locator;
    additionalMasks?: string[];
  }) => Promise<void>;
}>({
  takeScreenshot: async ({ page }, use) => {
    const takeScreenshot = async (
      page: Page,
      name: string,
      options: {
        fullPage?: boolean;
        element?: Locator;
        additionalMasks?: string[];
      } = {}
    ) => {
      const { fullPage = false, element, additionalMasks = [] } = options;
      
      const allMasks = [...COMMON_MASKS, ...additionalMasks];
      const maskLocators = allMasks.map(selector => page.locator(selector));
      
      const screenshotOptions = {
        fullPage,
        animations: 'disabled' as const,
        mask: maskLocators
      };
      
      if (element) {
        await expect(element).toHaveScreenshot(name, screenshotOptions);
      } else {
        await expect(page).toHaveScreenshot(name, screenshotOptions);
      }
    };
    
    await use(takeScreenshot);
  }
});

export { expect } from '@playwright/test';
