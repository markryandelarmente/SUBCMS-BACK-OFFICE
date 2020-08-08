<template>
  <v-app class="app">
    <AuthLayout v-if="!authenticated" />
    <AppLayout v-else />
  </v-app>
</template>

<script>
import AuthLayout from "./components/layouts/AuthLayout";
import AppLayout from "./components/layouts/AppLayout";

export default {
  name: "App",

  components: {
    AuthLayout,
    AppLayout,
  },

  data: () => ({
    authenticated: false,
  }),
  created() {
    this.checkIfAuthicated();
  },
  methods: {
    checkIfAuthicated() {
      if (!this.$route.name == "login" && !this.authenticated) {
        this.$router.replace("/login");
      }
    },
  },
};
</script>
<style>
@import "assets/css/app.scss";
</style>
