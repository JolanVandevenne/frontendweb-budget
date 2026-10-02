interface LocalizedDateProps {
    date?: string | Date | null;
}

const dateFormat = new Intl.DateTimeFormat('nl-BE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
})

export function LocalizedDate({ date}: LocalizedDateProps) {
    if (!date) return null;

    const parsedDate = new Date(date);;
    if (isNaN(parsedDate.getTime())) return null;

    return <>{dateFormat.format(parsedDate)}</>
}