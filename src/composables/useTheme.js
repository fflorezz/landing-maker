import { ref, onMounted } from 'vue'

const defaultTheme = {
  primary: '#1B4332',
  secondary: '#2D6A4F',
  'secondary-foreground': '#ffffff',
  accent: '#40916C',
  neutral: '#ffffff',
  tertiary: '#74C69D',
}

export function useTheme() {
  const currentTheme = ref(defaultTheme)

  const setTheme = (newTheme) => {
    currentTheme.value = { ...defaultTheme, ...newTheme }
    applyTheme(currentTheme.value)
  }

  const applyTheme = (theme) => {
    const root = document.documentElement
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })
  }

  onMounted(() => {
    applyTheme(defaultTheme)
  })

  return {
    currentTheme,
    setTheme
  }
} 