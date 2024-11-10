<template>
  <main class="min-h-screen bg-white ">
    <div class="w-full px-24 py-12 flex justify-between">
      <!-- Header con logo -->
      <div class="text-center mb-8 w-1/2 pt-24">
        <h1 class="text-7xl font-bold mb-2">
          <span class="text-theme-accent">Junior</span>
          <span class="text-theme-primary">Minds</span>
        </h1>
        <h2 class="text-4xl text-theme-primary/80">Giving Tuesday Fundraiser</h2>
        <p class="text-lg text-theme-primary/60">by Junior Minds</p>
      </div>

      <!-- Card principal -->
      <div class="bg-white rounded-3xl shadow-lg overflow-hidden w-1/2" >
        <!-- Imagen ilustrativa -->
        <div class="relative h-80 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg"
            alt="Children reading and learning"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-black/15 to-theme-primary/40"></div>
          <div class="absolute inset-0">
            <div class="absolute w-full h-40 bg-theme-accent/20 rounded-[100%] -top-10 left-0 transform rotate-6"></div>
            <div class="absolute w-full h-40 bg-theme-primary/20 rounded-[100%] top-20 -right-20 transform -rotate-6"></div>
          </div>
        </div>

        <!-- Barra de progreso -->
        <div class="p-6 border-b border-theme-accent bg-theme-primary">
          <div class="flex justify-between text-sm mb-2">
            <div>
              <span class="font-bold text-xl text-theme-neutral">$41,250</span>
              <span class="text-theme-neutral ml-1">raised</span>
            </div>
            <div>
              <span class="font-bold text-xl text-theme-neutral">$50,000</span>
              <span class="text-theme-neutral ml-1">goal</span>
            </div>
          </div>
          <div class="h-2 bg-theme-primary/10 rounded-full overflow-hidden">
            <div class="h-full bg-theme-secondary w-[82%]"></div>
          </div>
        </div>

        <!-- Formulario de donación -->
        <div class="p-6 bg-theme-primary">
          <h3 class="font-semibold text-theme-neutral mb-4 ">Make a Donation</h3>
          
          <!-- Tipo de donación -->
          <div class="flex gap-2 mb-4">
            <button 
              :class="[
                'px-4 py-2 rounded-lg border text-sm transition-colors',
                !isMonthly 
                  ? 'bg-theme-secondary text-white border-theme-secondary' 
                  : 'border-theme-accent text-theme-neutral hover:border-theme-secondary'
              ]"
              @click="isMonthly = false"
            >
              One Time
            </button>
            <button 
              :class="[
                'px-4 py-2 rounded-lg border text-sm transition-colors',
                isMonthly 
                  ? 'bg-theme-secondary text-white border-theme-secondary' 
                  : 'border-theme-accent text-theme-neutral hover:border-theme-secondary'
              ]"
              @click="isMonthly = true"
            >
              Monthly
            </button>
          </div>

          <!-- Opciones de cantidad -->
          <div class="space-y-2 mb-4">
            <button 
              v-for="amount in [25, 100]" 
              :key="amount"
              :class="[
                'w-full p-4 rounded-lg border text-left transition-colors',
                selectedAmount === amount
                  ? 'bg-theme-white border-theme-secondary'
                  : 'border-theme-accent hover:border-theme-secondary'
              ]"
              @click="selectAmount(amount)"
            >
              <span class="font-semibold text-theme-neutral">${{ amount }}</span>
            </button>
            
            <!-- Campo de cantidad personalizada -->
            <div 
              :class="[
                'w-full p-4 rounded-lg border transition-colors',
                isCustomAmount
                  ? 'bg-theme-white border-theme-secondary'
                  : 'border-theme-accent'
              ]"
              @click="enableCustomAmount"
            >
              <label class="text-sm text-theme-neutral block">Custom Amount</label>
              <div class="flex items-center">
                <span class="text-theme-neutral mr-1">$</span>
                <input 
                  type="number" 
                  v-model="customAmountValue"
                  class="w-full bg-transparent focus:outline-none font-semibold text-theme-neutral"
                  placeholder="Enter amount"
                  :class="'placeholder-theme-neutral'"
                >
                <span class="text-theme-neutral ml-1">USD</span>
              </div>
            </div>
          </div>          

          <!-- Botón de donación -->
          <button 
            class="w-full bg-theme-secondary text-white py-4 rounded-lg font-semibold hover:opacity-90 transition-colors"
          >
            Donate ${{ displayAmount }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedAmount = ref(25)
const isCustomAmount = ref(false)
const customAmountValue = ref('')
const isMonthly = ref(false)

const selectAmount = (amount) => {
  selectedAmount.value = amount
  isCustomAmount.value = false
}

const enableCustomAmount = () => {
  isCustomAmount.value = true
  selectedAmount.value = null
}

const displayAmount = computed(() => {
  if (isCustomAmount.value) {
    return customAmountValue.value || '0'
  }
  return selectedAmount.value
})
</script> 