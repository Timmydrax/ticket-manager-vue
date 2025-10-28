<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="border-b border-gray-200 bg-white">
      <div
        class="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center"
      >
        <h1 class="text-2xl font-bold text-blue-900">Ticket Manager</h1>
        <router-link to="/tickets">
          <button
            class="px-4 py-2 shadow border-gray-300 rounded-md hover:bg-blue-900 hover:text-white"
          >
            Back to Tickets
          </button>
        </router-link>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-2xl mx-auto px-4 py-12">
      <div class="bg-white p-8 rounded-lg shadow border-gray-200">
        <h2 class="text-3xl font-bold mb-6">Edit Ticket</h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              placeholder="Ticket title"
              v-model="formData.title"
              :class="{ 'border-red-500': errors.title }"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
            <p v-if="errors.title" class="text-sm text-red-600 mt-1">
              {{ errors.title }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Description</label>
            <textarea
              placeholder="Ticket description"
              v-model="formData.description"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              rows="6"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Status</label>
            <select
              v-model="formData.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <p v-if="errors.status" class="text-sm text-red-600 mt-1">
              {{ errors.status }}
            </p>
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              class="flex-1 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-900"
            >
              Save Changes
            </button>
            <router-link to="/tickets" class="flex-1">
              <button
                type="button"
                class="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </router-link>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "EditTicketPage",
  data() {
    return {
      ticket: null,
      formData: { title: "", description: "", status: "open" },
      errors: {},
      isLoading: true,
    };
  },
  mounted() {
    const sessionData = localStorage.getItem("ticketapp_session");
    if (!sessionData) {
      this.$router.push("/auth/login");
      return;
    }

    const ticketId = this.$route.params.id;
    const ticketsData = localStorage.getItem("tickets");
    if (ticketsData) {
      const tickets = JSON.parse(ticketsData);
      const found = tickets.find((t) => t.id === ticketId);
      if (found) {
        this.ticket = found;
        this.formData = {
          title: found.title,
          description: found.description,
          status: found.status,
        };
      } else {
        this.$router.push("/tickets");
      }
    }
    this.isLoading = false;
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.formData.title.trim()) {
        this.errors.title = "Title is required";
      }

      if (!["open", "in_progress", "closed"].includes(this.formData.status)) {
        this.errors.status = "Invalid status";
      }

      return Object.keys(this.errors).length === 0;
    },
    handleSubmit() {
      if (!this.validateForm()) return;

      const ticketsData = localStorage.getItem("tickets");
      if (ticketsData) {
        const tickets = JSON.parse(ticketsData);
        const updatedTickets = tickets.map((t) =>
          t.id === this.ticket.id ? { ...t, ...this.formData } : t
        );
        localStorage.setItem("tickets", JSON.stringify(updatedTickets));
        this.$router.push("/tickets");
      }
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

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
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

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.border {
  border: 1px solid;
}

.border-gray-300 {
  border-color: #d1d5db;
}

.rounded-md {
  border-radius: 0.375rem;
}

.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

.max-w-2xl {
  max-width: 42rem;
}

.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.p-8 {
  padding: 2rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.text-3xl {
  font-size: 1.875rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.text-sm {
  font-size: 0.875rem;
}

.font-medium {
  font-weight: 500;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.w-full {
  width: 100%;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.focus\:outline-none:focus {
  outline: none;
}

.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.5);
}

.focus\:ring-blue-600:focus {
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.5);
}

.border-red-500 {
  border-color: #ef4444;
}

.text-red-600 {
  color: #dc2626;
}

.mt-1 {
  margin-top: 0.25rem;
}

.bg-blue-600 {
  background-color: #2563eb;
}

.text-white {
  color: white;
}

.hover\:bg-blue-700:hover {
  background-color: #1d4ed8;
}

.gap-4 {
  gap: 1rem;
}

.flex-1 {
  flex: 1;
}
</style>
