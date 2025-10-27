<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="border-b border-gray-200 bg-white">
      <div
        class="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center"
      >
        <h1 class="text-2xl font-bold text-blue-600">HNG Ticket Manager</h1>
        <router-link to="/dashboard">
          <button
            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </router-link>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 py-12">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-3xl font-bold mb-2">Tickets</h2>
          <p class="text-gray-600">Manage all your tickets in one place</p>
        </div>
        <button
          @click="showForm = !showForm"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {{ showForm ? "Cancel" : "Create Ticket" }}
        </button>
      </div>

      <!-- Create Ticket Form -->
      <div
        v-if="showForm"
        class="bg-white p-6 rounded-lg border border-gray-200 mb-8"
      >
        <h3 class="text-xl font-semibold mb-4">Create New Ticket</h3>
        <form @submit.prevent="handleAddTicket" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              placeholder="Ticket title"
              v-model="formData.title"
              :class="{ 'border-red-500': errors.title }"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <p v-if="errors.title" class="text-sm text-red-600 mt-1">
              {{ errors.title }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Description</label>
            <textarea
              placeholder="Ticket description (optional)"
              v-model="formData.description"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Status</label>
            <select
              v-model="formData.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <p v-if="errors.status" class="text-sm text-red-600 mt-1">
              {{ errors.status }}
            </p>
          </div>

          <button
            type="submit"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Ticket
          </button>
        </form>
      </div>

      <!-- Tickets List -->
      <div class="space-y-4">
        <div
          v-if="tickets.length === 0"
          class="bg-white p-12 rounded-lg border border-gray-200 text-center"
        >
          <p class="text-gray-600 mb-4">
            No tickets yet. Create one to get started!
          </p>
          <button
            @click="showForm = true"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create First Ticket
          </button>
        </div>

        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          class="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <h3 class="text-xl font-semibold mb-2">{{ ticket.title }}</h3>
              <p v-if="ticket.description" class="text-gray-600 mb-3">
                {{ ticket.description }}
              </p>
              <div class="flex items-center gap-4">
                <span
                  :class="getStatusColor(ticket.status)"
                  class="px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ getStatusLabel(ticket.status) }}
                </span>
                <span class="text-sm text-gray-600">{{
                  new Date(ticket.createdAt).toLocaleDateString()
                }}</span>
              </div>
            </div>
            <div class="flex gap-2">
              <router-link :to="`/tickets/${ticket.id}`">
                <button
                  class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Edit
                </button>
              </router-link>
              <button
                @click="deleteConfirm = ticket.id"
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>

          <!-- Delete Confirmation -->
          <div
            v-if="deleteConfirm === ticket.id"
            class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md"
          >
            <p class="text-sm mb-3">
              Are you sure you want to delete this ticket?
            </p>
            <div class="flex gap-2">
              <button
                @click="handleDeleteTicket(ticket.id)"
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirm Delete
              </button>
              <button
                @click="deleteConfirm = null"
                class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "TicketsPage",
  data() {
    return {
      tickets: [],
      isLoading: true,
      showForm: false,
      formData: { title: "", description: "", status: "open" },
      errors: {},
      deleteConfirm: null,
    };
  },
  mounted() {
    const sessionData = localStorage.getItem("ticketapp_session");
    if (!sessionData) {
      this.$router.push("/auth/login");
      return;
    }

    const ticketsData = localStorage.getItem("tickets");
    if (ticketsData) {
      this.tickets = JSON.parse(ticketsData);
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
    handleAddTicket() {
      if (!this.validateForm()) return;

      const newTicket = {
        id: Date.now().toString(),
        title: this.formData.title,
        description: this.formData.description,
        status: this.formData.status,
        createdAt: new Date().toISOString(),
      };

      this.tickets.push(newTicket);
      localStorage.setItem("tickets", JSON.stringify(this.tickets));

      this.formData = { title: "", description: "", status: "open" };
      this.showForm = false;
    },
    handleDeleteTicket(id) {
      this.tickets = this.tickets.filter((t) => t.id !== id);
      localStorage.setItem("tickets", JSON.stringify(this.tickets));
      this.deleteConfirm = null;
    },
    getStatusColor(status) {
      switch (status) {
        case "open":
          return "bg-green-100 text-green-700";
        case "in_progress":
          return "bg-amber-100 text-amber-700";
        case "closed":
          return "bg-gray-100 text-gray-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    },
    getStatusLabel(status) {
      return (
        status.replace("_", " ").charAt(0).toUpperCase() +
        status.replace("_", " ").slice(1)
      );
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

.bg-blue-600 {
  background-color: #2563eb;
}

.text-white {
  color: white;
}

.hover\:bg-blue-700:hover {
  background-color: #1d4ed8;
}

.p-6 {
  padding: 1.5rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.text-xl {
  font-size: 1.25rem;
}

.font-semibold {
  font-weight: 600;
}

.space-y-4 > * + * {
  margin-top: 1rem;
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

.w-full {
  width: 100%;
}

.mb-12 {
  margin-bottom: 3rem;
}

.p-12 {
  padding: 3rem;
}

.text-center {
  text-align: center;
}

.items-start {
  align-items: flex-start;
}

.flex-1 {
  flex: 1;
}

.gap-2 {
  gap: 0.5rem;
}

.bg-red-600 {
  background-color: #dc2626;
}

.hover\:bg-red-700:hover {
  background-color: #b91c1c;
}

.mt-4 {
  margin-top: 1rem;
}

.p-4 {
  padding: 1rem;
}

.bg-red-50 {
  background-color: #fef2f2;
}

.border-red-200 {
  border-color: #fecaca;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.rounded-full {
  border-radius: 9999px;
}

.font-medium {
  font-weight: 500;
}

.bg-green-100 {
  background-color: #dcfce7;
}

.text-green-700 {
  color: #15803d;
}

.bg-amber-100 {
  background-color: #fef3c7;
}

.text-amber-700 {
  color: #b45309;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.text-gray-700 {
  color: #374151;
}

@media (max-width: 768px) {
  .md\:grid-cols-4 {
    grid-template-columns: 1fr;
  }
}
</style> 
