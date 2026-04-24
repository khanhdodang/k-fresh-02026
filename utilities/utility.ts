import { Generate } from './gen';
import { randomInt } from 'node:crypto';

/**
 * General-purpose utility helper shared by UI and API tests.
 *
 * Contains file operations, random selection, date helpers, string helpers, and
 * small data transformation utilities that do not belong to a domain-specific
 * helper class.
 */
export class Utility {

    dateTime = new Date();

    /**
     * delay timeout
     * @param second
     * @returns
     */
    static delay(second: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, second * 1000));
    }

    /**
     *
     * @param text get Subtring
     * @param start
     * @param end
     * @returns
     */
    static getSubstring(text: string, start: number = 0, end: number = 0): string {
        if (end > text.length) end = text.length;
        try {
            return text.substring(start, end);
        } catch (error: any) {
            console.error(error);
            return '';
        }
    }

    /**
     *
     * @param text get Char at position
     * @param index
     * @returns
     */
    static getCharAt(text: string, index: number = 0): string {
        if (text.length == 0 && text.length > index) return '';
        try {
            return text.charAt(index);
        } catch (error: any) {
            console.error(error);
            return '';
        }
    }

    /**
     * Filter Item in Array
     * @param array
     * @param filterKey
     * @returns
     */
    static filterItemInArray(array: any, filterKey: string): any {
        const filteredData = array.filter((item: string) => {
            return Object.entries(item)
                .every(([key]) => key === filterKey);
        }
        );
        return filteredData[0][filterKey];
    }

    /**
     * Format Date
     * @param inputDate
     * @returns
     */
    static formatDate(inputDate: string): string {
        const date = new Date(inputDate);

        // Get the year, month, and date components
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        // Concatenate them in the desired format
        const formattedDate = `${year}${month}${day}`;

        return formattedDate;
    }

    /**
     * Format Date e.g., "2024-10-29T03:37:37.1132112Z"
     * @param date
     * @returns
     */
    static formatIsoWithFractionalSeconds(date: Date = new Date()): string {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

        // Generate random extra fractional digits beyond milliseconds
        const extraFractionalSeconds = String(randomInt(0, 10000)).padEnd(4, '0');

        // Combine the parts to match the desired format
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${extraFractionalSeconds}Z`;
    }

    /**
     * Get Random Element In Array
     * @param arr
     * @returns
     */
    static getRandomElementInArray<T>(arr: T[]): T {
        const randomIndex = Math.floor((new Generate()).getRandomNumber() * arr.length);
        return arr[randomIndex];
    }

    /**
     * Get Random Items from Array using Fisher-Yates shuffle
     * @param array - The source array
     * @param count - Number of random items to return
     * @returns Array of random items
     */
    static getRandomItems<T>(array: T[], count: number): T[] {
        if (count >= array.length) {
            return [...array];
        }

        const shuffled = [...array]; // Create a copy to avoid mutating original
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = randomInt(0, i + 1);
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
    }

    /**
     * Find Unique Elements
     * @param arr1
     * @param arr2
     * @returns
     */
    static findUniqueElements(arr1: string[], arr2: string[]): string[] {
        const uniqueElements: string[] = [];

        // Loop through arr1 and check if each element is present in arr2
        for (const element of arr1) {
            if (!arr2.includes(element) && !uniqueElements.includes(element)) {
                uniqueElements.push(element);
            }
        }

        // Loop through arr2 and check if each element is present in arr1
        for (const element of arr2) {
            if (!arr1.includes(element) && !uniqueElements.includes(element)) {
                uniqueElements.push(element);
            }
        }

        return uniqueElements;
    }

    /**
     * Format Date To MMMDD
     * @param isoDateString
     * @returns
     */
    static formatDateToMMMDD(isoDateString: string): string {
        const date = new Date(isoDateString);
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    /**
     * Get Date At Midnight
     * @param date
     * @returns
     */
    static getDateAtMidnight(date: Date): Date {
        const midnightDate = new Date(date);
        midnightDate.setHours(0, 0, 0, 0);
        return midnightDate;
    }

    /**
     * Add Days
     * @param date
     * @param days
     * @returns
     */
    static addDays(date: Date, days: number): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }

    /**
     * Convert To ISO Date
     * @param dateString
     * @returns
     */
    static convertToISODate(dateString: string): Date | null {
        // Check if the input string is valid
        if (/^\d{8}$/.test(dateString)) {
            const year = dateString.slice(0, 4);
            const month = dateString.slice(4, 6);
            const day = dateString.slice(6, 8);

            // Construct ISO date format: YYYY-MM-DD
            const isoDate = new Date(`${year}-${month}-${day}T00:00:00`);
            return isoDate;
        } else {
            console.error('Invalid date string format. Expected: YYYYMMDD');
            return null;
        }
    }

    /**
     * convertToISO8601
     * @param dateTimeStr
     * @returns
     */
    static convertToISO8601(dateTimeStr: string): string {
        // Parse the input date string
        const [date, time] = dateTimeStr.split(' ');
        const [month, day, year] = date.split('/');

        // Create a new Date object
        const dateObj = new Date(`${year}-${month}-${day}T${time}Z`);

        // Format the date object to ISO 8601 string with timezone offset
        const yearStr = dateObj.getUTCFullYear();
        const monthStr = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
        const dayStr = String(dateObj.getUTCDate()).padStart(2, '0');
        const hoursStr = String(dateObj.getUTCHours()).padStart(2, '0');
        const minutesStr = String(dateObj.getUTCMinutes()).padStart(2, '0');
        const secondsStr = String(dateObj.getUTCSeconds()).padStart(2, '0');

        return `${yearStr}-${monthStr}-${dayStr}T${hoursStr}:${minutesStr}:${secondsStr}+00:00`;
    }

    /**
     * Calculate Duration
     * @param startDate
     * @param endDate
     * @returns
     */
    static calculateDuration(startDate: Date, endDate: Date): string {
        const milliseconds = endDate.getTime() - startDate.getTime();
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        return `
        Duration from ${startDate.toISOString()} to ${endDate.toISOString()}:
        - Milliseconds: ${milliseconds}
        - Seconds: ${seconds}
        - Minutes: ${minutes}
        `;
    }

    /**
     * Filter Data in JSON file
     * @param env Environment key (e.g., int, qai, stg, uat, fo, prod)
     * @param input Data JSON file
     * @param row Default is 1
     * @returns Filtered data based on the provided row
     */
    static filterByRow(env: string, input: any, row: string = '1'): any {
        const validEnvs = ['int', 'qai', 'stg', 'uat', 'fo', 'prod'];
        // Validate environment
        if (!validEnvs.includes(env)) {
            throw new Error(`Invalid environment: ${env}. Valid values are: ${validEnvs.join(', ')}`);
        }

        let data = input[`standard.${env}`];

        // Check if data exists for the provided environment
        if (!data) {
            throw new Error(`No data found for environment: ${env}`);
        }
        // Filter data by row
        data = data.filter((item: any) => {
            return item.index === row;
        });

        return data[0]; // Return the first matching item
    }

    /**
     * Validate string is number or not
     * @param value
     * @returns
     */
    static isStringNumber(value: string): boolean {
        return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
    }

    /**
     * Check Array is Sorted or Not
     * @param arr
     * @param order asc | desc
     * @returns
     */
    static isSorted(arr: string[], order: 'asc' | 'desc' = 'asc'): boolean {
        if (!arr || arr.length <= 1) return true; // A single-item array or empty array is always sorted.

        const lowercasedArray = arr.map((value) => value.toLowerCase());
        for (let i = 1; i < lowercasedArray.length; i++) {
            if (
                (order === 'asc' && lowercasedArray[i - 1] > lowercasedArray[i]) ||
                (order === 'desc' && lowercasedArray[i - 1] < lowercasedArray[i])
            ) {
                return false;
            }
        }
        return true;
    }


    /**
     * Compare Arrays by Exact Order
     * @param arr1
     * @param arr2
     * @returns
     */
    static arraysEqual<T>(arr1: T[], arr2: T[]): boolean {
        if (arr1.length !== arr2.length) return false;

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    /**
     * Compare Arrays by Value (Ignoring Order)
     * @param arr1
     * @param arr2
     * @param compareFn Optional comparison function for sorting strings
     * @returns
     */
    static arraysEqualUnordered(arr1: string[], arr2: string[], compareFn?: (a: string, b: string) => number): boolean {
        if (arr1.length !== arr2.length) return false;

        const sortedArr1 = [...arr1].sort(compareFn);
        const sortedArr2 = [...arr2].sort(compareFn);

        for (let i = 0; i < sortedArr1.length; i++) {
            if (sortedArr1[i] !== sortedArr2[i]) return false;
        }

        return true;
    }

    /**
     * Deep Comparison of Arrays of Objects
     * @param arr1
     * @param arr2
     * @returns
     */
    static arraysEqualDeep<T>(arr1: T[], arr2: T[]): boolean {
        if (arr1.length !== arr2.length) return false;

        return arr1.every((element, index) =>
            JSON.stringify(element) === JSON.stringify(arr2[index])
        );
    }

    /**
     * Sort Array
     * @param array
     * @param order
     * @returns
     */
    static sortArray(array: string[], order: 'asc' | 'desc' = 'asc'): string[] {
        if (!array || array.length <= 1) return [];

        switch (order) {
            case 'asc':
                return array.sort((a, b) => a.localeCompare(b));
            case 'desc':
                return array.sort((a, b) => b.localeCompare(a));
            default:
                throw new Error("Invalid order parameter. Use 'asc' or 'desc'.");
        }
    }

    /**
     * Split String to Array
     * @param input
     * @param delimiter
     * @returns
     */
    static splitStringToArray(input: string, delimiter: string = ','): string[] {
        return input.split(delimiter).map(item => item.trim()); // Trim to remove extra spaces
    }

    /**
     * Remove a Subarray from a String Array
     * @param mainArray
     * @param subArray
     * @returns
     */
    static removeSubArray(mainArray: string[], subArray: string[]): string[] {
        return mainArray.filter(item => !subArray.includes(item));
    }

    /**
     * Add a subarray to a main array
     * @param mainArray
     * @param subArray
     * @returns
     */
    static addSubArray(mainArray: string[], subArray: string[]): string[] {
        return mainArray.concat(subArray);
    }

    /**
     * Extract Number from string
     * @param input
     * @returns
     */
    static extractNumber(input: string): string {
        const res = input.replace(/[^\d.]*/g, '');
        return res;
    }

    /**
     * Format number to percentage
     * @param input 0.8350638903492633
     * @param roundUpDecimal 2
     * @returns 83.50%
     */
    static formatToPercentage(input: number, roundUpDecimal: number = 2): string {
        input = this.roundDown(input, roundUpDecimal + 1);
        const str = (input * 100).toString();
        const num = str.slice(0, (str.indexOf('.')) + roundUpDecimal + 1);
        if (num.toString().length === 1)
            return `${num}.00%`;
        if (num.toString().length === 2)
            return `${num}0%`;
        return `${num}%`;
    }

    /**
     * Format Percentage
     * @param input
     * @param rounddownDecimal
     * @returns
     */
    static formatPercentage(input: number, rounddownDecimal: number = 2): string {
        input = this.roundDown(input, rounddownDecimal + 1);
        const str = (input).toString();
        const num = str.slice(0, (str.indexOf('.')) + rounddownDecimal + 1);
        if (num.toString().length === 1)
            return `${num}.00%`;
        if (num.toString().length === 2)
            return `${num}0%`;
        return `${num}%`;
    }

    /**
     * Round Down, get to number after dot
     * @param number
     * @param decimals default = 3 -> 2 number after dot
     * @returns rounddown(5.2456) => 5.24
     */
    static roundDown(number: number, decimals: number = 3): number {
        const significantDigits = (parseInt(number.toExponential().split('e-')[1])) ?? 0;
        const decimalsUpdated = (decimals ?? 0) + significantDigits - 1;
        decimals = Math.min(decimalsUpdated, number.toString().length);
        return (Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals));
    }

    /**
     * Replace All
     * @param str
     * @param find
     * @param replace
     * @returns
     */
    static replaceAll(str: string, find: string, replace: string): string {
        return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    }

    /**
     * Escape RegExp
     * @param str
     * @returns
     */
    static escapeRegExp(str: string): string {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    /**
     * Format to percentage without round up
     * @param input 0.07200001
     * @param Number of decimal ,max = 10
     * @returns eg: 7.20%
     */
    static formatPercentageStandard(input: number, rounddownDecimal: number = 2): string {
        input = input * 1.0000000001 * 100; //Make Float
        const str = input.toString();
        const num = str.slice(0, (str.indexOf('.')) + rounddownDecimal + 1);
        return `${num}%`;
    }

    /**
     * Returns a string representing a number in fixed-point notation.
     * @param input
     * @param fractionDigits Default = 2
     * @returns
     */
    static formatNumber(input: string, fractionDigits: number = 2): string {
        const number = parseFloat(input.replace(/,/g, ''));
        if (isNaN(number)) return input; // Handle invalid input

        const formattedNumber = number.toLocaleString('en-US', {
            minimumFractionDigits: fractionDigits,
            maximumFractionDigits: fractionDigits
        });

        return formattedNumber;
    }

    /**
     * Replace special characters/ text
     * @param description
     * @param listSpecialChars
     * @returns
     */
    static replaceSpecialChars(description: string, listSpecialChars: { key: string; value: string }[]): string {
        let updatedDescription = description;
        for (const item of listSpecialChars) {
            updatedDescription = updatedDescription.replace(item.key, item.value);
        }
        return updatedDescription;
    }

    /**
     * nextDayOfFile
     * @param date
     * @param next
     * @returns
     */
    static nextDayOfFile(date: string, next: number = 1): string {
        const yyyy = parseInt(date.substring(0, 4));
        const MM = parseInt(date.substring(4, 6));
        const dd = parseInt(date.substring(6, 8));
        const myDate = new Date(yyyy, MM - 1, dd);// Month = 0-based in date Constructor
        myDate.setDate(myDate.getDate() + next);
        const res = myDate.toLocaleString('fr-CA').split(' ')[0];
        return res;
    }

    /**
     * Extract the domain from a URL
     * @param url
     * @returns
     */
    static getDomainFromUrl(url: string): any {
        try {
            const parsedUrl = new URL(url);
            return { protocol: parsedUrl.protocol, hostname: parsedUrl.hostname }; // Returns the domain (e.g., "www.example.com")
        } catch (error: any) {
            console.error('Invalid URL:', error);
            return {};
        }
    }

    /**
     * Convert the provided string values into numbers
     * @param value '357,454' | '$19,441,040.94' | '($153,492.12)'
     * @returns '357454' | '19441040.94' | '-153492.12'
     */
    static parseFinancialString(value: string): string {
        // Remove any commas and dollar signs, handle negative values with parentheses
        const isNegative = value.includes('(');
        const numericValue = parseFloat(value.replace(/[$,()]/g, ''));
        return isNegative ? `${-numericValue}` : `${numericValue}`;
    }

    /**
     * Get Min value
     * @param array
     * @returns
     */
    static minValue(array: number[]): number {
        return Math.min(...array);
    }

    /**
     * Remove value
     * @param array
     * @param value
     * @returns
     */
    static removeValue(array: string[], value: string): string[] {
        // Use filter to create a new array without the specified value
        return array.filter(item => item !== value);
    }

    /**
     * Remove values
     * @param array
     * @param values
     * @returns
     */
    static removeValues(array: any[], values: any[]): any[] {
        const newArr = Object.create(array);
        for (const value of values) {
            const index = newArr.indexOf(value);
            if (index !== -1) {
                newArr.splice(index, 1);
            }
        }
        return newArr;
    }

    /**
     * Remove Indexes
     * @param array
     * @param indexs
     * @returns
     */
    static removeIndexs(array: any[], indexs: number[]): any[] {
        const results: any[] = [];
        for (const index of indexs) {
            for (let j = 0; j < array.length; j++) {
                const val = array[j];
                if (index !== j) {
                    results.push(val);
                }
            }
        }
        return results;
    }

    /**
     * Remove Space
     * @param array
     * @returns
     */
    static removeSpace(array: string[]): string[] {
        const result: string[] = [];
        for (const ele of array) {
            const val: string = ele.replace('\n', '').trim();
            result.push(val);
        }
        return result;
    }

    /**
     * Remove all HTML
     * @param listString
     * @returns
     */
    static removeAllHTML(listString: string[]): string[] {
        const result: string[] = [];
        for (const obj of listString) {
            const rs: string[] = String(obj).split('');
            let newObj: string = '';
            for (const ele of rs) {
                if (ele === '\n' || ele === '\t')
                    continue;
                else
                    newObj = newObj + ele.trim();
            }
            result.push(newObj.trim());
        }
        return result;
    }

    /**
     * Replace '#' with '0' for 'MID' type.
     * @param type Type of the data (e.g., 'MID')
     * @param value The value to decode
     * @returns Decoded string
     */
    static replaceHashWithZero(type: string, value: string): string {
        if (type === 'MID') {
            return value.replace(/#/g, '0');
        }
        return value;
    }

    /**
     * indexOfSubArray
     * @param arr
     * @param sub
     * @returns
     */
    static indexOfSubArray(arr: any[][], sub: any[]): number {
        for (let i = 0; i < arr.length; i++) {
            const ele = arr[i];
            if (this.arraysEqual(ele, sub))
                return i;
        }
        return -1;
    }


    /**
     * Mapping keys values 2D Array
     * @param data
     * @param keyRowIndex Default: 2
     * @returns
     */
    static mapKeys(data: string[][], keyRowIndex: number = 2, breakConditions: ((line: string) => boolean)[] = []): Record<string, string>[] {
        if (data.length <= keyRowIndex) {
            throw new Error('Key row index is out of range');
        }

        const keys = data[keyRowIndex]; // Extract keys from the specified row
        const results: Record<string, string>[] = [];

        for (let i = keyRowIndex + 1; i < data.length; i++) { // Start mapping from the next row
            const rawLine = data[i].join(''); // Join the row into a string for checking

            // Check each condition in the breakConditions array
            if (breakConditions.some(condition => condition(rawLine))) {
                break;
            }

            const values = data[i].map(value => value.replace(/["\r]/g, '').trim());
            const rowObject: Record<string, string> = {};

            keys.forEach((key, index) => {
                const trimmedKey = key.trim();
                rowObject[trimmedKey] = values[index] ?? ''; // Map values to keys
            });

            results.push(rowObject);
        }

        return results;
    }

    /**
     * Get row at index 2 (3rd row in Excel)
     * @param data
     * @param rowIndex
     * @returns
     */
    static getRowAsColumns(data: string[][], rowIndex: number = 2): string[] {
        if (data.length <= rowIndex) {
            throw new Error('Row index is out of range');
        }

        return data[rowIndex].map(value => value.replace(/["\r]/g, '').trim()); // Remove quotes and return row as an array
    }

    /**
     * Check date is 24h format
     * @param date:
     *    if date.lenght > 8 => Verify format datetime. eg: mm/dd/yyy hh:mm:ss (24h format)
     *    otherwise => Verify format datetime. eg: hh:mm:ss (24h format)
     */
    static isDateFormat24h(date?: string): boolean {
        if (!date) return false;
        else {
            let regex: any;
            if (date.length > 8) {
                regex = /^(0\d|1[0-2])\/(0\d|[12]\d|3[01])\/(19|20)\d{2} (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
            }
            else {
                regex = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
            }
            return regex.test(date);
        }
    }

    /**
     * Capitalize the first character of any word
     * @param text
     * @returns
     * ex: inputted = in-app => returns In-App
     */
    static capitalizeString(text: string): string {
        return text
            .split(' ')
            .map(word => word
                .split('-')
                .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
                .join('-'))
            .join(' ');
    }

    static countOccurrences(arr: string[], target: string): number {
        return arr.filter((item) => item === target).length;
    }
}
