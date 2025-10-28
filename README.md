# Ticket Manager - Multi-Framework Implementation

A comprehensive ticket management web application built in three different frameworks: **React**, **Vue.js**, and **Twig (PHP)**. All three implementations feature identical functionality, design, and user experience.

## Project Overview

This project demonstrates how to build the same application across multiple technology stacks while maintaining consistency in:

- User interface and design
- Feature set and functionality
- Data structure and validation
- User experience and workflows

## Implementations

A modern Vue application using Vue Router with Vue 3 Composition API, Tailwind CSS, and Vite.

**Key Features:**

- Server and client components
- Built-in routing with Vue Router
- Responsive design with Tailwind CSS
- localStorage for session and data persistence
- Form validation with inline error messages

**Getting Started:**
\`\`\`bash
cd tickect-manager-vue
npm install
npm run dev
\`\`\`

## Shared Features Across All Implementations

### Pages

#### Landing Page

- Hero section with wavy SVG background
- Decorative circles for visual interest
- Feature cards highlighting key capabilities
- Call-to-action buttons for login/signup
- Responsive layout for all screen sizes

#### Authentication

- **Login Page** - Email and password validation
- **Signup Page** - Name, email, password confirmation
- Form validation with inline error messages
- Demo credentials for testing
- Session token storage

#### Dashboard

- Ticket statistics cards (total, open, in progress, closed)
- Color-coded stat cards
- Quick navigation to ticket management
- User email display
- Logout functionality

#### Ticket Management

- **List View** - Display all tickets with status badges
- **Create** - Form to add new tickets with title, description, status
- **Edit** - Update ticket details
- **Delete** - Remove tickets with confirmation
- Status filtering with color coding
