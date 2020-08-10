<template>
  <v-app class="app">
    <AuthLayout v-if="!token" />
    <AppLayout v-else />
  </v-app>
</template>

<script>
import AuthLayout from "./components/layouts/AuthLayout";
import AppLayout from "./components/layouts/AppLayout";
import { mapGetters } from "vuex";
import * as cookie from "@/plugins/cookie.js";
import { SELF_QUERY } from "@/graphql/auth.js";
export default {
  name: "App",

  components: {
    AuthLayout,
    AppLayout,
  },

  data: () => ({
    token: null,
  }),
  created() {
    this.checkIfAuthenticated();
  },
  methods: {
    checkIfAuthenticated() {
      let token = cookie.getCookie("token");
      this.token = token;

      if (token) {
        this.$apollo
          .query({
            query: SELF_QUERY,
          })
          .then(({ data }) => {
            let { self: user } = data;
            if (user) {
              if (!this.$route.name == "dashboard") {
                this.$router.replace("/home");
              }
            } else {
              cookie.eraseCookie("token");
              if (!this.$route.name == "login") {
                this.$router.replace("/login");
              }
            }
          });
      }
    },
  },
  computed: {
    ...mapGetters({
      TOKEN: "authenticated/TOKEN",
      USER: "authenticated/USER",
    }),
  },
  watch: {
    TOKEN: function(val) {
      this.token = val;
    },
  },
};
</script>
<style>
@import "assets/css/app.scss";
</style>
