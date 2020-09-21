<template>
  <div>
    <v-tabs>
      <v-tab :to="{ name: 'content' }">
        <strong>CONTENT</strong>
      </v-tab>
      <v-tab :to="{ name: 'resources' }">
        <strong>RESOURCES</strong>
      </v-tab>
      <v-tab :to="{ name: 'categories' }">
        <strong>CATEGORIES</strong>
      </v-tab>
      <v-tab :to="{ name: 'tags' }">
        <strong>TAGS</strong>
      </v-tab>
    </v-tabs>
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" class="m-0 p-0">
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
