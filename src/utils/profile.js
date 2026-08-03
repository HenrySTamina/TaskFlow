export function getFirstName(displayName = '') {
  const [firstName] = displayName.trim().split(/\s+/)

  return firstName || 'Usuario'
}

export function getInitials(displayName = '') {
  const initials = displayName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return initials || 'TF'
}