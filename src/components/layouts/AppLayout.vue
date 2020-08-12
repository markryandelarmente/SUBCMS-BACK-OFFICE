<template>
  <div style>
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
        <v-btn
          :to="{ name: 'dashboard' }"
          :color="active_route == 'dashboard' ? 'text_dark' : ''"
          icon
          large
        >
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn
          :to="{ name: 'resources' }"
          :color="active_route == 'resources' ? 'text_dark' : ''"
          icon
          medium
        >
          <v-icon>mdi-apps</v-icon>
        </v-btn>
        <v-btn
          :to="{ name: 'subscriptions' }"
          :color="active_route == 'subscriptions' ? 'text_dark' : ''"
          icon
          medium
        >
          <v-icon>mdi-clipboard-text-multiple</v-icon>
        </v-btn>
        <v-btn
          :to="{ name: 'users' }"
          :color="active_route == 'users' ? 'text_dark' : ''"
          icon
          medium
        >
          <v-icon>mdi-account-multiple</v-icon>
        </v-btn>
        <v-btn
          :to="{ name: 'settings' }"
          :color="active_route == 'settings' ? 'text_dark' : ''"
          icon
          medium
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </div>
    </v-navigation-drawer>

    <v-app-bar dark color="secondary" app height="80" elevation="0">
      <v-row justify="start">
        <v-col md="6"></v-col>
        <v-col md="6">
          <v-row justify="end">
            <v-col offset-md="4" md="5">
              <v-text-field
                clearable
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search"
                class="hidden-sm-and-down"
              ></v-text-field>
            </v-col>
            <v-col md="3">
              <v-btn icon>
                <v-icon>mdi-apps</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-bell</v-icon>
              </v-btn>
              <v-btn icon large>
                <v-avatar size="32px" item>
                  <v-img
                    src="https://jgi.doe.gov/wp-content/uploads/2014/04/Steven_Hallam-slide.jpg"
                    alt="Vuetify"
                  ></v-img>
                </v-avatar>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "HomeLayout",

  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    active_route: "",
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
  },
  watch: {
    $route(to) {
      this.active_route = to.name;
    },
  },
};
</script>
<style lang="scss" scoped></style>
