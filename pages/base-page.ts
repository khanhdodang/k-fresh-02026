import { test as baseTest, type Page } from '@playwright/test';
import { LoginPage } from './login-page';
import { CommonPage } from './common-page';

export const test = baseTest.extend<{
    loginPage: LoginPage;
    commonPage: CommonPage;

    }>({
    loginPage: async ({ page, context }, use) => {
        const instance = new LoginPage(page);
        context.on('page', (newPage: Page) => {
            instance.setPage(newPage);
        });
        await use(instance);
    },

    commonPage: async ({ page, context }, use) => {
        const instance = new CommonPage(page);
        context.on('page', (newPage: Page) => {
            instance.setPage(newPage);
        });
        await use(instance);
    },

});