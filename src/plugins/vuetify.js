import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    dark: false,
    default: "light",
    disable: false,
    themes: {
      light: {
        primary: "#0affef",
        secondary: "#243441",
        text_light: "#fffff",
        text_dark: "#000000",
        text_default: "#4c5b65",
        accent: "#66717a",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
      },
    },
  },
});
