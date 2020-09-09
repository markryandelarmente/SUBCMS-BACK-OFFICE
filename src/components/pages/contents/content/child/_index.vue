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
        <v-btn icon @click="content_type.dialog = true">
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
    </v-col>
    <v-col v-for="n in 10" :key="n" class="d-flex child-flex" md="2" sm="6">
      <v-card elevation="1" max-width="400">
        <v-img
          class="grey lighten-2"
          height="200px"
          :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
          aspect-ratio="1"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>

        <v-card-actions class="pb-0">
          <v-list-item class="list-item">
            <v-card-subtitle class="pl-0">
              <v-icon small>mdi-heart-outline</v-icon>&nbsp; 200
              <span class="mx-2"></span>
              <v-icon small>mdi-message-outline</v-icon>&nbsp; 16
              <span class="mx-2"></span>
              <v-icon small>mdi-eye-outline</v-icon>&nbsp; 16K
            </v-card-subtitle>

            <v-row justify="end">
              <span class="mr-1">·</span>
              <v-icon @click="alarm" small class="mr-1">mdi-dots-vertical</v-icon>
            </v-row>
          </v-list-item>
        </v-card-actions>

        <v-card-text class="text--secondary pt-0">
          <div class="font-weight-medium">Upper body workout</div>

          <div class="font-weight-light">Lorem ipsum dolor sit amet consectetur ...</div>
          <div class="font-weight-thin">2months ago</div>
        </v-card-text>

        <v-card-actions>
          <v-chip outlined>
            <v-icon small>mdi-video-outline</v-icon>
            <span class="subtitle-2 font-weight-light ml-1">Program</span>
          </v-chip>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-dialog v-model="content_type.dialog" scrollable max-width="400px">
      <v-card>
        <v-card-title>Select type of content</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 200px;">
          <v-radio-group v-model="content_type.selected" column>
            <v-radio
              v-for="(type, index) in content_type.items"
              :key="index"
              :label="type.text"
              :value="type"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="content_type.dialog = false">Close</v-btn>
          <v-btn color="primary" text @click="$router.push({ name: 'content_create' })">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    content_type: {
      dialog: false,
      selected: "",
      items: [
        {
          id: 1,
          text: "Video",
        },
        {
          id: 2,
          text: "Article",
        },
        {
          id: 3,
          text: "Program",
        },
      ],
    },
  }),
  created() {},
  methods: {
    alarm() {},
    selectType() {
      console.log("hey");
    },
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
