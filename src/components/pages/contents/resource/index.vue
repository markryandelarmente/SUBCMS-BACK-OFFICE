<template>
  <v-row>
    <v-col md="2" sm="12">
      <Stat />
    </v-col>
    <v-col md="10" sm="12">
      <router-view></router-view>
    </v-col>
  </v-row>
</template>

<script>
import Stat from "../../../global/_resource_stat";
export default {
  data: () => ({}),
  components: {
    Stat,
  },
  created() {},
  methods: {},
  computed: {
    stats: function() {
      return [
        {
          icon: "mdi-video-outline",
          text: "Videos",
          value: `32`,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, cumque?",
        },
        {
          icon: "mdi-image-outline",
          text: "Images",
          value: "102",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, cumque?",
        },
        {
          icon: "mdi-cloud-outline",
          text: "Storage",
          value: "34",
          subtitle: "GB",
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
