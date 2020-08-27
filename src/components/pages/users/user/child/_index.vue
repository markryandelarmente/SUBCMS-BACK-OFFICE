<template>
  <v-card outlined>
    <v-toolbar elevation="0" class="mt-3">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{ computedTable.tool_bar.title }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon @click="table.tool_bar.search_expanded = true">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-expand-x-transition>
        <div v-show="table.tool_bar.search_expanded" style="width:400px">
          <v-text-field
            light
            v-model="table.filter.keyword"
            :label="computedTable.search.label"
            single-line
            hide-details
          ></v-text-field>
        </div>
      </v-expand-x-transition>
      <v-btn icon @click="$router.push({ name: 'user_create' })">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn icon :disabled="!table.total">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table
      v-model="table.selected"
      :loading="table.loading"
      :loading-text="computedTable.loading.label"
      light
      fixed-header
      :search="table.filter.keyword"
      :headers="computedTable.headers"
      :items="table.data"
      :server-items-length="table.total"
      :items-per-page="table.filter.count"
      @page-count="table.pageCount = $event"
      @update:options="sortData"
      show-select
      hide-default-footer
      :height="table.height"
    >
      <template v-slot:item.action="{ item }">
        <v-btn icon color="success" @click="edit(item.action.value)">
          <v-icon small>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn icon color="error">
          <v-icon small>mdi-trash-can-outline</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.profile_image="{ item }">
        <v-avatar size="30" class="mx-auto">
          <img :src="item.profile_image" :alt="item.firstname" />
        </v-avatar>
      </template>
    </v-data-table>
    <div class="text-center mt-5 mb-5">
      <v-pagination v-model="table.filter.page" :length="table.pageCount" :total-visible="10"></v-pagination>
    </div>
  </v-card>
</template>

<script>
import { USERS_QUERY } from "@/graphql/user.js";
export default {
  data: () => ({
    table: {
      tool_bar: {
        search_expanded: false,
        title: "Users",
      },
      height: 600,
      time: 0,
      loading: true,
      total: 0,
      pageCount: 0,
      filter: {
        role: "user",
        count: 20,
        page: 1,
        order: "desc",
        column: "created_at",
        keyword: "",
      },
      selected: [],
      data: [],
    },
  }),
  created() {
    this.fetchData();
  },
  methods: {
    edit(id) {
      this.$router.push({ name: "user_edit", params: { id: id } });
    },
    fetchData() {
      this.$apollo
        .query({
          query: USERS_QUERY,
          variables: { query: { ...this.computedFilter } },
        })
        .then(({ data }) => {
          this.table.filter.page = data.users.current_page;
          this.table.total = data.users.total;
          this.table.loading = false;
          let users = data.users.data.map((user) => {
            return {
              ...user,
              action: {
                text: "ACTION",
                value: user.id,
              },
            };
          });
          this.table.data = users;
          this.$store.commit("user/SET_USERS", data.users);
        });
    },
    sortData(val) {
      let column = val.sortBy[0];
      let order = val.sortDesc[0] == true ? "desc" : "asc";
      if (column && order) {
        this.table.filter.column = column;
        this.table.filter.order = order;
      }
    },
  },
  computed: {
    computedFilter: function () {
      return Object.assign({}, this.table.filter);
    },
    computedTable: function () {
      return {
        ...this.table,
        tool_bar: {
          ...this.table.tool_bar,
          title: `${this.$t("user_group.user._index.table.title")}`,
        },
        headers: [
          {
            text: `${this.$t("user_group.user._index.table.headers.profile")}`,
            align: "start",
            sortable: false,
            value: "profile_image",
          },
          {
            text: `${this.$t(
              "user_group.user._index.table.headers.firstname"
            )}`,
            value: "firstname",
          },
          {
            text: `${this.$t("user_group.user._index.table.headers.lastname")}`,
            value: "lastname",
          },
          {
            text: `${this.$t("user_group.user._index.table.headers.email")}`,
            value: "email",
          },
          {
            text: `${this.$t(
              "user_group.user._index.table.headers.registered_at"
            )}`,
            value: "created_at",
          },
          {
            text: `${this.$t("user_group.user._index.table.headers.action")}`,
            value: "action",
          },
        ],
        search: {
          label: `${this.$t("user_group.user._index.table.search")}`,
        },
        loading: {
          label: `${this.$t("user_group.user._index.table.loading")}`,
        },
      };
    },
  },
  watch: {
    computedFilter: {
      handler: function (newVal, oldVal) {
        clearTimeout(this.table.time);
        this.table.time = setTimeout(() => {
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
