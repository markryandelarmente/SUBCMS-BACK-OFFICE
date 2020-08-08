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
        <v-btn icon large>
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn icon medium>
          <v-icon>mdi-apps</v-icon>
        </v-btn>
        <v-btn icon medium>
          <v-icon>mdi-clipboard-text-multiple</v-icon>
        </v-btn>
        <v-btn color="secondary" icon medium>
          <v-icon>mdi-account-multiple</v-icon>
        </v-btn>
        <v-btn icon medium>
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
      <v-row justify="center">
        <v-col sm="11" md="11" lg="10">
          <v-tabs>
            <v-tab>USERS</v-tab>
          </v-tabs>
        </v-col>
        <v-col sm="12" md="11" lg="10">
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col class="text-center">
                <v-data-table
                  light
                  :headers="headers"
                  :items="desserts"
                  :items-per-page="15"
                  class="elevation-1"
                ></v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
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
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Iron (%)", value: "iron" },
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%",
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: "1%",
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%",
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: "8%",
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: "16%",
      },
      {
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: "0%",
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%",
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%",
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%",
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%",
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%",
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%",
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%",
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%",
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%",
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%",
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%",
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%",
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%",
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%",
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%",
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%",
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%",
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%",
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%",
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%",
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%",
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%",
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%",
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%",
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%",
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%",
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%",
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%",
      },
    ],
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
<style lang="scss" scoped></style>
