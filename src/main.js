import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "babel-polyfill";
import { createProvider } from "./vue-apollo";
import routes from "./routes";
import { store } from "./store";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router: routes,
  store,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");
