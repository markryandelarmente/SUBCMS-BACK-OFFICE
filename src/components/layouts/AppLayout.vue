<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-app-bar dark color="secondary" height="70" elevation="0" app clipped-right>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>SUBCMS</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar dark color="secondary" elevation="0" class="my-auto">
            <v-spacer></v-spacer>
            <v-btn icon class="mr-1" @click="tool_bar.search_expanded = true">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-expand-x-transition>
              <div v-show="tool_bar.search_expanded" style="width:400px">
                <v-text-field label="Start typing to search" single-line hide-details></v-text-field>
              </div>
            </v-expand-x-transition>
            <v-badge color="primary" content="6" overlap class="mr-1">
              <v-btn icon>
                <v-icon>mdi-message-outline</v-icon>
              </v-btn>
            </v-badge>
            <v-badge color="primary" content="10" overlap class="mr-1">
              <v-btn icon>
                <v-icon>mdi-bell-outline</v-icon>
              </v-btn>
            </v-badge>
            <v-btn icon class="mr-1">
              <v-icon>mdi-apps</v-icon>
            </v-btn>

            <v-menu offset-y min-width="150">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon large class="mr-3" v-bind="attrs" v-on="on">
                  <v-avatar size="32px" item>
                    <v-img
                      src="https://jgi.doe.gov/wp-content/uploads/2014/04/Steven_Hallam-slide.jpg"
                      alt="Vuetify"
                    ></v-img>
                  </v-avatar>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-icon color="default">mdi-account-outline</v-icon>&nbsp; &nbsp;
                  <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-icon color="error">mdi-power</v-icon>&nbsp; &nbsp;
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-app-bar>

        <v-navigation-drawer
          elevation="0"
          app
          v-model="drawer"
          width="200"
          class="text-center"
          style="border:none"
        >
          <div>
            <img src="../../assets/logo.png" class="mt-3" width="40" />
          </div>
          <div class="main-nav">
            <v-tooltip v-model="sidebar.dashboard" right color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :to="{ name: 'dashboard' }"
                  :color="active_route == 'dashboard' ? 'primary' : ''"
                  icon
                  large
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-home</v-icon>
                </v-btn>
              </template>
              <span>DASHBOARD</span>
            </v-tooltip>

            <v-tooltip v-model="sidebar.resources" right color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :to="{ name: 'contents' }"
                  :color="active_route == 'contents' ? 'primary' : ''"
                  icon
                  medium
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-apps</v-icon>
                </v-btn>
              </template>
              <span>CONTENTS</span>
            </v-tooltip>

            <v-tooltip v-model="sidebar.subscriptions" right color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :to="{ name: 'subscriptions' }"
                  :color="active_route == 'subscriptions' ? 'primary' : ''"
                  icon
                  medium
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-clipboard-text-multiple</v-icon>
                </v-btn>
              </template>
              <span>SUBSCRIPTIONS</span>
            </v-tooltip>

            <v-tooltip v-model="sidebar.users" right color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :to="{ name: 'users' }"
                  :color="active_route == 'users' ? 'primary' : ''"
                  icon
                  medium
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-account-multiple</v-icon>
                </v-btn>
              </template>
              <span>USERS</span>
            </v-tooltip>

            <v-tooltip v-model="sidebar.settings" right color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :to="{ name: 'settings' }"
                  :color="active_route == 'settings' ? 'primary' : ''"
                  icon
                  medium
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-cog</v-icon>
                </v-btn>
              </template>
              <span>SETTINGS</span>
            </v-tooltip>
          </div>
        </v-navigation-drawer>

        <v-main>
          <v-container fluid>
            <v-row justify="center">
              <v-col cols="11" class="shrink">
                <router-view></router-view>
              </v-col>
            </v-row>
          </v-container>
        </v-main>

        <v-footer app>
          <span>SUBCMS</span>
          <v-spacer></v-spacer>
          <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import { LOGOUT } from "@/graphql/auth.js";
export default {
  name: "HomeLayout",

  props: {
    source: String,
  },
  data: () => ({
    active_route: "",
    tool_bar: {
      search_expanded: false,
    },
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
    sidebar: {
      dashboard: false,
      resources: false,
      subscriptions: false,
      users: false,
      settings: false,
    },
  }),
  mounted() {
    this.active_route = this.$route.name;
    this.removeElementInDom();
  },
  methods: {
    removeElementInDom() {
      document
        .querySelectorAll(".v-navigation-drawer__border")
        .forEach(function (a) {
          a.remove();
        });
    },
    logout() {
      this.$apollo
        .mutate({
          mutation: LOGOUT,
        })
        .then(({ data }) => {
          if (data._logout.success) {
            this.$router.push({ name: "login" });
          }
        });
    },
  },
  watch: {
    $route(to) {
      this.active_route = to.name;
    },
  },
};
</script>
<style lang="scss" scoped></style>
