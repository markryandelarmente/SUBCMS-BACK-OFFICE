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
  computed: {},
  watch: {},
};
</script>

<style></style>
