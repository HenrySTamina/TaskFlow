const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)'

const VALID_THEME_MODES = new Set([
  'system',
  'light',
  'dark',
])

const VALID_ACCENT_COLORS = new Set([
  'indigo',
  'purple',
  'green',
])

function resolveTheme(themeMode) {
  if (themeMode === 'dark') {
    return 'dark'
  }

  if (themeMode === 'light') {
    return 'light'
  }

  return window.matchMedia(SYSTEM_THEME_QUERY).matches
    ? 'dark'
    : 'light'
}

export function applyTheme({
  themeMode = 'system',
  accentColor = 'indigo',
} = {}) {
  const normalizedThemeMode = VALID_THEME_MODES.has(themeMode)
    ? themeMode
    : 'system'
  const normalizedAccentColor = VALID_ACCENT_COLORS.has(accentColor)
    ? accentColor
    : 'indigo'
  const resolvedTheme = resolveTheme(normalizedThemeMode)
  const rootElement = document.documentElement

  rootElement.dataset.theme = resolvedTheme
  rootElement.dataset.themePreference = normalizedThemeMode
  rootElement.dataset.accent = normalizedAccentColor
  rootElement.style.colorScheme = resolvedTheme

  return resolvedTheme
}

export function subscribeToSystemTheme(callback) {
  const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY)

  mediaQuery.addEventListener('change', callback)

  return () => {
    mediaQuery.removeEventListener('change', callback)
  }
}

