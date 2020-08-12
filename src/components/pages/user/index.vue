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
      <v-col md="2" class="mt-5">
        <v-card max-width="350" outlined class="mt-5">
          <div class="mt-5 ml-5">
            <v-icon>mdi-account-arrow-right-outline</v-icon>Total
          </div>
          <v-list-item three-line>
            <v-list-item-content class="text-center">
              <v-list-item-title class="headline">
                <strong class="display-1">260</strong>
              </v-list-item-title>
              <v-list-item-subtitle class="pb-5">Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card max-width="350" outlined class="mt-5">
          <div class="mt-5 ml-5">
            <v-icon>mdi-account-check-outline</v-icon>Active now
          </div>
          <v-list-item three-line>
            <v-list-item-content class="text-center">
              <v-list-item-title class="headline">
                <strong class="display-1">180</strong>
              </v-list-item-title>
              <v-list-item-subtitle class="pb-5">Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card max-width="350" outlined class="mt-5">
          <div class="mt-5 ml-5">
            <v-icon>mdi-clipboard-alert-outline</v-icon>Pending Tickets
          </div>
          <v-list-item three-line>
            <v-list-item-content class="text-center">
              <v-list-item-title class="headline">
                <strong class="display-1">160</strong>
              </v-list-item-title>
              <v-list-item-subtitle class="pb-5">Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card max-width="350" outlined class="mt-5">
          <div class="mt-5 ml-5">
            <v-icon>mdi-clipboard-check-outline</v-icon>Solved Tickets
          </div>
          <v-list-item three-line>
            <v-list-item-content class="text-center">
              <v-list-item-title class="headline">
                <strong class="display-1">160</strong>
              </v-list-item-title>
              <v-list-item-subtitle class="pb-5">Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col md="9" class="text-center">
        <v-spacer class="mb-5"></v-spacer>
        <v-data-table
          light
          :headers="headers"
          :items="desserts"
          :items-per-page="15"
          :height="620"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UserIndex",
  data: () => ({
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
    ],
  }),
};
</script>

<style></style>
