<script setup>
import DefaultLanding from './components/landings/DefaultLanding.vue'
import CoolLanding from './components/landings/CoolLanding.vue'
import JuniorLanding from './components/landings/JuniorLanding.vue'
import ThemeSelector from './components/ThemeSelector.vue'
import LandingSelector from './components/LandingSelector.vue'
import { useTheme } from './composables/useTheme'
import { useLanding } from './composables/useLanding'

const { currentTheme } = useTheme()
const { currentLanding } = useLanding()

const getLandingComponent = () => {
  switch (currentLanding.value) {
    case 'default':
      return DefaultLanding
    case 'cool':
      return CoolLanding
    case 'junior':
      return JuniorLanding
    default:
      return DefaultLanding
  }
}
</script>

<template>
  <div class="min-h-screen bg-theme-primary">
    <component :is="getLandingComponent()" />
    <ThemeSelector />
    <LandingSelector />
  </div>
</template>

<style>
:root {
  --color-primary: #004D40;
  --color-secondary: #FFFFFF;
  --color-accent: #FFD700;
  --color-neutral: #FF5722;
}
</style>
