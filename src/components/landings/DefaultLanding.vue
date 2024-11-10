<template>
  <div class="min-h-screen bg-theme-primary">
    <Navbar />
    <main class="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
    <HeroBanner />
      <DonationForm />
    </main>
  </div>
</template>

<script setup>
import HeroBanner from '../HeroBanner.vue'
import DonationForm from '../DonationForm.vue'
import Navbar from '../Navbar.vue'
</script> 