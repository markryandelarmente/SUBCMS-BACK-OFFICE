import Vue from "vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);

import auth from "./auth";
import dashboard from "./dashboard";

var allRoutes = [];
var routes = allRoutes.concat(auth, dashboard);

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "active",
  routes,
});

export default router;
