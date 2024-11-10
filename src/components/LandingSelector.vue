<template>
  <div class="border fixed bottom-28 right-4 bg-white p-2 rounded-lg shadow">
    <select 
      v-model="currentLanding" 
      class="bg-white text-gray-700 p-2 rounded"
    >
      <option value="default">Landing Por Defecto</option>
      <option value="cool">Landing Cool Earth</option>
      <option value="junior">Junior Minds</option>
    </select>
  </div>
</template>

<script setup>
import { useLanding } from '../composables/useLanding'

const { currentLanding } = useLanding()
</script> 