<template>
  <v-app class="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import * as cookie from "@/plugins/cookie.js";
import { SELF_QUERY } from "@/graphql/auth.js";
export default {
  name: "App",

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
              if (this.$route.path == "/") {
                this.$router.push({ name: "dashboard" });
              }
            }
          })
          .catch((err) => {
            err;
            this.$router.push({ name: "login" });
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
    TOKEN: function (val) {
      this.token = val;
    },
  },
};
</script>
<style>
@import "assets/css/app.scss";
</style>
