<template>
  <div class="flex flex-col items-center justify-center text-center py-20 px-6">
    <h1 class="text-6xl font-bold text-blue-900 mb-4">404</h1>
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
    <p class="text-gray-600 mb-6">
      Sorry, the page you're looking for doesn't exist or has been moved.
    </p>

    <router-link
      to="/"
      class="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors"
    >
      Go Home
    </router-link>
  </div>
</template>
