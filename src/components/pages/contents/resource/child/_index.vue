<template>
  <v-row>
    <v-col md="2">
      <v-select prepend-icon="mdi-filter-outline" :items="items" label="Filter"></v-select>
    </v-col>
    <v-col md="2">
      <v-text-field label="Seach">
        <v-icon slot="prepend">mdi-magnify</v-icon>
      </v-text-field>
    </v-col>
    <v-col md="2">
      <v-text-field label="Date uploaded">
        <v-icon slot="prepend">mdi-calendar-outline</v-icon>
      </v-text-field>
    </v-col>
    <v-col md="12">
      <v-card elevation="0">
        <v-container fluid>
          <v-row>
            <v-col class="d-flex child-flex" cols="1">
              <v-icon large @click="test">mdi-plus</v-icon>
            </v-col>
            <v-col v-for="n in 50" :key="n" class="d-flex child-flex" cols="1">
              <v-card flat tile class="d-flex">
                <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    items: ["Videos", "Photos"],
  }),
  created() {},
  methods: {
    test() {},
  },
  computed: {},
  watch: {},
};
</script>

<style>
</style>
