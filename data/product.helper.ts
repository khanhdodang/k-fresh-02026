import { resolve } from 'node:path';
import { readJsonFile } from '../utilities/jsonHandling';
import { Product } from '../models/product';
import { ENV } from '../models/index';

const productsJsonPath = resolve(__dirname, 'products.json');
const productsByEnv: Record<string, Product> = readJsonFile(productsJsonPath);

/**
 * Retrieves the product data object for the specified environment from the JSON file.
 * Defaults to the ENV environment variable, falling back to "production".
 * @param env - The environment key to look up (e.g., "qa", "staging", "production")
 * @returns The product data object for the specified environment
 */
export function getEnvProduct(
  env: string = (process.env.ENV as ENV) || 'production',
): Product {
  return productsByEnv[env] ?? productsByEnv.production;
}