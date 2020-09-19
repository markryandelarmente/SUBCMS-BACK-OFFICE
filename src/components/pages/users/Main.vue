<template>
  <div>
    <v-tabs>
      <v-tab :to="{ name: 'users' }">
        <strong>{{ $t("user_group.main.users") }}</strong>
      </v-tab>
      <v-tab :to="{ name: 'tickets' }">
        <strong>{{ $t("user_group.main.tickets") }}</strong>
      </v-tab>
      <v-tab :to="{ name: 'roles_permissions', query: {id: roles[0]} }">
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
import { ROLES_QUERY } from "@/graphql/role.js";
export default {
  data: () => ({
    roles: [],
  }),
  beforeMount() {
    this.fetchData();
  },
  created() {},
  methods: {
    fetchData() {
      this.$apollo
        .query({
          query: ROLES_QUERY,
        })
        .then(({ data }) => {
          this.roles = data.roles.map((role) => {
            return role.id;
          });
        });
    },
  },
};
</script>

<style></style>
