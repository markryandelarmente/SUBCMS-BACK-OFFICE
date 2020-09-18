<template>
  <v-row>
    <!-- <v-col md="2" sm="12">
      <v-select
        prepend-icon="mdi-filter-outline"
        v-model="contents.filter.type"
        :items="computedTypes"
        label="Types"
      ></v-select>
    </v-col>-->
    <v-col md="2" sm="12">
      <v-select
        prepend-icon="mdi-filter-outline"
        :append-outer-icon="contents.filter.category ? 'mdi-close' : ''"
        @click:append-outer="contents.filter.category = ''"
        :items="categories"
        v-model="contents.filter.category"
        label="CATEGORIES"
      ></v-select>
    </v-col>
    <v-col md="9" sm="10">
      <v-sheet>
        <v-chip-group v-model="selected_tags" @change="test" multiple active-class="primary--text">
          <v-chip outlined v-for="(tag, index) in tags" :key="index" class="ma-2">{{ tag.label }}</v-chip>
        </v-chip-group>
      </v-sheet>
    </v-col>
    <v-col md="1" sm="2">
      <v-toolbar elevation="0">
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click="
              $router.push({
                name: 'content_create',
                query: {
                  id: 2,
                  text: 'VIDEOS',
                },
              })
            "
        >
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
    </v-col>
    <v-col cols="12" v-if="loading">
      <v-progress-linear indeterminate color="primary"></v-progress-linear>
    </v-col>
    <v-col cols="12">
      <v-row v-if="contents.data && contents.data.length">
        <v-col v-for="(content, index) in contents.data" :key="index" md="2" sm="6" xs="12">
          <v-card
            elevation="1"
            max-width="380"
            min-height="400"
            @click="viewContent(content.content_type.name, content.id)"
          >
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
                  <v-icon small class="mr-1">mdi-dots-vertical</v-icon>
                </v-row>
              </v-list-item>
            </v-card-actions>

            <v-card-text class="text--secondary pt-0">
              <div class="font-weight-medium">{{ content.title }}</div>

              <small class="font-weight-light">{{ cutDescription(content.description) }}...</small>
              <br />
              <small class="font-weight-thin">2months ago</small>
            </v-card-text>

            <v-card-actions>
              <v-chip outlined>
                <v-icon small>
                  {{
                  renderCardIcon(content.content_type.id)
                  }}
                </v-icon>
                <span class="subtitle-2 font-weight-light ml-1">
                  {{
                  content.content_type.name
                  }}
                </span>
              </v-chip>
              <v-spacer></v-spacer>
              <v-icon small :color="content.is_free == 'FREE' ? 'success' : 'default'">
                {{
                content.is_free == "FREE"
                ? "mdi-check-circle-outline"
                : "mdi-lock-open-outline"
                }}
              </v-icon>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <h2 class="font-weight-regular" v-if="!loading">No content</h2>
      </v-row>
    </v-col>

    <!-- SELECT CONTENT MODAL -->
    <v-dialog v-model="content_type.dialog" scrollable max-width="400px">
      <v-card>
        <v-card-title>Select type of content</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 200px;">
          <v-radio-group v-model="content_type.selected" column>
            <v-radio
              v-for="(type, index) in computedContentTypes"
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
          <v-btn color="primary" text>Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- VIEW VIDEO MODAL -->
    <v-dialog v-model="content.video_dialog" width="1200">
      <v-card elevation="0">
        <v-card-title class="headline"></v-card-title>
        <v-card-text>
          <v-row>
            <v-col md="12" sm="12" class="text-center">
              <vue-plyr>
                <video controls :src="content && content.video_url"></video>
              </vue-plyr>
            </v-col>
            <v-col md="12">
              <v-row>
                <v-col md="12" sm="12">
                  <span
                    v-for="tag in content.data.tags"
                    :key="tag.id"
                    class="mx-1"
                  >{{ "#" + tag.tag.name}}</span>
                </v-col>
                <v-col md="10" sm="10" class="py-0">
                  <h1 class="font-weight-regular" style="color: black">{{ content.data.title }}</h1>
                </v-col>
                <v-col md="2" sm="2" class="text-right py-0">
                  <v-spacer></v-spacer>
                  <v-icon medium>mdi-dots-vertical</v-icon>
                </v-col>

                <v-col md="12" sm="12" class="py-0">
                  <v-list-item class="list-item">
                    <v-card-subtitle class="pl-0">
                      <v-icon medium>mdi-heart-outline</v-icon>&nbsp; 200
                      <span class="mx-2"></span>
                      <v-icon medium>mdi-message-outline</v-icon>&nbsp; 16
                      <span class="mx-2"></span>
                      <v-icon medium>mdi-eye-outline</v-icon>&nbsp; 16K
                    </v-card-subtitle>
                  </v-list-item>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col md="12" sm="12" class="mt-3">
                  <span class="font-weight-regular">{{ content.data.description }}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary darken-1" text @click="editContent(content.data.id)">
            <v-icon small class="mr-1">mdi-pencil-outline</v-icon>Edit
          </v-btn>
          <v-btn color="secondary darken-1" text @click="content.video_dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- VIEW ARTICLE MODAL -->
    <v-dialog v-model="content.article_dialog" persistent width="1200">
      <v-card elevation="0">
        <v-card-title class="headline"></v-card-title>
        <v-card-text>
          <h1>ARTICLE VIEW HERE</h1>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary darken-1" text @click="content.article_dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- VIEW PROGRAM MODAL -->
    <v-dialog v-model="content.program_dialog" persistent width="1200">
      <v-card elevation="0">
        <v-card-title class="headline"></v-card-title>
        <v-card-text>
          <h1>PROGRAM VIEW HERE</h1>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary darken-1" text @click="content.program_dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { CONTENTS_QUERY, CONTENT_QUERY } from "@/graphql/content.js";
import { TAGS_QUERY } from "@/graphql/tag.js";
import { CATEGORIES_QUERY } from "@/graphql/category.js";
export default {
  data: () => ({
    server_url: process.env.VUE_APP_SERVER_URL,
    loading: true,
    tags: [],
    selected_tags: [],
    categories: [],
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
        tags: [],
        category: "",
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
    content: {
      video_dialog: false,
      article_dialog: false,
      program_dialog: false,
      data: {
        title: "",
        description: "",
        is_free: "",
        image: {
          id: null,
          url: "",
        },
      },
    },
  }),
  mounted() {
    this.fetchTags();
    this.fetchCategories();
  },
  created() {
    this.fetchContents();
  },
  methods: {
    test() {
      let selected_tags = this.selected_tags;
      let tags = [];
      selected_tags.forEach((tag) => {
        tags.push(this.tags[tag]);
      });
      let ids = tags.map((tag) => {
        return tag.value;
      });
      this.contents.filter.tags = ids;
    },
    fetchTags() {
      this.$apollo
        .query({
          query: TAGS_QUERY,
        })
        .then(({ data }) => {
          this.tags = data.tags_all.map((tag) => {
            return {
              label: tag.name,
              value: tag.id,
            };
          });
        });
    },
    fetchCategories() {
      this.$apollo
        .query({
          query: CATEGORIES_QUERY,
        })
        .then(({ data }) => {
          this.categories = data.categories_all.map((cat) => {
            return {
              text: cat.name,
              value: cat.name,
            };
          });
        });
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
    fetchContents() {
      this.$apollo
        .query({
          query: CONTENTS_QUERY,
          variables: { query: { ...this.computedFilter } },
        })
        .then(({ data }) => {
          this.contents.filter.page = data.contents.current_page;
          this.contents.total = data.contents.total;
          this.contents.loading = false;
          this.loading = false;
          this.contents.data = data.contents.data;
        });
    },
    async fetchContent(id) {
      await this.$apollo
        .query({
          query: CONTENT_QUERY,
          variables: { id: id },
        })
        .then(({ data }) => {
          this.content.data = data.content;
          this.content.resources = data.content.content_resource_types.map(
            (content_resource_type) => {
              return {
                resources: content_resource_type.content_resources.map(
                  (content_resource) => {
                    return {
                      ...content_resource.resource,
                    };
                  }
                ),
              };
            }
          );
          this.content.video_url = this.content.resources[0].resources[0].content;
          this.content.resource_id = this.content.resources[0].resources[0].id;
          this.$forceUpdate();
        });
    },
    cutDescription(str) {
      return str ? str.split(" ").splice(0, 4).join(" ") : "";
    },
    async viewContent(type, content_id) {
      const VIDEO = "VIDEO";
      const ARTICLE = "ARTICLE";
      const PROGRAM = "PROGRAM";
      if (type == VIDEO) {
        await this.fetchContent(content_id);
        this.content.video_dialog = true;
      } else if (type == ARTICLE) {
        this.content.article_dialog = true;
      } else if (type == PROGRAM) {
        this.content.program_dialog = true;
      }
    },
    editContent(content_id) {
      this.$router.push({
        name: "content_create",
        query: {
          id: 2,
          text: "VIDEOS",
          content_id: content_id,
          resource_id: this.content.resource_id,
        },
      });
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
    computedContentTypes: function () {
      return this.content_type.items.map(function (item) {
        return {
          ...item,
          text: item.text.slice(0, -1),
        };
      });
    },
  },
  watch: {
    contents: {
      handler: function () {
        this.fetchContents();
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
