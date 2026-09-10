import { test, expect } from '@playwright/test';
import { mockGetAllTransactions } from './fixtures/transactions.ts';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/transactions?page=1&pageSize=10', (route) =>
    route.fulfill({ json: mockGetAllTransactions }),
  );
});

test('should show the transactions', async ({ page }) => {
  await page.goto('/');

  const rows = page.getByTestId('transaction');
  await expect(rows).toHaveCount(2);
  await expect(rows.first()).toContainText('Chinees Restaurant');
  await expect(rows.first()).toContainText('01/10/2025');
});

test('should show a loading indicator for a very slow response', async ({
  page,
}) => {
  await page.route('**/api/transactions?page=1&pageSize=10', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await route.continue();
  });

  await page.goto('/');
  await expect(page.getByTestId('loader')).toBeVisible();
  await expect(page.getByTestId('loader')).not.toBeVisible({ timeout: 3000 });
});

test('should show all transactions for the Irish pub', async ({ page }) => {
  await page.route(
    '**/api/transactions?page=1&pageSize=10&search=Ir',
    (route) =>
      route.fulfill({
        json: {
          items: [mockGetAllTransactions.items[1]],
          page: 1,
          pageSize: 10,
          total: 1,
        },
      }),
  );

  await page.goto('/');

  await page.getByPlaceholder('Search by place…').fill('Ir');
  await page.getByRole('button', { name: 'Search' }).click();

  const rows = page.getByTestId('transaction');
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText('Irish Pub');
});

test('should show a message when no transactions are found', async ({
  page,
}) => {
  await page.route(
    '**/api/transactions?page=1&pageSize=10&search=xyz',
    (route) =>
      route.fulfill({
        json: {
          items: [],
          page: 1,
          pageSize: 10,
          total: 0,
        },
      }),
  );
  await page.goto('/');

  await page.getByPlaceholder('Search by place…').fill('xyz');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByTestId('no_transactions_message')).toBeVisible();
});

test('should show an error if the API call fails', async ({ page }) => {
  await page.route('**/api/transactions?page=1&pageSize=10', (route) =>
    route.fulfill({ status: 500, json: { error: 'Internal server error' } }),
  );

  await page.goto('/');

  await expect(page.getByRole('alert')).toBeVisible();
});

test('should navigate to the next and previous page', async ({ page }) => {
  await page.route('**/api/transactions?page=1&pageSize=10', (route) =>
    route.fulfill({
      json: { ...mockGetAllTransactions, total: 12 },
    }),
  );
  await page.route('**/api/transactions?page=2&pageSize=10', (route) =>
    route.fulfill({
      json: {
        items: [
          {
            id: 3,
            amount: 50,
            date: '2026-11-01',
            user: { id: 1, name: 'Thomas' },
            place: { id: 1, name: 'HoGent' },
          },
          {
            id: 4,
            amount: 75,
            date: '2026-11-02',
            user: { id: 1, name: 'Thomas' },
            place: { id: 2, name: 'HoGent' },
          },
        ],
        page: 2,
        pageSize: 10,
        total: 12,
      },
    }),
  );

  await page.goto('/');
  await expect(page.getByTestId('transaction')).toHaveCount(2);
  await expect(page.getByText('1 / 2')).toBeVisible();

  await page.getByRole('button', { name: 'Go to next page' }).click();
  await expect(page.getByTestId('transaction')).toHaveCount(2);
  await expect(page.getByText('2 / 2')).toBeVisible();
  await expect(page.getByTestId('transaction').first()).toContainText(
    'HoGent',
  );
  await expect(
    page.getByRole('button', { name: 'Go to next page' }),
  ).toHaveAttribute('aria-disabled', 'true');

  await page.getByRole('button', { name: 'Go to previous page' }).click();
  await expect(page.getByTestId('transaction')).toHaveCount(2);
  await expect(page.getByText('1 / 2')).toBeVisible();
  await expect(page.getByTestId('transaction').first()).toContainText(
    'Chinees Restaurant',
  );
});

