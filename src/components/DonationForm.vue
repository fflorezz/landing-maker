<script setup>
import { ref } from 'vue'

const frequency = ref('Monthly')
const selectedAmount = ref(50)

const frequencies = ['Weekly', 'Monthly', 'Yearly']
const amounts = [10, 20, 50, 100]
</script>

<template>
  <div class="bg-white rounded-2xl p-6 md:p-8">
    <h2 class="text-2xl font-bold text-gray-700 mb-6">
      Instant Donate Now
    </h2>
    
    <div class="flex gap-3 mb-6">
      <button 
        v-for="freq in frequencies" 
        :key="freq"
        :class="[
          'px-4 py-2 rounded-full transition-colors font-medium',
          frequency === freq 
            ? 'bg-theme-secondary text-theme-secondary-foreground' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        ]"
        @click="frequency = freq"
      >
        {{ freq }}
      </button>
    </div>
    
    <form @submit.prevent class="space-y-4">
      <input 
        type="text" 
        placeholder="Enter your name" 
        class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-theme-accent"
        required
      >
      
      <input 
        type="email" 
        placeholder="Enter your email" 
        class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-theme-accent"
        required
      >
      
      <div class="space-y-3">
        <p class="text-gray-600 font-medium">AMOUNT</p>
        
        <div class="grid grid-cols-4 gap-2">
          <button 
            v-for="amount in amounts" 
            :key="amount"
            type="button"
            :class="[
              'px-3 py-2 rounded-lg transition-colors font-medium',
              selectedAmount === amount 
                ? 'bg-theme-secondary text-theme-secondary-foreground' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            ]"
            @click="selectedAmount = amount"
          >
            $ {{ amount }}
          </button>
        </div>
      </div>
      
      <button 
        type="submit" 
        class="w-full bg-theme-secondary text-theme-secondary-foreground py-4 rounded-lg font-bold hover:opacity-90 transition-colors"
      >
        DONATE
      </button>
    </form>
  </div>
</template> 