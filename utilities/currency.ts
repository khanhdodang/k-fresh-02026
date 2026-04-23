export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function parseCurrency(currencyString: string): number {
  const cleanString = currencyString.replace(/[$,]/g, '');
  const amount = parseFloat(cleanString);
  if (isNaN(amount)) {
    throw new Error(`Invalid currency string: ${currencyString}`);
  }
  return amount;
}
