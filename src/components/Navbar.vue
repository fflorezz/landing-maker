<script setup>
const menuItems = ['Home', 'Profile', 'Team', 'Work', 'Stories']
</script>

<template>
  <nav class="bg-black/10 px-6 py-4">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="flex items-center gap-2 text-theme-neutral">
        <div class="w-8 h-8 bg-theme-neutral rounded-full flex items-center justify-center text-theme-primary font-bold">
          GH
        </div>
        <span class="font-semibold">Global Health</span>
      </div>
      
      <div class="hidden md:flex items-center gap-8">
        <a 
          v-for="item in menuItems" 
          :key="item"
          href="#" 
          :class="[
            'text-theme-neutral hover:opacity-50 transition-colors',
            { 'opacity-50': item === 'Home' }
          ]"
        >
          {{ item }}
        </a>
      </div>
      
      <button class="md:hidden text-white">☰</button>
    </div>
  </nav>
</template> 