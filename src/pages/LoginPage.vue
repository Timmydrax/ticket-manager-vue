<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md p-8 bg-white rounded-lg border border-gray-200">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Welcome Back</h1>
        <p class="text-gray-600">Sign in to your account to continue</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
            v-model="email"
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
            autocomplete="current-password"
            v-model="password"
            :class="{ 'border-red-500': errors.password }"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <p v-if="errors.password" class="text-sm text-red-600 mt-1">
            {{ errors.password }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-900 disabled:opacity-50"
        >
          {{ isLoading ? "Signing in..." : "Sign In" }}
        </button>
      </form>

      <div class="mt-6 pt-6 border-t border-gray-100">
        <p class="text-sm text-gray-600 mb-4">
          Demo credentials: <br />
          Email:
          <code class="bg-gray-100 px-2 py-1 rounded">demo@example.com</code>
          <br />
          Password:
          <code class="bg-gray-100 px-2 py-1 rounded">password123</code>
        </p>
      </div>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Don't have an account?
          <router-link
            to="/auth/signup"
            class="text-blue-900 hover:underline font-medium"
            >Sign up</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      isLoading: false,
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.email) {
        this.errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.errors.email = "Please enter a valid email";
      }

      if (!this.password) {
        this.errors.password = "Password is required";
      } else if (this.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters";
      }

      return Object.keys(this.errors).length === 0;
    },
    handleSubmit() {
      if (!this.validateForm()) return;

      this.isLoading = true;

      setTimeout(() => {
        if (
          this.email === "demo@example.com" &&
          this.password === "password123"
        ) {
          localStorage.setItem(
            "ticketapp_session",
            JSON.stringify({
              email: this.email,
              token: "mock-token-" + Date.now(),
              createdAt: new Date().toISOString(),
            })
          );
          this.$router.push("/dashboard");
        } else {
          alert("Invalid email or password");
        }
        this.isLoading = false;
      }, 500);
    },
  },
};
</script>
