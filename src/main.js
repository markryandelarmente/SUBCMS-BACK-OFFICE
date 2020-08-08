import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "babel-polyfill";
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false;

new Vue({
  vuetify,
  apolloProvider: createProvider(),
  render: (h) => h(App)
}).$mount("#app");
