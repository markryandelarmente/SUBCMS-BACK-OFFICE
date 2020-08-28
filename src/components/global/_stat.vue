<template>
  <div>
    <v-card
      v-for="stat in stats"
      :key="stat.icon + stat.value"
      max-width="350"
      outlined
      class="mt-5"
    >
      <div class="mt-5 ml-5">
        <v-icon>{{ stat.icon }}</v-icon>
        {{ stat.text }}
      </div>
      <v-list-item three-line>
        <v-list-item-content class="text-center">
          <v-list-item-title class="headline">
            <strong class="display-1">{{ stat.value }}</strong>
          </v-list-item-title>
          <v-list-item-subtitle class="pb-5">
            <small>{{ stat.description }}</small>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Stat",
  props: {
    stats: {
      type: Array,
    },
  },
};
</script>

<style>
</style>