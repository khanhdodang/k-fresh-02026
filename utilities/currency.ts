export class Currency {
  /**
    * Format number to currency string
    * @param amount The number to format
    * @param minimumFractionDigits The number of decimal places (default is 2)
    * @returns Formatted currency string
    * ex: 1234567.5 => $1,234,567.50
    */
  static formatCurrency(amount: number, minimumFractionDigits: number = 2): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits,
      maximumFractionDigits: minimumFractionDigits,
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
