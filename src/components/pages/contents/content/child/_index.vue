<template>
  <v-row>
    <v-col md="1" sm="12">
      <v-select v-model="contents.filter.type" :items="computedTypes" label="Types"></v-select>
    </v-col>
    <v-col md="9" sm="10">
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
    <v-col cols="12">
      <v-row v-if="contents.data && contents.data.length">
        <v-col v-for="(content, index) in contents.data" :key="index" md="2" sm="6" xs="12">
          <v-card elevation="1" max-width="380" min-height="400">
            <v-img
              class="grey lighten-2"
              height="200px"
              :src="content.image.url"
              :lazy-src="content.image.url"
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
              <div class="font-weight-medium">{{ content.title }}</div>

              <div class="font-weight-light">{{ cutDescription(content.description) }}...</div>
              <div class="font-weight-thin">2months ago</div>
            </v-card-text>

            <v-card-actions>
              <v-chip outlined>
                <v-icon small>{{ renderCardIcon(content.content_type.id) }}</v-icon>
                <span class="subtitle-2 font-weight-light ml-1">{{ content.content_type.name }}</span>
              </v-chip>
              <v-spacer></v-spacer>
              <v-icon
                small
                :color="content.is_free == 'FREE' ? 'success': 'default'"
              >{{ content.is_free == "FREE" ? 'mdi-check-circle-outline': 'mdi-lock-open-outline' }}</v-icon>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <h2 class="font-weight-regular">No content</h2>
      </v-row>
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
import { CONTENTS_QUERY } from "@/graphql/content.js";
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
          text: "PROGRAMS",
        },
        {
          id: 2,
          text: "VIDEOS",
        },
        {
          id: 3,
          text: "ARTICLES",
        },
      ],
    },
    contents: {
      filter: {
        type: 0,
        page: 1,
        order: "desc",
        column: "created_at",
        keyword: "",
      },
      loading: false,
      total: 0,
      pageCount: 0,
      data: [],
    },
  }),
  created() {
    this.fetchData();
  },
  methods: {
    alarm() {},
    selectType() {
      console.log("hey");
    },
    renderCardIcon: function (id) {
      if (id == 1) {
        return "mdi-video-plus-outline";
      } else if (id == 2) {
        return "mdi-video-outline";
      } else {
        return "mdi-post-outline";
      }
    },
    fetchData() {
      this.$apollo
        .query({
          query: CONTENTS_QUERY,
          variables: { query: { ...this.computedFilter } },
        })
        .then(({ data }) => {
          this.contents.filter.page = data.contents.current_page;
          this.contents.total = data.contents.total;
          this.contents.loading = false;
          this.contents.data = data.contents.data;
        });
    },
    cutDescription(str) {
      return str ? str.split(" ").splice(0, 4).join(" ") : "";
    },
  },
  computed: {
    computedFilter: function () {
      return Object.assign({}, this.contents.filter);
    },
    computedTypes: function () {
      let items = this.content_type.items.map((type) => {
        return {
          text: type.text,
          value: type.id,
        };
      });
      items.push({
        text: "ALL",
        value: 0,
      });
      return items.sort((a, b) => {
        var textA = a.text.toUpperCase();
        var textB = b.text.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    },
  },
  watch: {
    contents: {
      handler: function () {
        this.fetchData();
      },
      deep: true,
    },
  },
};
</script>

<style>
.list-item {
  padding: 5px;
}
</style>
