<template>
  <v-card elevation="0" class="rounded-lg">
    <v-toolbar elevation="0">
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
      <!-- <v-btn icon @click="$router.push({ name: 'user_create' })">
        <v-icon>mdi-plus</v-icon>
      </v-btn>-->
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
      <template v-slot:item.action="{ item }">
        <div style="width: 90px;">
          <v-btn icon color="success" @click="editData(item.id)">
            <v-icon small>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn
            icon
            color="error"
            :disabled="table.selected && table.selected.length ? true : false"
            @click="openDeleteModal(item.id)"
          >
            <v-icon small>mdi-trash-can-outline</v-icon>
          </v-btn>
        </div>
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
    <v-dialog v-model="editDialog.activate" persistent max-width="900">
      <v-card>
        <v-card-title>
          <span class="headline">Ticket</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <h3 class="font-weight-regular">
                  Issuer user:
                  <span
                    class="font-weight-medium ml-5"
                  >{{ editDialog.data.issuer_user.firstname + ' ' + editDialog.data.issuer_user.lastname }}</span>
                </h3>
                <h3 class="font-weight-regular mt-5">
                  Category:
                  <span class="font-weight-medium ml-5">{{ editDialog.data.category}}</span>
                </h3>
                <h3 class="font-weight-regular mt-5">
                  Issued on:
                  <span class="font-weight-medium ml-5">{{ editDialog.data.issued_on}}</span>
                </h3>
                <h3 class="font-weight-regular mt-5">
                  Status:
                  <span class="font-weight-medium ml-5">{{ editDialog.data.status}}</span>
                </h3>
              </v-col>
              <v-col cols="12">
                <h3 class="font-weight-regular mt-5">
                  Content:
                  <span class="font-weight-medium ml-5">{{ editDialog.data.content}}</span>
                </h3>
              </v-col>

              <v-col cols="12">
                <v-select :items="items" label="Assign to"></v-select>
              </v-col>
              <small class="mt-5 pt-5">* indicates required field</small>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="editDialog.activate = false">Close</v-btn>
          <v-btn color="primary darken-1" text @click="updateData">Save</v-btn>
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
import {
  TICKETS_QUERY,
  TICKET_QUERY,
  TICKET_UPDATE_MUTATION,
  TICKET_DELETE_MUTATION,
} from "@/graphql/ticket.js";
export default {
  data: () => ({
    table: {
      tool_bar: {
        search_expanded: false,
        title: "Tickets",
      },
      height: 650,
      time: 0,
      loading: true,
      total: 0,
      pageCount: 0,
      filter: {
        count: 20,
        page: 1,
        order: "asc",
        column: "status",
        keyword: "",
      },
      selected: [],
      data: [],
    },
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    editDialog: {
      is_edit: false,
      activate: false,
      data: {
        id: "",
        content: "",
        issuer_user: "",
        category: "",
        staus: "",
      },
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
    // edit data
    editData(id) {
      this.$apollo
        .query({
          query: TICKET_QUERY,
          variables: { id: id },
        })
        .then(({ data }) => {
          this.editDialog.is_edit = true;
          this.editDialog.activate = true;
          this.editDialog.data = {
            id: data.ticket.id,
            content: data.ticket.content,
            issued_on: data.ticket.created_at,
            issuer_user: {
              firstname: data.ticket.issuer_user.firstname,
              lastname: data.ticket.issuer_user.lastname,
            },
            category: data.ticket.ticket_category.name,
            status: data.ticket.status,
          };
        });
    },

    updateData() {
      this.$apollo
        .mutate({
          mutation: TICKET_UPDATE_MUTATION,
          variables: {
            input: {
              id: this.editDialog.data.id,
              content: this.editDialog.data.content,
            },
          },
        })
        .then(() => {
          this.editDialog.activate = false;
          this.fetchData();
        })
        .catch(() => {
          // error logs here
        });
    },
    // delete data
    openDeleteModal(ids) {
      this.deleteDialog = {
        activate: true,
        id: ids,
        text: ids.length > 1 ? "Tickets" : "Tickets",
      };
    },
    deleteSingleData() {
      this.deleteData([this.deleteDialog.id]);
      this.deleteDialog.activate = false;
    },
    deleteMultipleData() {
      this.deleteData(
        this.table.selected.map((data) => {
          return data.id;
        })
      );
      this.deleteDialog.activate = false;
    },
    deleteData(ids) {
      this.$apollo
        .mutate({
          mutation: TICKET_DELETE_MUTATION,
          variables: {
            ids: ids,
          },
        })
        .then(() => {
          this.fetchData();
          this.toaster = {
            activate: true,
            text: ids.length > 1 ? "Tickets deleted!" : "Ticket deleted!",
          };
          this.table.selected = [];
        })
        .catch(() => {});
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
            sortable: false,
          },
          {
            text: "CATEGORY",
            value: "ticket_category.name",
            sortable: false,
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

<style scoped>
.action-container {
  width: 200px;
}
</style>
