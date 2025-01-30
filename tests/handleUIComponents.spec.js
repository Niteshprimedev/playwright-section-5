// @ts-check
import { test, expect } from '@playwright/test';

// TC_01: UI Dropdown Selectors Controls;
test('sec-5 UI Dropdown Selectors Controls', cbHandleUIDropdowns);

async function cbHandleUIDropdowns({ page }) {
  // Visit the home page url or website;
  await page.goto('https://www.omnifood.dev/');

  // Select the name, email, and selector dropdown fields using the id selector;
  const fullNameEl = page.locator('#full-name');
  const emailEl = page.locator('#email');
  const selectDropdownEl = page.locator('#select-where');

  // fill the full name, email, and select dropdown fields;
  await fullNameEl.fill('Playwright JS');
  await emailEl.fill('playwright@omnifood.dev');
  await selectDropdownEl.selectOption('friends');

  // Pause the playwright execution;
  // await page.pause();
  
  // Assertion
  await expect(selectDropdownEl).toHaveValue('friends');

  // Select the button and click it using the id selector;
  await page.getByRole('button', { name: 'Sign up now' }).click();

  console.log('Test Case 01 | UI Dropdown Controls | is Successful');
}

// TC_02 Checkbox & Attribute Assertions
test('sec-5 Checkbox & Attribute Assertions', cbHandleCheckboxes);

async function cbHandleCheckboxes({ page }){
  // Visit the home page url or website;
  await page.goto('https://sso.teachable.com/secure/146684/identity/sign_up');

  // Select the checkbox & check it using  the id selector;
  const checkboxEl = await page.locator('#allow_marketing_emails').nth(1);

  await checkboxEl.click();

  // Assertion;
  await expect(checkboxEl).toBeChecked();

  // Uncheck the checkbox & Uncheck Assertion

  await checkboxEl.uncheck();

  const isChecked = await checkboxEl.isChecked();
  // console.log(isChecked);

  // Uncheck Assertion Creation;
  expect(isChecked).toBeFalsy();

  // Attribute Validation & Assertions;

  // select the button element using the data-test-id selector;
  const signUpBtnEl = page.locator('data-test-id=sign-up-with-otp');

  // Assertion;
  await expect(signUpBtnEl).toHaveAttribute('name', 'sign_up_method');

  console.log('Test Case 02 | UI Checkbox & Attribute Validation | is Successful');
}

// TC_03 Handle Multiple Pages and Window Tabs
test.only('sec-5 Handle Multiple Pages & Windows', cbHandleMultiplePages);

async function cbHandleMultiplePages({ browser }){
    // Create a new Browser context;
    const context = await browser.newContext();
    const page = await context.newPage();

    // Visit the page url or website
    await page.goto('https://sso.teachable.com/secure/146684/identity/sign_up');

    // Select the Privacy Policy page 
   const privacyPolicyPageLinkEl = page.locator(`[aria-label="Code with Mosh's Privacy Policy"]`);

  //  Listen for any new page window event & Visit the privacy policy page link; using Promise.all();
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    privacyPolicyPageLinkEl.click(),
  ]);

  const privacyPolicyTextEl = newPage.locator('.col-xs-10.col-xs-offset-1.col-md-8.col-md-offset-2.course-description p');

  await privacyPolicyTextEl.nth(3).waitFor();

  // Assertion;
  expect(await privacyPolicyTextEl.nth(3)).toHaveText(`The School may collect and use Students’ personal identification information for the following purposes:`);

  // Grab the School;
  const privacyPolicyTxt = await privacyPolicyTextEl.nth(3).textContent();
  const fullName = privacyPolicyTxt.split(' ')[1];

  // Fill the full name in the Sign Up page;

  // select the button element using the data-test-id selector;
  const signUpBtnEl = page.locator('data-test-id=sign-up-with-otp');

  await signUpBtnEl.click();

  const fullNameEl = page.locator('#name');

  await fullNameEl.fill(fullName);

  await expect(fullNameEl).toHaveValue(fullName);

  console.log('Test Case 03 | Handle Multiple Pages | is successful');

  // Keeps the Browser open;
  await new Promise(() => {});
}

// TC_04 Test Isolation for checking the code;
test('Print Privacy Policy Text', async ({ page }) => {
    await page.goto('https://members.codewithmosh.com/p/privacy');

    const privacyPolicyTextEl = page.locator('.col-xs-10.col-xs-offset-1.col-md-8.col-md-offset-2.course-description p');

    const privacyPolicyTxt = await privacyPolicyTextEl.nth(3).textContent();

    console.log(privacyPolicyTxt);
});


console.log("Sec-5 Description: This test suite selects the dropdown and checkbox elements on the webpage and performs selection, checked, and unchecked actions as well as assertions.");