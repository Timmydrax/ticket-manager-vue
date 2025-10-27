<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
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
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <p v-if="errors.password" class="text-sm text-red-600 mt-1">
            {{ errors.password }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {{ isLoading ? "Signing in..." : "Sign In" }}
        </button>
      </form>

      <div class="mt-6 pt-6 border-t border-gray-200">
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
            class="text-blue-600 hover:underline font-medium"
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

 <style scoped>
.min-h-screen {
  min-height: 100vh;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.bg-gray-50 {
  background-color: #f9fafb;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.w-full {
  width: 100%;
}

.max-w-md {
  max-width: 28rem;
}

.p-8 {
  padding: 2rem;
}

.bg-white {
  background-color: white;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.border {
  border: 1px solid;
}

.border-gray-200 {
  border-color: #e5e7eb;
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

.font-bold {
  font-weight: 700;
}

.text-gray-600 {
  color: #4b5563;
}

.text-sm {
  font-size: 0.875rem;
}

.font-medium {
  font-weight: 500;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.border-gray-300 {
  border-color: #d1d5db;
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

.disabled\:opacity-50:disabled {
  opacity: 0.5;
}

.mt-6 {
  margin-top: 1.5rem;
}

.pt-6 {
  padding-top: 1.5rem;
}

.border-t {
  border-top: 1px solid;
}

.mb-4 {
  margin-bottom: 1rem;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.rounded {
  border-radius: 0.25rem;
}

.text-center {
  text-align: center;
}

.text-blue-600 {
  color: #2563eb;
}

.hover\:underline:hover {
  text-decoration: underline;
}
</style> 
