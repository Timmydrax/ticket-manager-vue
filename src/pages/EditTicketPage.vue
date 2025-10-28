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

