const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function formatDate(inputDate: Date | string): string {
  const convertedDate = new Date(inputDate)

  const day = convertedDate.getDate()
  const monthIndex = convertedDate.getMonth()
  const year = convertedDate.getFullYear()

  return `${day} ${monthNames[monthIndex]} ${year}`
}
