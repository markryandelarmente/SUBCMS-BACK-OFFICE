<template>
  <v-container class="fill-height" fluid>
    <v-row align="start">
      <v-col md="12" sm="12">
        <v-tabs>
          <v-tab :to="{ name: 'users' }">
            <strong>{{ $t("user_group.main.users") }}</strong>
          </v-tab>
          <v-tab :to="{ name: 'tickets' }">
            <strong>{{ $t("user_group.main.tickets") }}</strong>
          </v-tab>
          <v-tab>
            <strong>{{ $t("user_group.main.roles_permissions") }}</strong>
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style></style>
