<template>
  <v-row>
    <v-col md="2" sm="12">
      <Stat />
    </v-col>
    <v-col md="10" sm="12" class="text-center mt-5">
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
  computed: {},
  watch: {},
};
</script>

<style></style>
