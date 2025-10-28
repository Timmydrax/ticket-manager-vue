<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="border-b border-gray-200 bg-white">
      <div
        class="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center"
      >
        <h1 class="text-2xl font-bold text-blue-900">Ticket Manager</h1>
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-600">{{ session?.email }}</span>
          <button
            @click="handleLogout"
            class="px-4 py-2 shadow bg-gray-200 border-gray-300 rounded-md hover:bg-blue-900 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 py-12">
      <div class="mb-8">
        <h2 class="text-3xl font-bold mb-2">Dashboard</h2>
        <p class="text-gray-600">
          Welcome back, {{ session?.name || session?.email }}!
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid md:grid-cols-4 gap-6 mb-12">
        <div class="bg-white p-6 rounded-lg shadow border-gray-200">
          <div class="text-sm text-gray-600 mb-2">Total Tickets</div>
          <div class="text-4xl font-bold">{{ stats.total }}</div>
        </div>
        <div
          class="bg-white p-6 rounded-lg shadow border-gray-200 border-l-4 border-l-green-500"
        >
          <div class="text-sm text-gray-600 mb-2">Open</div>
          <div class="text-4xl font-bold text-green-600">{{ stats.open }}</div>
        </div>
        <div
          class="bg-white p-6 rounded-lg shadow border-gray-200 border-l-4 border-l-amber-500"
        >
          <div class="text-sm text-gray-600 mb-2">In Progress</div>
          <div class="text-4xl font-bold text-amber-600">
            {{ stats.inProgress }}
          </div>
        </div>
        <div
          class="bg-white p-6 rounded-lg shadow border-gray-200 border-l-4 border-l-gray-500"
        >
          <div class="text-sm text-gray-600 mb-2">Closed</div>
          <div class="text-4xl font-bold text-gray-600">{{ stats.closed }}</div>
        </div>
      </div>

      <!-- Action Card -->
      <div class="bg-white p-8 rounded-lg shadow border-gray-200 text-center">
        <h3 class="text-2xl font-bold mb-4">Ready to manage your tickets?</h3>
        <p class="text-gray-600 mb-6">
          Create, view, edit, and delete tickets to keep your workflow
          organized.
        </p>
        <router-link to="/tickets">
          <button
            class="px-8 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-900"
          >
            Go to Ticket Management
          </button>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "DashboardPage",
  data() {
    return {
      session: null,
      stats: { total: 0, open: 0, inProgress: 0, closed: 0 },
      isLoading: true,
    };
  },
  mounted() {
    const sessionData = localStorage.getItem("ticketapp_session");
    if (!sessionData) {
      this.$router.push("/auth/login");
      return;
    }

    try {
      this.session = JSON.parse(sessionData);

      const ticketsData = localStorage.getItem("tickets");
      if (ticketsData) {
        const tickets = JSON.parse(ticketsData);
        this.stats.total = tickets.length;
        this.stats.open = tickets.filter((t) => t.status === "open").length;
        this.stats.inProgress = tickets.filter(
          (t) => t.status === "in_progress"
        ).length;
        this.stats.closed = tickets.filter((t) => t.status === "closed").length;
      }
    } catch (error) {
      this.$router.push("/auth/login");
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("ticketapp_session");
      this.$router.push("/auth/login");
    },
  },
};
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.bg-gray-50 {
  background-color: #f9fafb;
}

.border-b {
  border-bottom: 1px solid;
}

.border-gray-200 {
  border-color: #e5e7eb;
}

.bg-white {
  background-color: white;
}

.max-w-6xl {
  max-width: 72rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.flex {
  display: flex;
}

.py-2 {
  padding-block: 0.5rem;
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

.text-2xl {
  font-size: 1.5rem;
}

.font-bold {
  font-weight: 700;
}

.text-blue-600 {
  color: #2563eb;
}

.text-sm {
  font-size: 0.875rem;
}

.text-gray-600 {
  color: #4b5563;
}

.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.text-3xl {
  font-size: 1.875rem;
}

.grid {
  display: grid;
}

.md\:grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.gap-6 {
  gap: 1.5rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.p-6 {
  padding: 1.5rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.border {
  border: 1px solid;
}

.border-l-4 {
  border-left-width: 4px;
}

.border-l-green-500 {
  border-left-color: #22c55e;
}

.text-4xl {
  font-size: 2.25rem;
}

.text-green-600 {
  color: #16a34a;
}

.border-l-amber-500 {
  border-left-color: #f59e0b;
}

.text-amber-600 {
  color: #d97706;
}

.border-l-gray-500 {
  border-left-color: #6b7280;
}

.text-gray-600 {
  color: #4b5563;
}

.p-8 {
  padding: 2rem;
}

.text-center {
  text-align: center;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.bg-blue-600 {
  background-color: #2563eb;
}

.text-white {
  color: white;
}

.rounded-md {
  border-radius: 0.375rem;
}

.hover\:bg-blue-700:hover {
  background-color: #1d4ed8;
}

.border-gray-300 {
  border-color: #d1d5db;
}

.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

@media (max-width: 768px) {
  .md\:grid-cols-4 {
    grid-template-columns: 1fr;
  }
}
</style>
