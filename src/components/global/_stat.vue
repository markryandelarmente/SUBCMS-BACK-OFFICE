<template>
  <v-row class="mt-2">
    <v-col v-for="stat in stats" :key="stat.icon + stat.value" md="12" sm="6">
      <v-card max-width="350" outlined class=" rounded-lg">
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
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Stat",
  props: {},
  computed: {
    stats: function() {
      return [
        {
          icon: "mdi-account-arrow-right-outline",
          text: `${this.$t("user_group.user._index.stat.total_subscribers")}`,
          value: `1000`,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, cumque?",
        },
        {
          icon: "mdi-account-check-outline",
          text: `${this.$t("user_group.user._index.stat.new_subscribers")}`,
          value: "102",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, cumque?",
        },
        {
          icon: "mdi-clipboard-alert-outline",
          text: `${this.$t("user_group.user._index.stat.pending_tickets")}`,
          value: "23",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, cumque?",
        },
        {
          icon: "mdi-clipboard-check-outline",
          text: `${this.$t("user_group.user._index.stat.solved_tickets")}`,
          value: "78",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, cumque?",
        },
      ];
    },
  },
};
</script>

<style></style>
