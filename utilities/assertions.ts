import { expect } from '@playwright/test';
import { step } from './logging';
import { Utility } from './utility';

/**
 * Assertion helper methods used across API and UI tests.
 *
 * The class wraps Playwright `expect.soft` patterns, API status/body checks,
 * schema validation, collection comparison, and common UI assertion helpers so
 * test files stay focused on behavior rather than assertion plumbing.
 */
export class Assertions {
    static readonly utility = new Utility();

    /**
     * Soft assertion to check if two values are equal.
     * @param actual - The actual value to check
     * @param expected - The expected value
     * @param message - Custom message for assertion failure (optional)
     */
    @step('Assert Equal')
    static assertEqual<T>(actual: T, expected: T, message?: string): void {
        expect
            .soft(actual, message ?? `Expected ${actual} to equal ${expected}`)
            .toBe(expected);
    }

    /**
     * Soft assertion to check if two values are equal.
     * @param actual - The actual value to check
     * @param expected - The expected value
     * @param message - Custom message for assertion failure (optional)
     */
    @step('Assert Deep Equal')
    static assertDeepEqual(actual: any, expected: any, message?: string): void {
        expect
            .soft(actual, message ?? `Expected ${actual} to equal ${expected}`)
            .toEqual(expected);
    }

    /**
     * Soft assertion to check if two values are not equal.
     * @param actual - The actual value to check
     * @param expected - The expected value
     * @param message - Custom message for assertion failure (optional)
     */
    @step('Assert Not Equal')
    static assertNotEqual<T>(actual: T, expected: T, message?: string): void {
        expect
            .soft(actual, message ?? `Expected ${actual} NOT to equal ${expected}`)
            .not.toBe(expected);
    }

    /**
     * Soft assertion to check if a value matches the expected type.
     * @param value - The value to check
     * @param type - The expected type as a string (e.g., 'string', 'number', 'boolean')
     * @param message - Custom message for assertion failure (optional)
     */
    @step('Assert Type')
    static assertType(value: unknown, type: string, message?: string): void {
        expect
            .soft(
                typeof value,
                message ?? `Expected type '${type}', but got '${value?.toString()}'`,
            )
            .toBe(type);
    }

    /**
     * Soft assertion to check if a condition is true.
     * @param condition - The boolean condition to check
     * @param message - Custom message for assertion failure (optional)
     */
    @step('Assert Boolean True')
    static assertTrue(condition: boolean, message?: string): void {
        expect
            .soft(
                condition,
                message ?? `Expected condition to be true, but got ${condition}`,
            )
            .toBeTruthy();
    }

    /**
     * Soft assertion to check if a condition is false.
     * @param condition - The boolean condition to check
     * @param message - Custom message for assertion failure (optional)
     */
    @step('Assert Boolean False')
    static assertFalse(condition: boolean, message?: string): void {
        expect
            .soft(
                condition,
                message ?? `Expected condition to be false, but got ${condition}`,
            )
            .toBeFalsy();
    }

    /**
     * Soft assertion to check if object not to be null
     * @param actual - The actual value to check
     * @param message - Custom message for assertion failure (optional)
     */
    @step('Assert Not Null')
    static assertNotNull<T>(actual: T, message?: string): void {
        expect
            .soft(actual, message ?? `Expected ${actual} not to be null`)
            .not.toBeNull();
    }

    /**
     * Soft assertion to check if two arrays are equal.
     * @param actual - The actual array
     * @param expected - The expected array
     * @param sort - Whether to sort arrays before comparing (default: false)
     * @param message - Custom message for assertion failure (optional)
     */
    @step('Assert Array Equal')
    static assertArrayEqual<T>(
        actual: T[],
        expected: T[],
        sort: boolean = false,
        message?: string,
    ): void {
        const actualToCompare = [...actual];
        const expectedToCompare = [...expected];

        if (sort) {
            const stringComparator = (a: T, b: T): number =>
                String(a).localeCompare(String(b), undefined, {
                    sensitivity: 'base',
                    numeric: true,
                });

            actualToCompare.sort(stringComparator);
            expectedToCompare.sort(stringComparator);
        }

        const assertMessage =
            message ??
            `Expected arrays to be equal.
            Expected: ${JSON.stringify(expected)}
            Actual: ${JSON.stringify(actual)}`;
        expect.soft(actualToCompare, assertMessage).toEqual(expectedToCompare);
    }

    /**
     * Asserts that a string or array is not empty.
     * @param actual - The string or array to check.
     * @param message - Optional custom failure message.
     */
    @step('Assert Not Empty')
    static assertNotEmpty<T>(actual: T[] | string | null | undefined, message?: string): void {
        expect.soft(actual?.length, message ?? 'Expected value not to be empty').toBeGreaterThan(0);
    }

    /**
     * Asserts that a string or array contains the expected value.
     * @param actual - The target string or array.
     * @param expected - The value it should contain.
     * @param message - Optional custom failure message.
     */
    @step('Assert Contains')
    static assertContains(actual: string | any[], expected: any, message?: string): void {
        expect.soft(actual, message ?? 'Expected value to contain expected subject').toContain(expected);
    }

    /**
     * Soft assertion to check if two objects are equal.
     * @param actual - The actual object
     * @param expected - The expected object
     * @param message - Custom message for assertion failure (optional)
     */
    @step('Assert Object Equal')
    static assertObjectEqual(
        actual: Record<string, any>,
        expected: Record<string, any>,
        message?: string,
    ): void {
        const assertMessage =
            message ??
            `Expected objects to be equal.
            Expected: ${JSON.stringify(expected, null, 2)}
            Actual: ${JSON.stringify(actual, null, 2)}`;
        expect.soft(actual, assertMessage).toEqual(expected);
    }

    /**
     * Validate that a value is greater than a given threshold using soft assertion
     * @param actual - The actual value to check
     * @param expected - The threshold value it should be greater than
     * @param message - Custom message for assertion failure
     */
    @step('Assert ToBe Greater Than')
    static assertToBeGreaterThan(
        actual: number,
        expected: number = 0,
        message?: string,
    ): void {
        expect
            .soft(actual, message ?? `Expected ${actual} > ${expected}`)
            .toBeGreaterThan(expected);
    }

    /**
     * Validate that a value is greater than or equal a given threshold using soft assertion
     * @param actual - The actual value to check
     * @param expected - The threshold value it should be greater than or equal
     * @param message - Custom message for assertion failure
     */
    @step('Assert ToBe Greater Than Or Equal')
    static assertToBeGreaterThanOrEqual(
        actual: number,
        expected: number = 0,
        message?: string,
    ): void {
        expect
            .soft(actual, message ?? `Expected ${actual} >= ${expected}`)
            .toBeGreaterThanOrEqual(expected);
    }

    /**
     * Validate that a value is less than a given threshold using soft assertion
     * @param actual - The actual value to check
     * @param expected - The threshold value it should be less than
     * @param message - Custom message for assertion failure
     */
    @step('Assert ToBe Less Than')
    static assertToBeLessThan(
        actual: number,
        expected: number = 0,
        message?: string,
    ): void {
        expect
            .soft(actual, message ?? `Expected ${actual} < ${expected}`)
            .toBeLessThan(expected);
    }

    /**
     * Validate that a value is less than or equal a given threshold using soft assertion
     * @param actual - The actual value to check
     * @param expected - The threshold value it should be less than or equal
     * @param message - Custom message for assertion failure
     */
    @step('Assert ToBe Less Than Or Equal')
    static assertToBeLessThanOrEqual(
        actual: number,
        expected: number = 0,
        message?: string,
    ): void {
        expect
            .soft(actual, message ?? `Expected ${actual} <= ${expected}`)
            .toBeLessThanOrEqual(expected);
    }

    /**
     * Verify if a string contains a specific text
     * @param actual
     * @param expectedSubstring
     * @param message
     */
    @step('Verify if a string contains a specific text')
    static assertTextContains(
        actual: string,
        expectedSubstring: string,
        message?: string,
    ): void {
        expect
            .soft(
                actual,
                message ?? `Expected ${actual} contains ${expectedSubstring}`,
            )
            .toContain(expectedSubstring);
    }

    /**
     * Verify if a string starts with a specific text
     * @param actual
     * @param expectedSubstring
     * @param message
     */
    @step('Verify if a string starts with a specific text')
    static assertTextStartWith(
        actual: string,
        expectedSubstring: string,
        message?: string,
    ): void {
        const isStarted = actual.startsWith(expectedSubstring);
        expect
            .soft(
                isStarted,
                message ?? `Expected ${actual} starts with ${expectedSubstring}`,
            )
            .toBeTruthy();
    }

    /**
     * Verify if a string ends with a specific text
     * @param actual
     * @param expectedSubstring
     * @param message
     */
    @step('Verify if a string ends with a specific text')
    static assertTextEndWith(
        actual: string,
        expectedSubstring: string,
        message?: string,
    ): void {
        const isEnded = actual.endsWith(expectedSubstring);
        expect
            .soft(
                isEnded,
                message ?? `Expected ${actual} ends with ${expectedSubstring}`,
            )
            .toBeTruthy();
    }

    /**
     * Verify if a string match a specific regular expression
     * @param actual
     * @param expectedPattern
     * @param message
     */
    @step('Verify if a string match a specific regular expression')
    static assertTextMatch(
        actual: string,
        expectedPattern: string | RegExp,
        message?: string,
    ): void {
        expect
            .soft(
                actual,
                message ?? `Expected ${actual} match with ${expectedPattern}`,
            )
            .toMatch(expectedPattern);
    }

    /**
     * Verify if a string does NOT contain a specific text
     * @param actual
     * @param unexpectedSubstring
     * @param message
     */
    @step('Verify if a string does NOT contain a specific text')
    static assertTextNotContains(
        actual: string,
        unexpectedSubstring: string,
        message?: string,
    ): void {
        expect
            .soft(
                actual,
                message ?? `Expected ${actual} not contain ${unexpectedSubstring}`,
            )
            .not.toContain(unexpectedSubstring);
    }

    /**
     * Verify if an array contains a specific item
     * @param actualArray
     * @param expectedItem
     * @param message
     */
    @step('Verify if an array contains a specific item')
    static assertArrayContains<T>(
        actualArray: T[],
        expectedItem: T,
        message?: string,
    ): void {
        expect.soft(actualArray, message).toContain(expectedItem);
    }

    /**
     * Soft assertion to check object contain a vaild key
     * @param response - The response in Json object
     * @param keyPath - The key of Json
     * @param dataType - Data type of key
     * @param message - Custom message for assertion failure (optional)
     */
    @step('Assert valid key in response')
    static assertValidKey(
        response: any,
        keyPath: string,
        dataType: string = 'string',
        message?: string,
    ): void {
        expect
            .soft(
                response,
                message ?? `Expected ${response} have ${keyPath} property`,
            )
            .toHaveProperty(keyPath);
        expect
            .soft(
                typeof response[keyPath],
                message ?? `Expected ${keyPath} value is in ${dataType}`,
            )
            .toBe(dataType);
        if (typeof response[keyPath] === 'string') {
            expect
                .soft(
                    response[keyPath].trim(),
                    message ?? `Expected ${keyPath} value is not empty`,
                )
                .not.toHaveLength(0);
        }
    }

    /**
     * Soft assertion json object contain object
     * @param response - The response in Json object
     * @param keyPath - The key of Json
     * @param dataType - Data type of key
     * @param message - Custom message for assertion failure (optional)
     */
    @step('Assert json object contain object')
    static assertObjectContainObject(
        response: any,
        expected: any,
        message?: string,
    ): void {
        expect
            .soft(response, message ?? `Expected ${response} to contain ${expected}`)
            .toEqual(expect.objectContaining(expected));
    }

    /**
     * Verify if a string[][] (a 2D array of strings) contains a specific item
     * @param actualArray - The 2D array of strings
     * @param expectedItem - The string to search for
     * @param message - Optional assertion message
     */
    @step('string[][] (a 2D array of strings) contains a specific item')
    static assertArrayContainsString(
        actualArray: string[][],
        expectedItem: string,
        delimiter: string = ',',
        message?: string,
    ): void {
        const isFound = actualArray.some((row) =>
            row.join(delimiter).includes(expectedItem),
        );
        expect
            .soft(
                isFound,
                message ??
                `Expected '${expectedItem}' to be found in the array ${actualArray}`,
            )
            .toBe(true);
    }

    /**
     * Verify if an array does NOT contain a specific item
     * @param actualArray
     * @param unexpectedItem
     * @param message
     */
    @step('Verify if an array does NOT contain a specific item')
    static assertArrayNotContains<T>(
        actualArray: T[],
        unexpectedItem: T | T[], // Support both single item and array
        message?: string,
    ): void {
        if (Array.isArray(unexpectedItem)) {
            for (const item of unexpectedItem) {
                expect
                    .soft(
                        actualArray.includes(item),
                        message ?? `Expected array NOT to contain '${item}', but it does.`,
                    )
                    .toBeFalsy();
            }
        } else {
            expect
                .soft(
                    actualArray.includes(unexpectedItem),
                    message ??
                    `Expected array NOT to contain '${unexpectedItem}', but it does.`,
                )
                .toBeFalsy();
        }
    }

    /**
     * Verify if a card number is properly masked
     * @param actualCard
     * @param maskChar
     * @param message
     */
    static validateCardIsMasked(
        actualCard: string,
        maskChar: '*' | 'X' = '*',
        message?: string,
    ): void {
        const pattern = new RegExp(`^\\d{6}[${maskChar}\\s]+\\d{4}$`);
        expect.soft(actualCard, message).toMatch(pattern);
    }

    /**
     * Verify if an array contains a specific sub-array as a contiguous sequence.
     * @param actualArray
     * @param subArray
     * @param message
     */
    @step(
        'Verify if an array contains a specific sub-array as a contiguous sequence.',
    )
    static assertArrayContainsSubArray<T>(
        actualArray: T[],
        subArray: T[],
        isSorted: boolean = false,
        message?: string,
    ): void {
        if (subArray.length === 0) {
            throw new Error('Sub-array cannot be empty.');
        }

        let processedActualArray = actualArray;
        let processedSubArray = subArray;

        if (isSorted) {
            processedActualArray = [...actualArray].sort((a, b) => (a > b ? 1 : -1));
            processedSubArray = [...subArray].sort((a, b) => (a > b ? 1 : -1));
        }

        const actualString = processedActualArray.join(',');
        const subString = processedSubArray.join(',');

        expect.soft(actualString.includes(subString), message).toBeTruthy();
    }

    /**
     * Verify if an array not contain any items in a list.
     * @param actualArray
     * @param items
     * @param message
     */
    @step('Verify if an array not contain any items in a list.')
    static assertArrayNotContainItems<T>(
        actualArray: T[],
        items: T[],
        message?: string,
    ): void {
        items.forEach((item) => {
            expect.soft(!actualArray.includes(item), message).toBeTruthy();
        });
    }

    /**
     * Verify if an array contains all items in a list.
     * @param actualArray
     * @param items
     * @param message
     */
    @step('Verify if an array contains all items in a list.')
    static assertArrayContainsItems<T>(
        actualArray: T[],
        items: T[],
        message?: string,
    ): void {
        items.forEach((item) => {
            expect.soft(actualArray.includes(item), message).toBeTruthy();
        });
    }

    /**
     * Assert that two Map objects are equal, including key-value pairs and order.
     * @param expected
     * @param actual
     */
    @step(
        'Assert that two Map objects are equal, including key-value pairs and order.',
    )
    /**
     * Verifies that two Map objects have the same entries in the same order.
     *
     * @param expected - Map containing the expected ordered key/value pairs.
     * @param actual - Map returned by the code under test.
     */
    static assertMapEqualsWithOrder(
        expected: Map<any, any>,
        actual: Map<any, any>,
    ): void {
        // Convert Maps to arrays of [key, value] pairs
        const expectedEntries = Array.from(expected.entries());
        const actualEntries = Array.from(actual.entries());

        // Check if both Maps have the same number of elements
        expect.soft(actual.size, 'Map sizes do not match').toBe(expected.size);

        // Check if both Maps have the same key-value pairs in the same order
        expect
            .soft(actualEntries, 'Maps are not equal with order')
            .toEqual(expectedEntries);
    }

    /**
     * Assert that a 2D array (`array1`) contains a specific sublist (`array2`) as a contiguous sequence.
     * @param array1
     * @param array2
     * @param message
     */
    @step('Assert List Contains Sub-List')
    static assertListContainsSubList(
        array1: any[][],
        array2: any[],
        message: string = '',
    ): void {
        if (array2.length === 0) {
            throw new Error('Sub-list cannot be empty.');
        }
        // Flatten array1 to a 1D array for easier searching
        const flatArray1 = array1.flat();
        const flatArray1String = flatArray1.join(',');
        const flatArray2String = array2.join(',');

        // Check if array2 exists as a contiguous sequence in array1
        expect
            .soft(
                flatArray1String.includes(flatArray2String),
                message ?? 'Sub-list not found as a contiguous sequence',
            )
            .toBeTruthy();
    }

    /**
     * Asserts that the subset object is a subset of the superset object, including arrays.
     * This method checks if all properties of the subset object are present in the superset object,
     * and if the values of those properties are equal. For arrays, it ensures each item in the subset
     * array is present in the superset array.
     *
     * @param subset The object to check if it's a subset.
     * @param superset The object to check against.
     * @param message Optional message to display in case of failure.
     */
    @step('Assert Object Is Subset')
    static assertObjectIsSubset<T>(
        subset: T | T[],
        superset: T | T[],
        message?: string,
    ): void {
        const isSubset = (subsetObj: any, supersetObj: any): boolean => {
            // Handle primitive types or null
            if (subsetObj !== null && typeof subsetObj !== 'object') {
                return subsetObj === supersetObj;
            }

            // Handle arrays
            if (Array.isArray(subsetObj)) {
                if (!Array.isArray(supersetObj)) return false;

                // Ensure each item in subset is present in superset array
                return subsetObj.every((subItem) =>
                    supersetObj.some((superItem) => isSubset(subItem, superItem)),
                );
            }

            // Handle objects
            for (const key in subsetObj) {
                if (Object.hasOwn(subsetObj, key)) {
                    // If key doesn't exist or value doesn't match, return false
                    if (
                        !(key in supersetObj) ||
                        !isSubset(subsetObj[key], supersetObj[key])
                    ) {
                        return false;
                    }
                }
            }

            return true;
        };

        const subsetArray = Array.isArray(subset) ? subset : [subset];
        const supersetArray = Array.isArray(superset) ? superset : [superset];

        const allSubsetsMatch = subsetArray.every((sub) =>
            supersetArray.some((superItem) => isSubset(sub, superItem)),
        );

        expect
            .soft(
                allSubsetsMatch,
                message ??
                `Expected the object to be a subset (including arrays), but the subset does not match the superset.\nSubset: ${JSON.stringify(subset)}
            \nSuperset: ${JSON.stringify(superset)}`,
            )
            .toBeTruthy();
    }

    /**
     * Verify if a date string matches the MM/DD/YYYY HH:MM:SS format
     * @param dateString - The date string to validate
     * @param message - Custom message for assertion failure (optional)
     */
    @step('Verify if date string matches MM/DD/YYYY HH:MM:SS format')
    static assertDateTimeFormat(
        dateString: string | null | undefined,
        message?: string,
    ): void {
        if (!dateString) {
            expect
                .soft(
                    false,
                    message ??
                    'Expected date string to be in MM/DD/YYYY HH:MM:SS format, but got null or undefined',
                )
                .toBeTruthy();
            return;
        }
        // Regular expression for MM/DD/YYYY HH:MM:SS format
        const dateTimeRegex =
            /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}\s([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

        const isValidFormat = dateTimeRegex.test(dateString.trim());

        expect
            .soft(
                isValidFormat,
                message ??
                `Expected date string to be in MM/DD/YYYY HH:MM:SS format, but got '${dateString}'`,
            )
            .toBeTruthy();
    }

    /**
     * Validate that an email string matches a valid email format using soft assertion
     * @param email - The email string to validate
     * @param message - Custom message for assertion failure (optional)
     */
    @step('Verify if email matches valid email format')
    static assertValidEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        expect
            .soft(
                emailRegex.test(email),
                `Expected '${email}' to be a valid email format`,
            )
            .toBeTruthy();
    }

    /**
     * Asserts that an object matches the expected schema based on field types.
     *
     * This method validates object properties by grouping them into type categories
     * such as string, number, boolean, nullable, and date.
     *
     * Each field defined in the schema will be checked against its expected type.
     * Uses soft assertions to continue execution even if some validations fail.
     *
     * @param obj - The target object to validate.
     *
     * @param schema - Schema definition grouped by data types:
     * - `string`: Fields expected to be string
     * - `number`: Fields expected to be number
     * - `boolean`: Fields expected to be boolean
     * - `nullable`: Fields expected to be null or undefined
     * - `date`: Fields expected to be valid ISO date string
     *
     * @param message - Optional custom error message for assertion failures.
     *
     * @example
     * const schema = {
     *   string: ['id', 'name'],
     *   number: ['price'],
     *   boolean: ['is_active'],
     *   nullable: ['deleted_at'],
     *   date: ['created_at']
     * };
     *
     * Assertions.assertSchemaByType(response.data, schema);
     *
     * @remarks
     * - This method uses `expect.soft()` so test execution will not stop immediately on failure.
     * - Date validation is performed using `Date.parse()`.
     * - Nullable fields only accept `null` or `undefined`.
     *
     * @throws Will log soft assertion failures if any field does not match expected type.
     */
    @step('Assert schema by type for object')
    static assertSchemaByType(
        obj: Record<string, any>,
        schema: {
            string?: string[];
            number?: string[];
            boolean?: string[];
            nullable?: string[];
            date?: string[];
            object?: string[];
            array?: string[];
        },
        message?: string,
    ): void {
        const checkType = (
            key: string,
            condition: boolean,
            expected: string
        ): void => {
            expect
                .soft(
                    condition,
                    message ?? `Expected '${key}' to be ${expected}, but got ${obj[key]}`,
                )
                .toBeTruthy();
        };

        // string
        schema.string?.forEach((key) => {
            checkType(key, typeof obj[key] === 'string', 'string');
        });

        // number
        schema.number?.forEach((key) => {
            checkType(key, typeof obj[key] === 'number', 'number');
        });

        // boolean
        schema.boolean?.forEach((key) => {
            checkType(key, typeof obj[key] === 'boolean', 'boolean');
        });
        // object
        schema.object?.forEach((key) => {
            const isValid =
                typeof obj[key] === 'object' &&
                obj[key] !== null &&
                !Array.isArray(obj[key]);

            checkType(key, isValid, 'object');
        });

        //array
        schema.array?.forEach((key) => {
            checkType(key, Array.isArray(obj[key]), 'array');
        });

        // nullable
        schema.nullable?.forEach((key) => {
            const isValid = obj[key] === null || obj[key] === undefined;
            checkType(key, isValid, 'nullable');
        });

        // date (ISO string)
        schema.date?.forEach((key) => {
            const val = obj[key] as string;
            const isValid =
                typeof val === 'string' && !isNaN(Date.parse(val));
            checkType(key, isValid, 'valid date string');
        });
    }

    /**
     * Soft assertion to check if an object matches a specific structure and values.
     * @param actualObject - The actual object to check
     * @param expectedSubset - The expected structure and values
     * @param message - Custom message for assertion failure (optional)
     */
    @step('Assert actual object includes the expected structure and values.')
    static assertMatchObject(
        actualObject: any,
        expectedSubset: any,
        message?: string,
    ): void {
        expect
            .soft(
                actualObject,
                message ??
                `Expected ${actualObject} to contain subset ${expectedSubset}`,
            )
            .toMatchObject(expectedSubset);
    }

    /**
     * Soft assertion to check if two numbers are approximately equal within a delta.
     * Useful for dynamically calculated fields (like percentages) with rounding differences.
     * @param actual - The actual numeric value to check
     * @param expected - The expected numeric value
     * @param delta - The maximum allowed difference (default: 1)
     * @param message - Custom message for assertion failure (optional)
     */
    @step('Assert Almost Equal (Delta)')
    static assertAlmostEqual(actual: number, expected: number, delta: number = 1, message?: string): void {
        const difference = Math.abs(actual - expected);
        expect.soft(
            difference,
            message ?? `Expected ${actual} to be within ${delta} of ${expected}`
        ).toBeLessThanOrEqual(delta);
    }
}
