import { test, expect } from '@playwright/test';

test('should login successfully with valid credentials', async ({ page }) => {
  await page.goto(process.env.BASE_URL!);
  await page.getByRole('textbox', { name: 'E-Mail-Adresse' }).fill(process.env.SITE_USER_AUDITOR!);
  await page.getByRole('textbox', { name: 'Passwort' }).fill(process.env.SITE_USER_AUDITOR_PASS!);
  await page.getByRole('button', { name: 'Anmelden' }).click();
});