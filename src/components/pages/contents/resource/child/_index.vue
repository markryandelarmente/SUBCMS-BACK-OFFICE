<template>
  <v-row>
    <v-col md="2" sm="12">
      <v-select
        prepend-icon="mdi-filter-outline"
        :append-outer-icon="filter.type ? 'mdi-close' : ''"
        @click:append-outer="filter.type = ''"
        v-model="filter.type"
        :items="options"
        label="Filter"
      ></v-select>
    </v-col>
    <v-col md="12" v-if="loading">
      <v-progress-linear indeterminate color="primary"></v-progress-linear>
    </v-col>
    <v-col md="12" v-else>
      <v-card elevation="0">
        <v-container fluid>
          <v-row>
            <v-col class="d-flex child-flex" cols="1">
              <v-icon large @click="$router.push({name: 'resource_create'})">mdi-plus</v-icon>
            </v-col>
            <v-col
              v-for="resource in resources"
              :key="resource.id"
              class="d-flex child-flex"
              cols="1"
            >
              <v-card flat tile class="d-flex" v-if="resource.resource_type.name == 'image'">
                <v-img
                  :src="resource.content"
                  :lazy-src="resource.content"
                  aspect-ratio="1"
                  class="grey lighten-2"
                ></v-img>
              </v-card>
              <v-card flat tile class="d-flex" v-else>
                <v-img
                  src="http://localhost:8181/images/contents/videos/1.jpeg"
                  :lazy-src="resource.content"
                  aspect-ratio="1"
                  class="grey lighten-2"
                ></v-img>
              </v-card>
            </v-col>
          </v-row>
          <v-row justify="end" v-if="pagination.totalPage && pagination.totalPage > 1">
            <v-col md="2" class="text-right mt-5 mr-0 pr-0">
              <v-btn icon large @click="paginateBack">
                <v-icon size="60">mdi-menu-left</v-icon>
              </v-btn>
              <v-btn icon large @click="paginateForward">
                <v-icon size="60">mdi-menu-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { RESOURCES_QUERY } from "@/graphql/resource.js";
export default {
  data: () => ({
    loading: false,
    time: 0,
    options: [
      { value: 2, text: "Video" },
      { value: 3, text: "Image" },
    ],
    resources: [],
    total: "",
    filter: {
      type: "",
      count: 59,
      page: 1,
      order: "desc",
      column: "created_at",
      keyword: "",
    },
    pagination: {
      totalPage: 0,
      paginateBack: false,
      paginateForward: false,
    },
  }),
  created() {
    this.fetchData();
  },
  methods: {
    test() {},
    fetchData() {
      this.loading = true;
      this.$apollo
        .query({
          query: RESOURCES_QUERY,
          variables: { query: { ...this.computedFilter } },
        })
        .then(({ data }) => {
          this.filter.page = data.resources.current_page;
          this.total = data.resources.total;
          this.pagination.totalPage = this.total / this.filter.count;
          this.loading = false;
          this.resources = data.resources.data.map((resource) => {
            return {
              ...resource,
              action: {
                text: "ACTION",
                value: resource.id,
              },
            };
          });
        });
    },
    paginateBack() {
      if (this.filter.page > 1) {
        this.filter.page--;
      }
    },
    paginateForward() {
      if (this.pagination.totalPage > this.filter.page) {
        this.filter.page++;
      }
    },
  },
  computed: {
    computedFilter: function () {
      return Object.assign({}, this.filter);
    },
  },
  watch: {
    computedFilter: {
      handler: function (newVal, oldVal) {
        clearTimeout(this.time);
        this.time = setTimeout(() => {
          if (newVal.keyword != oldVal.keyword) {
            newVal.page = 1;
          }
          this.fetchData();
        }, 800);
      },
      deep: true,
    },
  },
};
</script>

<style></style>