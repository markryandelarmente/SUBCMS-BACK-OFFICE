import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "babel-polyfill";
import { createProvider } from "./vue-apollo";
import routes from "./routes/index";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router: routes,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");
