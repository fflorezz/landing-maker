<template>
  <main class="min-h-screen">
    <div class="grid md:grid-cols-2">
      <!-- Sección izquierda con imagen de fondo -->
      <div class="relative h-screen">
        <img 
          src="https://images.pexels.com/photos/5977742/pexels-photo-5977742.jpeg"
          alt="Tropical rainforest with morning mist"
          class="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-theme-primary to-theme-primary/60"></div>
        <div class="relative z-10 p-12 flex flex-col justify-center h-full">
          <h1 class="text-7xl font-bold text-white leading-tight mb-8">
            DONATE TO<br>
            PROTECT THE<br>
            WORLD'S TROPICAL<br>
            RAINFORESTS
          </h1>
        </div>
      </div>

      <!-- Sección derecha con formulario -->
      <div class="bg-white p-12 flex items-center">
        <div class="w-full max-w-lg mx-auto">
          <h2 class="text-xl text-gray-700 font-semibold mb-6">Enter amount</h2>
          
          <div class="space-y-6">
            <div class="flex gap-4 flex-wrap">
              <button 
                v-for="amount in [5, 25, 50, 100]" 
                :key="amount"
                :class="[
                  'px-8 py-3 rounded-full border-2 transition-colors',
                  selectedAmount === amount 
                    ? 'bg-theme-secondary text-theme-secondary-foreground border-theme-secondary' 
                    : 'border-theme-secondary text-theme-secondary hover:bg-theme-secondary hover:text-theme-secondary-foreground'
                ]"
                @click="selectedAmount = amount"
              >
                {{ amount }}
              </button>
              <button 
                :class="[
                  'px-8 py-3 rounded-full border-2 transition-colors',
                  isCustomAmount 
                    ? 'bg-theme-secondary text-theme-secondary-foreground border-theme-secondary' 
                    : 'border-theme-secondary text-theme-secondary hover:bg-theme-secondary hover:text-theme-secondary-foreground'
                ]"
                @click="enableCustomAmount"
              >
                Custom Amount
              </button>
            </div>

            <div class="relative">
              <input 
                type="number" 
                v-model="customAmountValue"
                :disabled="!isCustomAmount"
                class="w-full px-6 py-4 border-2 border-theme-secondary text-2xl rounded-lg focus:ring-2 focus:ring-offset-2"
                :class="[
                  isCustomAmount 
                    ? 'border-theme-secondary focus:border-theme-secondary focus:ring-theme-secondary/20' 
                    : 'border-gray-200'
                ]"
              >
            </div>

            <label class="flex items-center gap-3 py-4  bg-theme-tertiary/10 rounded-lg cursor-pointer hover:bg-theme-tertiary/20 transition-colors">
              <input 
                type="checkbox" 
                v-model="isMonthly"
                class="w-5 h-5 text-theme-secondary focus:ring-theme-secondary rounded accent-theme-secondary"
              >
              <span class="text-gray-700">Make this donation monthly</span>
            </label>

            <button 
              class="w-full bg-theme-secondary text-theme-secondary-foreground py-4 rounded-lg font-bold hover:opacity-90 transition-colors"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const selectedAmount = ref(25)
const isCustomAmount = ref(false)
const customAmountValue = ref(25)
const isMonthly = ref(false)

const enableCustomAmount = () => {
  isCustomAmount.value = true
  selectedAmount.value = null
}
</script> 