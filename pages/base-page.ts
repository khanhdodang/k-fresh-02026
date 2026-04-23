import { test as base, expect } from '@playwright/test';
import { CommonPage } from './common-page';
import { ProfilesPage } from './profile-page';
import { getLoginCredentials } from '../data/user.helper';
import { LoginCredentials } from '../models/user';


/**
 * Shared Playwright fixtures for page objects and environment credentials.
 */
export const test = base.extend<{
  commonPage: CommonPage;
  profilesPage: ProfilesPage;
  credentials: LoginCredentials;
}>({
  commonPage: async ({ page }, use) => {
    await use(new CommonPage(page));
  },
  profilesPage: async ({ page }, use) => {
    await use(new ProfilesPage(page));
  },
  credentials: async ({}, use) => {
    await use(getLoginCredentials());
  },
});

export { expect };
