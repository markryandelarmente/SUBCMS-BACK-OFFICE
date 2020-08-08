import Vue from "vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);

import auth from "./auth";

var allRoutes = [];
var routes = allRoutes.concat(auth);

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "active",
  routes,
});

export default router;
