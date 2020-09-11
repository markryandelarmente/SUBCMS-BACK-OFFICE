import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "babel-polyfill";
import { createProvider } from "./vue-apollo";
import routes from "./routes";
import { store } from "./store";
import i18n from "./i18n";
import Vue2Editor from "vue2-editor";
import VuePlyr from "vue-plyr";

Vue.use(Vue2Editor);
Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: true },
    airplay: { enabled: false },
  },
  emit: ["ended"],
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router: routes,
  store,
  i18n,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");
