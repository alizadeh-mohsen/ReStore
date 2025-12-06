export function formatCurrency(currency: number) {
    return '$' + (currency / 100).toFixed(2);
}