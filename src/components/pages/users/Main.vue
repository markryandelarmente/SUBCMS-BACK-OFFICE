<template>
  <v-container class="fill-height" fluid>
    <v-row align="start">
      <v-col md="12" sm="12">
        <v-tabs>
          <v-tab :to="{name: 'user_index'}">
            <strong>USERS</strong>
          </v-tab>
          <v-tab :to="{name: 'dashboard'}">
            <strong>TICKETS</strong>
          </v-tab>
          <v-tab>
            <strong>ROLES & PERMISSIONS</strong>
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

<style>
</style>