<template>
  <v-app class="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
// import AuthLayout from "./components/layouts/AuthLayout";
// import AppLayout from "./components/layouts/AppLayout";
import { mapGetters } from "vuex";
import * as cookie from "@/plugins/cookie.js";
import { SELF_QUERY } from "@/graphql/auth.js";
export default {
  name: "App",

  // components: {
  //   AuthLayout,
  //   AppLayout,
  // },

  data: () => ({
    token: null,
  }),
  created() {
    this.checkIfAuthenticated();
  },
  methods: {
    checkIfAuthenticated() {
      this.token = cookie.getCookie("token");

      if (this.token) {
        this.$apollo
          .query({
            query: SELF_QUERY,
          })
          .then(({ data }) => {
            let { self: user } = data;
            if (user) {
              this.$store.commit("authenticated/SET_TOKEN", this.token);
              this.$store.commit("authenticated/SET_USER", user);

              this.$router.push({ name: "dashboard" });
            }
          });
      } else {
        this.$router.push({ name: "login" });
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
