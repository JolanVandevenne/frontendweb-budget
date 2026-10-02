interface LocalizedAmountProps {
    amount?: number | null
}

const amountFormat = new Intl.NumberFormat('nl-BE', {
  currency: 'EUR',
  style: 'currency',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
})

export function LocalizedAmount({amount}: LocalizedAmountProps){
    if (!amount) return null;
    if (isNaN(amount)) return null;

    return <>{amountFormat.format(amount)}</>
}