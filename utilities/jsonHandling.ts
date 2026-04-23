import { readFileSync } from 'fs';
import path from 'path';

/**
 * Reads a JSON file from disk and returns the parsed data.
 *
 * @param filePath - Relative or absolute path to the JSON file.
 * @param env - Optional environment key used to return a filtered subset.
 * @returns Parsed JSON data or the env-specific subset.
 */
export function readJsonFile<T = unknown>(filePath: string, env?: string): T {
  const resolvedPath = path.resolve(filePath);
  const rawData = readFileSync(resolvedPath, 'utf8');
  const data = JSON.parse(rawData);

  if (!env) {
    return data as T;
  }

  return data[env.toLowerCase()] as T;
}


export function writeJsonFile<T = unknown>(filePath: string, data: T): void {
  const resolvedPath = path.resolve(filePath);
  const jsonData = JSON.stringify(data, null, 2);
  writeFileSync(resolvedPath, jsonData, 'utf8'); 
}