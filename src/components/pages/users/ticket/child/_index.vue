<template>
  <v-card outlined class="rounded-lg">
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
      <v-btn
        icon
        :disabled="table.selected && table.selected.length ? false : true"
        @click="openDeleteModal(table.selected)"
      >
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
      <template
        v-slot:item.content="{ item }"
      >{{ item.content.split(" ").splice(0, 12).join(" ") + ' . . .' }}</template>
      <template v-slot:item.status="{ item }">
        <v-chip outlined class="ma-2" :color="item.status == 'SOLVED' ? 'success' : 'info'">
          {{ item.status == 'SOLVED' ? 'Solved': 'Pending' }}
          <v-icon right>{{ item.status == 'SOLVED' ? 'mdi-check': 'mdi-progress-clock' }}</v-icon>
        </v-chip>
      </template>
      <template v-slot:item.action="{  }">
        <v-btn icon color="success">
          <v-icon small>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          color="error"
          :disabled="table.selected && table.selected.length ? true : false"
        >
          <v-icon small>mdi-trash-can-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <div class="text-center mt-5 mb-5" v-if="table.pageCount > 1">
      <v-pagination v-model="table.filter.page" :length="table.pageCount" :total-visible="10"></v-pagination>
    </div>
    <v-dialog v-model="deleteDialog.activate" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Are you sure you want to delete {{ deleteDialog.text }}?</v-card-title>
        <v-card-text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, laborum.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog.activate = false">Cancel</v-btn>
          <v-btn
            color="primary"
            text
            @click="table.selected && table.selected.length ? deleteMultipleData() : deleteSingleData()"
          >Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      color="success"
      v-model="toaster.activate"
      :timeout="2000"
      :bottom="true"
      :left="true"
      width="auto"
    >{{ toaster.text }}</v-snackbar>
  </v-card>
</template>

<script>
import { TICKETS_QUERY } from "@/graphql/ticket.js";
export default {
  data: () => ({
    table: {
      tool_bar: {
        search_expanded: false,
        title: "Tickets",
      },
      height: 800,
      time: 0,
      loading: true,
      total: 0,
      pageCount: 0,
      filter: {
        count: 20,
        page: 1,
        order: "desc",
        column: "created_at",
        keyword: "",
      },
      selected: [],
      data: [],
    },
    deleteDialog: {
      activate: false,
      ticket_id: null,
      text: "",
    },
    toaster: {
      activate: false,
      text: "",
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
          query: TICKETS_QUERY,
          variables: { query: { ...this.computedFilter } },
        })
        .then(({ data }) => {
          this.table.filter.page = data.tickets.current_page;
          this.table.total = data.tickets.total;
          this.table.loading = false;
          let tickets = data.tickets.data.map((ticket) => {
            return {
              ...ticket,
              action: {
                text: "ACTION",
                value: ticket.id,
              },
            };
          });
          this.table.data = tickets;
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
          title: "Tickets",
        },
        headers: [
          {
            text: "CONTENT",
            value: "content",
          },
          {
            text: "STATUS",
            value: "status",
          },
          {
            text: "CATEGORY",
            value: "ticket_category.name",
          },
          {
            text: "ISSUED DATE",
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
