function serializedTimestampToStringFormated (timestamp) {
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6)

  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export default serializedTimestampToStringFormated
