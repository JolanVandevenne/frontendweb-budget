// tests/addTransaction.spec.ts
import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test('should add a transaction', async ({ page }) => {
  await page.goto('/transactions');
  await page.getByRole('table').waitFor({ state: 'visible' });

  const transactions = page.getByTestId('transaction');
  const countBefore = await transactions.count();

  await page.goto('/transactions/add');
  await page
    .getByRole('heading', { name: 'Add Transaction' })
    .waitFor({ state: 'visible' });

  const now = new Date();
  now.setDate(now.getDate() - 2);
  const dateStr = now.toISOString().split('T')[0];
  await page.getByTestId('date-picker-trigger').click();
  await page.getByTestId(dateStr).click({ timeout: 2000 });
  await page.keyboard.press('Escape');

  // Select first place
  await page.getByRole('combobox').click();
  await page.getByRole('option').first().waitFor({ state: 'visible' });
  await page.getByRole('option').first().click();

  // Fill in amount
  await page.getByTestId('amount-input').fill('200');
  await page.getByTestId('amount-input').blur();

  await page
    .getByRole('button', { name: 'Add transaction' })
    .click({ timeout: 2000 });
  await page.waitForURL('/transactions');

  await expect(transactions).toHaveCount(countBefore + 1);
  await expect(transactions.first()).toContainText('Thomas');
  await expect(transactions.first()).toContainText('200');
});


test('should remove the transaction', async ({ page }) => {
  await page.goto('/transactions');
  await page.getByRole('table').waitFor({ state: 'visible' });

  const transactions = page.getByTestId('transaction');
  const countBefore = await transactions.count();

  await transactions
    .first()
    .getByRole('button', { name: 'Delete transaction' })
    .click();

  await expect(transactions).toHaveCount(countBefore - 1);
});

test('should show error message for an invalid amount', async ({ page }) => {
  await page.goto('/transactions/add');
  await page.getByTestId('amount-input').fill('0');
  await page.getByTestId('amount-input').blur();
  await expect(page.getByText('0 is not a valid amount')).toBeVisible();
});