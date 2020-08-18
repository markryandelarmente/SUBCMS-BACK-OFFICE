import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "babel-polyfill";
import { createProvider } from "./vue-apollo";
import routes from "./routes";
import { store } from "./store";
import i18n from "./i18n";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router: routes,
  store,
  i18n,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");
