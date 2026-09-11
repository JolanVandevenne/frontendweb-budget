import { test as setup } from '@playwright/test';
import path from 'node:path';
import process from 'node:process';

const authFile = path.join(process.cwd(), 'playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {

  await page.goto('/login');
  await page
    .getByPlaceholder('your@email.com')
    .fill('thomas.aelbrecht@hogent.be');
  await page.getByPlaceholder('password').fill('12345678');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForURL('/');

  await page.context().storageState({ path: authFile });
});
