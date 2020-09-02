<template>
  <v-row>
    <v-col md="2">
      <Stat />
    </v-col>
    <v-col md="9" class="text-center mt-5">
      <router-view></router-view>
    </v-col>
  </v-row>
</template>

<script>
import Stat from "../../../global/_stat";
export default {
  components: {
    Stat,
  },
  computed: {},
};
</script>

<style>
</style>