export const formatDollarAmount = (amount: number): string => {
    return `$${Math.abs(amount).toFixed(2)}`
}

export const formatPercent = (percentage: number): string => {
    return `${Math.floor(percentage * 100)}%`
}