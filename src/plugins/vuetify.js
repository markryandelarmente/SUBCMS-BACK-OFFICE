import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    default: "light",
    dark: false,
    themes: {
      light: {
        primary: "#00bbaf",
        secondary: "#243441",
        accent: "#91cbc7",
        text_dark: "#000000",
        error: "#f44336",
        warning: "#ffc107",
        info: "#2196f3",
        success: "#009688",
      },
      dark: {
        primary: "#00bbaf",
        secondary: "#243441",
        accent: "#91cbc7",
        text_dark: "#000000",
        error: "#f44336",
        warning: "#ffc107",
        info: "#2196f3",
        success: "#009688",
      },
    },
  },
});
