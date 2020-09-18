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
          <v-btn icon @click="openCreateModal()">
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
          <template v-slot:item.image="{ item }">
            <v-avatar size="50" class="mx-auto my-1">
              <img :src="item.image" />
            </v-avatar>
          </template>
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
                ? deleteMultipleData()
                : deleteSingleData()
            "
              >Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="editDialog.activate" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Create Category</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editDialog.data.name" label="Name *" required></v-text-field>
                  </v-col>
                  <v-col cols="12" class="d-flex">
                    <input
                      type="file"
                      style="display:none;"
                      ref="FileInputThumbnail"
                      accept="image/*"
                      @change="uploadThumbnail"
                    />
                    <div class="text-center file-input__dotted" @click="triggerFileInputThumbnail">
                      <v-icon size="50" class="my-5">mdi-image-plus</v-icon>Upload
                    </div>
                    <div class="text-center mx-2 mb-3 file-input__border">
                      <img
                        v-if="editDialog.data.image_preview"
                        :src="editDialog.data.image_preview"
                        class="image_preview"
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="editDialog.activate = false">Close</v-btn>
              <v-btn
                v-if="editDialog.is_edit"
                color="primary darken-1"
                text
                @click="updateData"
              >Update</v-btn>
              <v-btn v-else color="primary darken-1" text @click="createData()">Save</v-btn>
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
import {
  CATEGORIES_PAGINATED_QUERY,
  CATEGORY_QUERY,
  CATEGORY_STORE_MUTATION,
  CATEGORY_UPDATE_MUTATION,
  CATEGORY_DELETE_MUTATION,
} from "@/graphql/category.js";
export default {
  data: () => ({
    table: {
      tool_bar: {
        search_expanded: false,
      },
      height: 650,
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
      id: null,
      text: "",
    },
    editDialog: {
      is_edit: false,
      activate: false,
      data: {
        id: "",
        name: "",
        image: "",
        image_preview: "",
      },
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
    // fetch data
    fetchData() {
      this.$apollo
        .query({
          query: CATEGORIES_PAGINATED_QUERY,
          variables: { query: { ...this.computedFilter } },
        })
        .then(({ data }) => {
          this.table.filter.page = data.categories.current_page;
          this.table.total = data.categories.total;
          this.table.loading = false;
          let items = data.categories.data.map((cat) => {
            return {
              ...cat,
              image: cat.image.url,
              action: {
                text: "ACTION",
                value: cat.id,
              },
            };
          });
          this.table.data = items;
        });
    },
    // sorting
    sortData(val) {
      let column = val.sortBy[0];
      let order = val.sortDesc[0] == true ? "desc" : "asc";
      if (column && order) {
        this.table.filter.column = column;
        this.table.filter.order = order;
      }
    },
    // create data
    openCreateModal() {
      this.editDialog.activate = true;
      this.editDialog.is_edit = false;
      if (this.editDialog.data.id) {
        this.editDialog.data = {
          id: "",
          name: "",
          image: "",
          image_preview: "",
        };
      }
    },
    createData() {
      this.editDialog.activate = true;
      this.editDialog.is_edit = false;
      this.$apollo
        .mutate({
          mutation: CATEGORY_STORE_MUTATION,
          variables: {
            input: {
              name: this.editDialog.data.name,
              image: this.editDialog.data.image,
            },
          },
        })
        .then(() => {
          this.editDialog.activate = false;
          this.fetchData();
          this.editDialog.data = {
            id: "",
            name: "",
            image: "",
            image_preview: "",
          };
        })
        .catch(() => {
          // error logs here
        });
    },
    // edit data
    editData(id) {
      this.$apollo
        .query({
          query: CATEGORY_QUERY,
          variables: { id: id },
        })
        .then(({ data }) => {
          this.editDialog.is_edit = true;
          this.editDialog.activate = true;
          this.editDialog.data.id = data.category.id;
          this.editDialog.data.name = data.category.name;
          this.editDialog.data.image_preview = data.category.image.url;
          this.editDialog.data.image_url = data.category.image.url;
        });
    },
    updateData() {
      // create image from link
      async () => {
        const response = await fetch(this.editDialog.data.image_preview);
        // here image is url/location of image
        const blob = await response.blob();
        this.editDialog.data.image = new File([blob], "image.jpg", {
          type: blob.type,
        });
      };
      this.$apollo
        .mutate({
          mutation: CATEGORY_UPDATE_MUTATION,
          variables: {
            input: {
              id: this.editDialog.data.id,
              name: this.editDialog.data.name,
              image: this.editDialog.data.image,
              image_url: this.editDialog.data.image_url,
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
    triggerFileInputThumbnail() {
      this.$refs.FileInputThumbnail.click();
    },
    uploadThumbnail(e) {
      let photo = e.target.files[0] || e.dataTransfer.files[0];
      this.editDialog.data.image = photo;
      this.editDialog.data.image_preview = URL.createObjectURL(photo);
      this.editDialog.data.image_url = "";
    },
    // delete data
    openDeleteModal(ids) {
      this.deleteDialog = {
        activate: true,
        id: ids,
        text: ids.length > 1 ? "categories" : "category",
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
          mutation: CATEGORY_DELETE_MUTATION,
          variables: {
            ids: ids,
          },
        })
        .then(() => {
          this.fetchData();
          this.toaster = {
            activate: true,
            text: ids.length > 1 ? "Categories deleted!" : "Category deleted!",
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
          title: "Categories",
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
            sortable: true,
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

<style scoped>
.file-input__border {
  height: 100px;
  width: 200px;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
}
.image_preview {
  height: 100px;
  width: 200px;
  object-fit: cover;
}
</style>
