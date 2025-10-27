<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="border-b border-gray-200">
      <div
        class="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center"
      >
        <h1 class="text-2xl font-bold text-blue-600">HNG Ticket Manager</h1>
        <div class="flex gap-4">
          <router-link to="/auth/login">
            <button
              class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Login
            </button>
          </router-link>
          <router-link to="/auth/signup">
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
        <p class="text-xl mb-8 text-white/90">
          A simple, powerful ticket management system to track, organize, and
          resolve issues with ease.
        </p>
        <div class="flex gap-4 justify-center">
          <router-link to="/auth/signup">
            <button
              class="px-8 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100"
            >
              Start Free
            </button>
          </router-link>
          <router-link to="/auth/login">
            <button
              class="px-8 py-3 border-2 border-white text-white rounded-md font-medium hover:bg-white/10"
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
        <p>&copy; 2025 HNG Ticket Manager. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.gap-4 {
  gap: 1rem;
}

.gap-6 {
  gap: 1.5rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.py-20 {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.text-3xl {
  font-size: 1.875rem;
}

.text-5xl {
  font-size: 3rem;
}

.text-xl {
  font-size: 1.25rem;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

.text-center {
  text-align: center;
}

.text-white {
  color: white;
}

.text-blue-600 {
  color: #2563eb;
}

.text-gray-600 {
  color: #4b5563;
}

.bg-white {
  background-color: white;
}

.bg-blue-100 {
  background-color: #dbeafe;
}

.bg-gray-50 {
  background-color: #f9fafb;
}

.border {
  border: 1px solid;
}

.border-gray-200 {
  border-color: #e5e7eb;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-md {
  border-radius: 0.375rem;
}

.p-6 {
  padding: 1.5rem;
}

.w-12 {
  width: 3rem;
}

.h-12 {
  height: 3rem;
}

.max-w-6xl {
  max-width: 72rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.grid {
  display: grid;
}

.md\:grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.flex-1 {
  flex: 1;
}

.relative {
  position: relative;
}

.z-10 {
  z-index: 10;
}

.text-white\/90 {
  color: rgba(255, 255, 255, 0.9);
}

.bg-white\/10 {
  background-color: rgba(255, 255, 255, 0.1);
}

.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

.hover\:bg-blue-700:hover {
  background-color: #1d4ed8;
}

.hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.hover\:bg-white\/10:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.border-2 {
  border-width: 2px;
}

.border-white {
  border-color: white;
}

@media (max-width: 768px) {
  .md\:grid-cols-3 {
    grid-template-columns: 1fr;
  }
}
</style>
