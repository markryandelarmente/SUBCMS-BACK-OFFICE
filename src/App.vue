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
    authenticated: true,
  }),
};
</script>
<style lang="scss" scoped>
.app {
  background-color: #243441 !important;
}
</style>
