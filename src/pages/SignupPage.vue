<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md p-8 bg-white rounded-lg border border-gray-200">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Create Account</h1>
        <p class="text-gray-600">
          Sign up to get started with ticket management
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- <div>
          <label class="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            v-model="formData.name"
            autocomplete="name"
            :class="{ 'border-red-500': errors.name }"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <p v-if="errors.name" class="text-sm text-red-600 mt-1">
            {{ errors.name }}
          </p>
        </div> -->

        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            v-model="formData.email"
            autocomplete="email"
            :class="{ 'border-red-500': errors.email }"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <p v-if="errors.email" class="text-sm text-red-600 mt-1">
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            v-model="formData.password"
            autocomplete="new-password"
            :class="{ 'border-red-500': errors.password }"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <p v-if="errors.password" class="text-sm text-red-600 mt-1">
            {{ errors.password }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            placeholder="••••••••"
            autocomplete="new-password"
            v-model="formData.confirmPassword"
            :class="{ 'border-red-500': errors.confirmPassword }"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <p v-if="errors.confirmPassword" class="text-sm text-red-600 mt-1">
            {{ errors.confirmPassword }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-900 disabled:opacity-50"
        >
          {{ isLoading ? "Signing Up..." : "Sign Up" }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Already have an account?
          <router-link
            to="/auth/login"
            class="text-blue-900 hover:underline font-medium"
            >Sign in</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupPage",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      errors: {},
      isLoading: false,
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.formData.name) {
        this.errors.name = "Name is required";
      }

      if (!this.formData.email) {
        this.errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
        this.errors.email = "Please enter a valid email";
      }

      if (!this.formData.password) {
        this.errors.password = "Password is required";
      } else if (this.formData.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters";
      }

      if (this.formData.password !== this.formData.confirmPassword) {
        this.errors.confirmPassword = "Passwords do not match";
      }

      return Object.keys(this.errors).length === 0;
    },
    handleSubmit() {
      if (!this.validateForm()) return;

      this.isLoading = true;

      setTimeout(() => {
        localStorage.setItem(
          "ticketapp_session",
          JSON.stringify({
            email: this.formData.email,
            name: this.formData.name,
            token: "mock-token-" + Date.now(),
            createdAt: new Date().toISOString(),
          })
        );
        this.$router.push("/dashboard");
        this.isLoading = false;
      }, 500);
    },
  },
};
</script>
