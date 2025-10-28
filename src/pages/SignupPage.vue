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
