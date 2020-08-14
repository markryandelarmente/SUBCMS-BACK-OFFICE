<template>
  <v-container class="fill-height" fluid>
    <v-row align="start">
      <v-col md="12" sm="12">
        <v-tabs>
          <v-tab>
            <strong>USERS</strong>
          </v-tab>
          <v-tab>
            <strong>ROLES</strong>
          </v-tab>
          <v-tab>
            <strong>TICKETS</strong>
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col md="2">
        <Stat :stats="stats" />
      </v-col>

      <v-col md="9" class="text-center mt-5">
        <v-card outlined>
          <v-card-title>
            <v-icon class="mr-3">mdi-format-list-bulleted</v-icon>Users
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="filter.keyword"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-model="selected"
            :loading="loading"
            loading-text="Loading. . .Please wait"
            light
            :search="filter.keyword"
            :headers="users.headers"
            :items="users.data"
            :server-items-length="total"
            :items-per-page="filter.count"
            @page-count="pageCount = $event"
            show-select
            hide-default-footer
            :height="600"
          >
            <template v-slot:header.profile_image="{ header }">{{ header.text.toUpperCase() }}</template>
            <template v-slot:header.email="{ header }">{{ header.text.toUpperCase() }}</template>
            <template v-slot:header.firstname="{ header }">{{ header.text.toUpperCase() }}</template>
            <template v-slot:header.lastname="{ header }">{{ header.text.toUpperCase() }}</template>
            <template v-slot:header.created_at="{ header }">{{ header.text.toUpperCase() }}</template>
            <template v-slot:header.action="{ header }">{{ header.text.toUpperCase() }}</template>
            <template v-slot:item.profile_image="{ item }">
              <v-avatar size="30" class="mx-auto">
                <img
                  src="https://jgi.doe.gov/wp-content/uploads/2014/04/Steven_Hallam-slide.jpg"
                  :alt="item.firstname"
                />
              </v-avatar>
            </template>
          </v-data-table>
          <div class="text-center">
            <v-pagination v-model="filter.page" :length="pageCount" :total-visible="10"></v-pagination>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { USERS_QUERY } from "@/graphql/user.js";
import Stat from "../../global/_stat";
export default {
  name: "UserIndex",
  components: {
    Stat,
  },
  data: () => ({
    time: 0,
    loading: true,
    total: 0,
    pageCount: 0,
    selected: [],
    filter: {
      role: "user",
      count: 20,
      page: 1,
      order: "asc",
      column: "created_at",
      keyword: "",
    },
    search: "",
    users: {
      headers: [
        {
          text: "Profile",
          align: "start",
          sortable: false,
          value: "profile_image",
        },
        { text: "Email", value: "email" },
        { text: "Firstname", value: "firstname" },
        { text: "Lastname", value: "lastname" },
        { text: "Registed at", value: "created_at" },
        { text: "Action", value: "action" },
      ],
      data: [],
    },
    stats: [
      {
        icon: "mdi-account-arrow-right-outline",
        text: "Total",
        value: "10000",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, cumque?",
      },
      {
        icon: "mdi-account-check-outline",
        text: "Active now",
        value: "102",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, cumque?",
      },
      {
        icon: "mdi-clipboard-alert-outline",
        text: "Pending Tickets",
        value: "23",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, cumque?",
      },
      {
        icon: "mdi-clipboard-check-outline",
        text: "Solved Tickets",
        value: "78",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, cumque?",
      },
    ],
  }),
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$apollo
        .query({
          query: USERS_QUERY,
          variables: { query: { ...this.filter } },
        })
        .then(({ data }) => {
          this.filter.page = data.users.current_page;
          this.total = data.users.total;
          this.loading = false;
          this.users.data = data.users.data.map((user) => {
            return {
              ...user,
              action: "action",
            };
          });
        });
    },
  },
  watch: {
    "filter.page": function (val) {
      val;
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        this.getUsers();
      }, 1000);
    },
    "filter.keyword": function (val) {
      val;
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        this.filter.page = 1;
        this.getUsers();
      }, 1000);
    },
  },
};
</script>

<style></style>
