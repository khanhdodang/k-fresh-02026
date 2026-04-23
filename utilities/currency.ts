export class Currency {
  /**
   * Format number to currency string
   * @param amount 
   * @returns 
   * ex: 1234567.5 => $1,234,567.50
   */
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  /**
   * Parse currency string to number
   * @param currencyString 
   * @returns 
   * ex: "$1,234,567.50" => 1234567.5
   */
  static parseCurrency(currencyString: string): number {
    const cleanString = currencyString.replaceAll(/[$,]/g, '');
    const amount = Number.parseFloat(cleanString);
    if (Number.isNaN(amount)) {
      throw new TypeError(`Invalid currency string: ${currencyString}`);
    }
    return amount;
  }
}