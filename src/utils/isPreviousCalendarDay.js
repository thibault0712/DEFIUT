function isPreviousCalendarDay (timestamp, timeZone = 'Europe/Paris') {
  const now = new Date()
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6)

  const fmt = new Intl.DateTimeFormat('fr-FR', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const dayDate = fmt.format(date)
  const dayNow = fmt.format(now)

  return dayDate !== dayNow && date < now
}

export default isPreviousCalendarDay
