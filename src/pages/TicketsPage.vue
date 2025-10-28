<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="border-b border-gray-200 bg-white">
      <div
        class="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center"
      >
        <h1 class="text-2xl font-bold text-blue-900">Ticket Manager</h1>
        <router-link to="/dashboard">
          <button
            class="px-4 py-2 shadow bg-gray-200 rounded-md hover:bg-blue-900 hover:text-white"
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
          class="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-900"
        >
          {{ showForm ? "Cancel" : "Create Ticket" }}
        </button>
      </div>

      <!-- Create Ticket Form -->
      <div
        v-if="showForm"
        class="bg-white p-6 rounded-lg shadow border-gray-200 mb-8"
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
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
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
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              rows="4"
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

          <button
            type="submit"
            class="w-full px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-900"
          >
            Create Ticket
          </button>
        </form>
      </div>

      <!-- Tickets List -->
      <div class="space-y-4">
        <div
          v-if="tickets.length === 0"
          class="bg-white p-12 rounded-lg shadow border-gray-200 text-center"
        >
          <p class="text-gray-600 mb-4">
            No tickets yet. Create one to get started!
          </p>
          <button
            @click="showForm = true"
            class="w-full px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-900"
          >
            Create First Ticket
          </button>
        </div>

        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          class="bg-white p-6 rounded-lg shadow border-gray-200"
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
                class="px-4 py-2 shadow bg-white border-gray-300 rounded-md hover:bg-gray-50"
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
