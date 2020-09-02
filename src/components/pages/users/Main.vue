<template>
  <div>
    <v-tabs>
      <v-tab :to="{ name: 'users' }">
        <strong>{{ $t("user_group.main.users") }}</strong>
      </v-tab>
      <v-tab :to="{ name: 'tickets' }">
        <strong>{{ $t("user_group.main.tickets") }}</strong>
      </v-tab>
      <v-tab :to="{ name: 'roles_permissions' }">
        <strong>{{ $t("user_group.main.roles_permissions") }}</strong>
      </v-tab>
    </v-tabs>
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style></style>
