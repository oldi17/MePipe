export function convertVideoLength(len: number): string {
  let time = ''
  const hours = Math.floor(len / 3600)
  const minutes = Math.floor(len / 60) - hours * 60
  const seconds = len - hours * 3600 - minutes * 60
  time += hours ? (hours + ':') : ''
  time += (minutes + '').padStart(2, '0') + ':'
  time += (seconds + '').padStart(2, '0')
  
  return time
}

export function convertVideoCreatedAt(createdAt: number): string {
  const now = Date.now()
  const minuteDeclension = ['', 'а', 'ы', 'ы', 'ы', '', '', '', '', '']
  const minutes = Math.floor((now - createdAt) / 60000)
  if (minutes < 1) {
    return 'только что'
  }
  if (minutes < 60) {
    return minutes + ' минут' + minuteDeclension[minutes % 10] + ' назад'
  }
  if (minutes < 1440) {
    const hours = Math.floor(minutes / 60)
    let description = ' час'
    description += hours >= 2 && hours <= 4 ? 'а' : ''
    description += hours >= 5 ? 'ов' : ''
    return hours + description + ' назад'
  }

  return new Date(createdAt).toISOString().substring(0, 10)
}