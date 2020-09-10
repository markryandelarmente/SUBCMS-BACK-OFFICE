<template>
  <v-row justify="center">
    <Program v-if="type == 1" />
    <Video v-else-if="type == 2" />
    <Article v-else />
  </v-row>
</template>

<script>
import Program from "./forms/_program";
import Video from "./forms/_video";
import Article from "./forms/_article";
export default {
  data: () => ({
    type: null,
  }),
  created() {
    this.checkQueryString();
  },
  components: {
    Program,
    Video,
    Article,
  },
  methods: {
    checkQueryString() {
      this.type = this.$route.query.id;
    },
  },
};
</script>

<style>
.remove-box-shadow {
  box-shadow: none;
}
</style>
