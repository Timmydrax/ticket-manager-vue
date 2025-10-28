import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/LandingPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import SignupPage from "../pages/SignupPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import TicketsPage from "../pages/TicketsPage.vue";
import EditTicketPage from "../pages/EditTicketPage.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
  },
  {
    path: "/auth/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/auth/signup",
    name: "Signup",
    component: SignupPage,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: TicketsPage,
  },
  {
    path: "/tickets/:id",
    name: "EditTicket",
    component: EditTicketPage,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
