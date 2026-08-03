const PREFERENCES_STORAGE_KEY = 'taskflow_preferences'

export const DEFAULT_PREFERENCES = {
  displayName: 'Henry Alvaro',
  weeklyGoal: 5,
  notificationsEnabled: true,
}

function normalizePreferences(preferences = {}) {
  const displayName = typeof preferences.displayName === 'string'
    ? preferences.displayName.trim()
    : ''

  const weeklyGoal = Number(preferences.weeklyGoal)
  const hasValidWeeklyGoal = (
    Number.isInteger(weeklyGoal)
    && weeklyGoal >= 1
    && weeklyGoal <= 100
  )

  return {
    displayName: displayName || DEFAULT_PREFERENCES.displayName,
    weeklyGoal: hasValidWeeklyGoal
      ? weeklyGoal
      : DEFAULT_PREFERENCES.weeklyGoal,
    notificationsEnabled:
      typeof preferences.notificationsEnabled === 'boolean'
        ? preferences.notificationsEnabled
        : DEFAULT_PREFERENCES.notificationsEnabled,
  }
}

export function getPreferences() {
  try {
    const storedPreferences = localStorage.getItem(
      PREFERENCES_STORAGE_KEY,
    )

    if (!storedPreferences) {
      return { ...DEFAULT_PREFERENCES }
    }

    return normalizePreferences(JSON.parse(storedPreferences))
  } catch {
    return { ...DEFAULT_PREFERENCES }
  }
}

export function savePreferences(preferences) {
  const normalizedPreferences = normalizePreferences(preferences)

  localStorage.setItem(
    PREFERENCES_STORAGE_KEY,
    JSON.stringify(normalizedPreferences),
  )

  return normalizedPreferences
}