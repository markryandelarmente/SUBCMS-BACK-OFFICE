import Vue from "vue";
import Vuex from "vuex";
import authenticated from "./modules/authenticated";

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    authenticated,
  },
});
