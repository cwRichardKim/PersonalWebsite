# Screenshot Testing with Playwright

This project uses Playwright for automated screenshot testing to detect visual changes in your personal website. This helps ensure that structural changes don't accidentally break the UI and that intentional visual changes are properly captured.

## Overview

The screenshot testing system is designed to support your agentic coding workflow by:

1. **Verifying no-op changes**: Automatically confirm that structural changes (migrations, metrics, styling tidies) don't affect the visual appearance
2. **Detecting visual changes**: Show you exactly what changed when you make intentional UI modifications
3. **CI/CD integration**: Run automatically on pull requests to catch visual regressions

## Setup

### Prerequisites

- Ruby (for Jekyll)
- Node.js (for Playwright)
- Bundler and npm

### Installation

```bash
# Install Ruby dependencies
bundle install

# Install Node.js dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

### Basic Commands

```bash
# Run all screenshot tests
npm run test

# Run tests with UI (interactive mode)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Update baseline screenshots (when you make intentional changes)
npm run test:update-snapshots

# Clean up old snapshots and test results
npm run test:clean

# Reset everything and create fresh baselines
npm run test:reset

# View test report
npm run test:report
```

### Test Structure

The tests are organized into focused categories:

1. **Core Visual Tests** (`main.spec.ts`)
   - Desktop full page and viewport screenshots
   - Mobile and tablet responsive tests
   - Covers all essential viewport sizes

2. **Project Pages** (`main.spec.ts`)
   - Individual project page screenshots
   - Full page coverage for each project (twindr, jumbosmash, opensource, polyhack)

3. **Interactive Features** (`main.spec.ts`)
   - Before/after screenshots for interactive features
   - Dynamic content testing (read more functionality)

## Workflow Examples

### Scenario 1: No-op Structural Changes

When you make changes that shouldn't affect the UI (migrations, adding metrics, etc.):

```bash
# 1. Make your structural changes
# 2. Run tests to verify no visual changes
npm run test

# If tests pass, your changes are safe to merge
# If tests fail, review the differences in the report
```

### Scenario 2: Intentional Visual Changes

When you make changes that should affect the UI:

```bash
# 1. Make your visual changes
# 2. Update baseline screenshots
npm run test:update-snapshots

# 3. Run tests to verify the changes are captured
npm run test

# 4. Review the updated screenshots in the report
```

### Scenario 3: New Features

When adding new content or features:

```bash
# 1. Add your new feature
# 2. Update baselines to capture the new content
npm run test:update-snapshots

# 3. Verify the new content is properly captured
npm run test
```

## CI/CD Integration

The GitHub Actions workflow (`.github/workflows/screenshot-tests.yml`) automatically:

- Runs on every pull request
- Runs on pushes to main/master
- Uploads test results and screenshots as artifacts
- Fails the build if visual regressions are detected

## Understanding Test Results

### Passing Tests
- Screenshots match the baseline images
- No visual changes detected
- Safe to merge

### Failing Tests
- Screenshots differ from baseline
- Visual changes detected
- Review the differences in the test report

### Updating Baselines
When you make intentional visual changes:

1. Run `npm run test:update-snapshots`
2. Commit the updated baseline images
3. Run `npm run test` to verify

### Managing Old Snapshots
When you remove or rename tests, old snapshot files can accumulate:

```bash
# Clean up old snapshots and test results
npm run test:clean

# Reset everything and create fresh baselines
npm run test:reset
```

**Best Practice**: After removing tests, run `npm run test:clean` to remove orphaned snapshot files.

## Best Practices

### For No-op Changes
- Run tests before committing
- If tests fail, investigate why the UI changed
- Only update baselines if the change was intentional

### For Visual Changes
- Always update baselines after making visual changes
- Review the updated screenshots to ensure they look correct
- Consider adding new tests for new features

### For New Features
- Add new test cases for new pages or components
- Update existing tests if the layout changes
- Test on multiple viewport sizes

## Troubleshooting

### Common Issues

1. **Tests fail due to timing issues**
   - Increase wait times in test files
   - Use `waitForLoadState('networkidle')` for dynamic content

2. **Animations causing test flakiness**
   - Tests are configured with `animations: 'disabled'`
   - If issues persist, increase wait times

3. **Jekyll server not starting**
   - Ensure Ruby and Bundler are properly installed
   - Check that `bundle exec jekyll serve` works manually

4. **Screenshots not matching**
   - Check if fonts or images are loading correctly
   - Verify the Jekyll site is building properly
   - Consider if the change was intentional

### Debug Mode

Run tests in headed mode to see what's happening:

```bash
npm run test:headed
```

This opens a browser window so you can see the tests running and debug any issues.

## File Structure

```
tests/
├── main.spec.ts            # Main test suite (clean & focused)
├── base-test.ts            # Helper for clean syntax with automatic masking
└── helpers/                # (empty - helpers removed for simplicity)

test-results/                # Generated test results
playwright-report/          # HTML test reports
```

## Simplified Test Approach

The test suite has been streamlined to focus on essential coverage:

### **Automatic GIF Masking**
All tests automatically ignore dynamic elements:
- GIF images (`img[src$=".gif"]`)
- Animated elements (`.animated`, `[data-animate]`)
- Loading spinners (`.loading`, `.spinner`)

### **Clean Test Syntax**
Tests use the `takeScreenshot()` helper for clean, readable code:

```typescript
// Simple screenshot
await takeScreenshot(page, 'homepage.png');

// Full page screenshot
await takeScreenshot(page, 'homepage.png', { fullPage: true });

// Element-specific screenshot
await takeScreenshot(page, 'header.png', { element: headerElement });
```

### **Focused Coverage**
- **Core Visual Tests**: Desktop + mobile (covers responsive design)
- **Project Pages**: All 4 project pages (covers content)
- **Interactive Features**: Read more functionality (covers dynamic behavior)

## Advanced Configuration

### Custom Viewport Sizes

Add custom viewport tests in `main.spec.ts`:

```typescript
test('custom viewport', async ({ page, takeScreenshot }) => {
  await page.setViewportSize({ width: 1200, height: 800 });
  await takeScreenshot(page, 'custom-viewport.png', { fullPage: true });
});
```

### Element-specific Screenshots

Focus on specific elements using the helper:

```typescript
const element = page.locator('.specific-element');
await takeScreenshot(page, 'element-name.png', { element });
```

### Multiple Browser Testing

The configuration tests on Chrome, Firefox, and Safari. Screenshots are taken for each browser to ensure cross-browser compatibility.

## Integration with Agentic Coding

This screenshot testing system is designed to work seamlessly with AI coding assistants:

1. **Before changes**: Run tests to establish baseline
2. **During development**: AI can run tests to verify changes
3. **After changes**: AI can analyze test results and show differences
4. **In PRs**: Automated testing catches regressions

The system provides visual feedback that helps AI assistants understand the impact of code changes on the user interface.
