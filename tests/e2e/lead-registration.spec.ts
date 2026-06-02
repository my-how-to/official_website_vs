// tests/lead-registration.spec.ts
import { test, expect } from '../fixtures/base-test'; 
import { TestData } from '../utils/data-generator';

// ========================================================
// 1. SHARED SCENARIO FUNCTION (PREVENTS CODE DUPLICATION)
// ========================================================
async function runLeadCreationScenario(page: any, client: TestData) {
  await test.step('Step 1: Navigate to Lead Creation Page', async () => {
    await page.goto(process.env.BASE_URL!);
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: 'Leads', exact: true }).click();
    await page.locator('a:has-text("Lead anlegen")').click();
    await expect(page.getByRole('textbox', { name: 'Organisation', exact: true })).toBeVisible();
  });

  await test.step('Step 2: Fill Organization Information Form', async () => {
    await page.getByRole('textbox', { name: 'Organisation', exact: true }).fill(client.organisation);
    await page.getByRole('textbox', { name: 'auditierter Bereich' }).fill(client.bereich);
    
    await page.locator('#select2-edit-field-customer-type-container').click();
    await page.getByRole('treeitem', { name: client.uiType }).click();
    
    await page.locator('.js-form-item-field-legal-form .select2-selection__arrow').click();
    await page.getByRole('treeitem', { name: 'OHG' }).click();
    
    // Dynamic field name name handles both 'Anzahl Beschäftigte' and 'Anzahl Studierende'
    await page.getByRole('spinbutton', { name: client.employeesFieldName }).fill(client.employees);

    await page.locator('.js-form-item-field-branch .select2-selection__arrow').click();
    await page.getByRole('treeitem', { name: 'Energie-, Ver- und Entsorgung' }).click();
    
    await page.getByRole('textbox', { name: 'Kommentar' }).first().fill(client.commentField);
  });

  await test.step('Step 3: Fill Contact and Address Details', async () => {
    await page.getByRole('textbox', { name: 'Straße, Nr.' }).fill(client.street);
    await page.getByRole('textbox', { name: 'PLZ' }).fill(client.zip);
    await page.getByRole('textbox', { name: 'Ort' }).fill(client.city);
    
    await page.locator('div:nth-child(2) > .custom-select > .select2 > .selection > .select2-selection > .select2-selection__arrow').click();
    await page.getByRole('treeitem', { name: client.city }).click();
    
    await page.getByRole('textbox', { name: 'Telefon' }).fill(client.phone);
    await page.getByRole('textbox', { name: 'E-Mail' }).fill(client.email);
    await page.getByRole('textbox', { name: 'Web' }).fill(client.web);
  });

  await test.step('Step 4: Set Lead Status and Save', async () => {
    await page.locator('.js-form-item-field-lead-status .select2-selection__arrow').click();
    await page.getByRole('treeitem', { name: 'Präsentationsphase' }).click();
    await page.getByRole('textbox', { name: 'Kommentar' }).last().fill(client.statusComment);

    await page.getByRole('button', { name: 'Speichern' }).click();
  });
}

// ========================================================
// 2. SEPARATE TESTS FOR VS CODE TESTING UI
// ========================================================

// Click the green "Play" icon in VS Code to run the Enterprise workflow
test('Create Enterprise Lead (2000 Employees)', async ({ page, enterpriseClient }) => {
  await runLeadCreationScenario(page, enterpriseClient);
});

// Click the green "Play" icon in VS Code to run the Educational workflow
test('Create Educational Institution Lead (5000 Employees)', async ({ page, educationalClient }) => {
  await runLeadCreationScenario(page, educationalClient);
});
