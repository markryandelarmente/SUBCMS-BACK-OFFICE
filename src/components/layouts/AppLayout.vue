<template>
  <div style>
    <v-navigation-drawer
      elevation="0"
      app
      color="secondary"
      v-model="drawer"
      width="200"
      class="text-center"
      style="border:none"
    >
      <img src="../../assets/logo.png" class="mt-5" width="40" />
    </v-navigation-drawer>

    <v-app-bar app color="secondary" dark height="100" elevation="0">
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
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col class="text-center"></v-col>
        </v-row>
      </v-container>
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
  }),
  mounted() {
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
};
</script>