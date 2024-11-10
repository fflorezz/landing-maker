import { ref } from 'vue'

const currentLanding = ref('cool')

export function useLanding() {
  return {
    currentLanding
  }
} 