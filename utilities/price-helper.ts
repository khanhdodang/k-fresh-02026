import { Logger } from './logger';

export class PriceHelper {
    /**
     * Converts a currency string (e.g., "$1,234.56") to a floating-point number (1234.56)
     * @param text The currency string to convert
     * @returns The numeric value extracted from the currency string
     * Ensures no crash occurs if the string is empty or undefined
     */
    static extractPrice(text: string | null | undefined): number {
        if (!text || text.trim() === '') {
            Logger.error('Error: Text currency empty or undefined! Returning 0.');
            return 0; 
        }
        return Number.parseFloat(text.replace('$', '').replace(',', '').trim());
    }
}