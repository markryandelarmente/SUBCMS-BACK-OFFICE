<template>
  <v-row>
    <v-col md="12">
      <v-card elevation="0" class="rounded-lg">
        <v-toolbar elevation="0" class="mb-1">
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
          <v-btn icon @click="createData()">
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
          <template v-slot:item.action="{ item }">
            <v-btn icon color="success" @click="editData(item.action.value)">
              <v-icon small>mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn
              icon
              color="error"
              @click="openDeleteModal(item.id)"
              :disabled="table.selected && table.selected.length ? true : false"
            >
              <v-icon small>mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <div class="text-center mt-5 mb-5">
          <v-pagination
            v-if="table.data && table.data.length"
            v-model="table.filter.page"
            :length="table.pageCount"
            :total-visible="10"
          ></v-pagination>
        </div>
        <v-dialog v-model="deleteDialog.activate" persistent max-width="400">
          <v-card>
            <v-card-title class="headline">
              Are you sure you want to delete
              {{ deleteDialog.text }}?
            </v-card-title>
            <v-card-text>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut,
              laborum.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="deleteDialog.activate = false">Cancel</v-btn>
              <v-btn
                color="primary"
                text
                @click="
              table.selected && table.selected.length
                ? deleteMultipleUser()
                : deleteSingleUser()
            "
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
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    table: {
      tool_bar: {
        search_expanded: false,
      },
      height: 650,
      time: 0,
      loading: false,
      total: 10,
      pageCount: 0,
      filter: {
        count: 20,
        page: 1,
        order: "desc",
        column: "created_at",
        keyword: "",
      },
      selected: [],
      data: [
        {
          image: "Frozen Yogurt",
          name: 159,
          action: {
            text: "ACTION",
            value: 1,
          },
        },
        {
          image: "Frozen Yogurt",
          name: 159,
          action: {
            text: "ACTION",
            value: 1,
          },
        },
        {
          image: "Frozen Yogurt",
          name: 159,
          action: {
            text: "ACTION",
            value: 1,
          },
        },
        {
          image: "Frozen Yogurt",
          name: 159,
          action: {
            text: "ACTION",
            value: 1,
          },
        },
        {
          image: "Frozen Yogurt",
          name: 159,
          action: {
            text: "ACTION",
            value: 1,
          },
        },
        {
          image: "Frozen Yogurt",
          name: 159,
          action: {
            text: "ACTION",
            value: 1,
          },
        },
        {
          image: "Frozen Yogurt",
          name: 159,
          action: {
            text: "ACTION",
            value: 1,
          },
        },
      ],
    },
    deleteDialog: {
      activate: false,
      user_id: null,
      text: "",
    },
    toaster: {
      activate: false,
      text: "",
    },
  }),
  created() {},
  methods: {
    sortData() {},
    createData() {},
    editData() {},
    openDeleteModal() {},
    deleteSingleData() {},
    deleteMultipleData() {},
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
          title: "Title",
        },
        headers: [
          {
            text: "IMAGE",
            align: "center",
            sortable: false,
            value: "image",
          },
          {
            text: "NAME",
            align: "center",
            sortable: false,
            value: "name",
          },

          {
            text: "ACTION",
            align: "end",
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

<style>
</style>
