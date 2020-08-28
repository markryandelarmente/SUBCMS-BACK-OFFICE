<template>
  <v-row>
    <v-col md="2">
      <Stat :stats="stats" />
    </v-col>
    <v-col md="9" class="text-center mt-5">
      <router-view></router-view>
    </v-col>
  </v-row>
</template>

<script>
import Stat from "../../../global/_stat";
export default {
  name: "UserIndex",
  components: {
    Stat,
  },
  data: () => ({}),
  created() {},
  methods: {},
  computed: {
    stats: function() {
      return [
        {
          icon: "mdi-account-arrow-right-outline",
          text: `${this.$t("user_group.user._index.stat.total")}`,
          value: `1000`,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, cumque?",
        },
        {
          icon: "mdi-account-check-outline",
          text: `${this.$t("user_group.user._index.stat.active_now")}`,
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
  watch: {},
};
</script>

<style></style>
