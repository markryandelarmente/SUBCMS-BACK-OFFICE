<template>
  <v-row>
    <v-col md="10" sm="10">
      <v-sheet>
        <v-chip-group active-class="primary--text">
          <v-chip
            @click="alarm"
            outlined
            v-for="(category, index) in categories"
            :key="index"
            class="ma-2"
          >{{ category.label }}</v-chip>
        </v-chip-group>
      </v-sheet>
    </v-col>
    <v-col md="2" sm="2">
      <v-toolbar elevation="0">
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
    </v-col>
    <v-col v-for="n in 10" :key="n" class="d-flex child-flex" md="2" sm="6">
      <v-card elevation="1" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
          aspect-ratio="1"
        ></v-img>

        <v-card-actions class="pb-0">
          <v-list-item class="list-item">
            <v-card-subtitle class="pl-0">
              <v-icon small>mdi-heart-outline</v-icon>&nbsp; 200
              <span class="mx-3"></span>
              <v-icon small>mdi-message-outline</v-icon>&nbsp; 16
            </v-card-subtitle>

            <v-row justify="end">
              <span class="mr-1">·</span>
              <v-icon @click="alarm" small class="mr-1">mdi-dots-vertical</v-icon>
            </v-row>
          </v-list-item>
        </v-card-actions>

        <v-card-text class="text--secondary pt-0">
          <div class="font-weight-medium">Upper body workout</div>

          <div class="font-weight-light">2months ago</div>
        </v-card-text>

        <v-card-actions></v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    categories: [
      {
        label: "Leg",
      },
      {
        label: "Arm",
      },
      {
        label: "Chest",
      },
      {
        label: "Shoulder",
      },
      {
        label: "Back",
      },
      {
        label: "Leg",
      },
      {
        label: "Arm",
      },
      {
        label: "Chest",
      },
      {
        label: "Shoulder",
      },
      {
        label: "Back",
      },
      {
        label: "Leg",
      },
      {
        label: "Arm",
      },
      {
        label: "Chest",
      },
      {
        label: "Shoulder",
      },
      {
        label: "Back",
      },
      {
        label: "Leg",
      },
      {
        label: "Arm",
      },
      {
        label: "Chest",
      },
      {
        label: "Shoulder",
      },
      {
        label: "Back",
      },
      {
        label: "Leg",
      },
      {
        label: "Arm",
      },
      {
        label: "Chest",
      },
      {
        label: "Shoulder",
      },
      {
        label: "Back",
      },
      {
        label: "Arm",
      },
      {
        label: "Chest",
      },
      {
        label: "Shoulder",
      },
      {
        label: "Back",
      },
      {
        label: "Leg",
      },
      {
        label: "Arm",
      },
      {
        label: "Chest",
      },
      {
        label: "Shoulder",
      },
      {
        label: "Back",
      },
    ],
  }),
  created() {},
  methods: {
    alarm() {},
  },
  computed: {},
  watch: {},
};
</script>

<style>
.list-item {
  padding: 5px;
}
</style>