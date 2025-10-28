<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="border-b border-gray-200">
      <div
        class="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center"
      >
        <h1 class="text-2xl font-bold text-blue-900">Ticket Manager</h1>
        <div class="flex gap-4">
          <router-link to="/auth/login">
            <button
              class="px-4 py-2 shadow border-gray-300 rounded-md hover:bg-blue-900 hover:text-white cursor-pointer"
            >
              Login
            </button>
          </router-link>
          <router-link to="/auth/signup">
            <button
              class="px-4 py-2 bg-blue-900 cursor-pointer text-white rounded-md hover:bg-blue-900"
            >
              Get Started
            </button>
          </router-link>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="wave-bg text-white py-20 relative flex-1">
      <div
        class="absolute top-10 right-20 circle-decoration circle-lg bg-white"
      ></div>
      <div
        class="absolute bottom-20 left-10 circle-decoration circle-md bg-white"
      ></div>

      <div class="max-w-6xl mx-auto px-4 text-center relative z-10">
        <h2 class="text-5xl font-bold mb-6">Manage Your Tickets Efficiently</h2>
        <p class="text-xl mb-8 text-white/90 text-balance">
          A simple, powerful ticket management system to track, organize, and
          resolve issues with ease.
        </p>
        <div class="flex gap-4 justify-center items-center">
          <router-link to="/auth/signup">
            <button
              class="px-8 py-3 bg-white text-blue-900 rounded-md font-medium hover:bg-gray-100"
            >
              Start Free
            </button>
          </router-link>
          <router-link to="/auth/login">
            <button
              class="px-8 py-3 border border-white text-white rounded-md font-medium hover:bg-white/10"
            >
              Sign In
            </button>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4">
        <h3 class="text-3xl font-bold text-center mb-12">Features</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-lg border border-gray-200">
            <div
              class="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center"
            >
              <span class="text-2xl">📋</span>
            </div>
            <h4 class="text-xl font-semibold mb-2">Create Tickets</h4>
            <p class="text-gray-600">
              Easily create and organize tickets with titles, descriptions, and
              status tracking.
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg border border-gray-200">
            <div
              class="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center"
            >
              <span class="text-2xl">🔄</span>
            </div>
            <h4 class="text-xl font-semibold mb-2">Track Progress</h4>
            <p class="text-gray-600">
              Monitor ticket status from open to in-progress to closed with
              real-time updates.
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg border border-gray-200">
            <div
              class="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center"
            >
              <span class="text-2xl">📊</span>
            </div>
            <h4 class="text-xl font-semibold mb-2">View Statistics</h4>
            <p class="text-gray-600">
              Get insights into your ticket workflow with comprehensive
              statistics and metrics.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-200 bg-gray-50 py-8">
      <div class="max-w-6xl mx-auto px-4 text-center text-gray-600">
        <p>&copy; 2025 Ticket Manager. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>
