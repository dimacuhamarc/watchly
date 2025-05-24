const formatDate = (date: string) => {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const formatToYearMonth = (date: string) => {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

const formatRuntime = (runtime: number) => {
  return runtime.toString() + ' min'
}

export { formatDate, formatRuntime, formatToYearMonth }
