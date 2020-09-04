<template>
  <v-row justify="center">
    <v-col md="11" class="p-0">
      <v-stepper v-model="e1" class="remove-box-shadow">
        <v-stepper-header class="remove-box-shadow">
          <v-stepper-step :complete="e1 > 1" step="1">Program Details</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">Program builder</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Program Settings</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="mb-12" elevation="0" height="auto">
              <v-row justify="center">
                <v-col md="4">
                  <v-text-field label="Title" required></v-text-field>

                  <v-text-field label="Description" class="mt-5" required></v-text-field>

                  <v-text-field label="Categories" class="mt-5" required></v-text-field>
                </v-col>
              </v-row>
            </v-card>

            <v-row>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="e1 = 2">Continue</v-btn>
              <v-btn text>Cancel</v-btn>
            </v-row>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-12" elevation="0" height="auto">
              <v-row justify="center">
                <v-col md="4" class="text-center">
                  <h2 class="font-weight-regular">The Ultimate Upper body workout</h2>
                  <p
                    class="font-weight-light subtitle-2"
                  >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto culpa eaque ipsa. Ut deserunt laudantium eaque? Corporis repellendus cum reprehenderit.</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="3" sm="12">
                  <v-toolbar dense elevation="0">
                    <v-toolbar-title class="font-weight-regular">Program modules</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                      <v-icon large>mdi-plus</v-icon>
                    </v-btn>
                  </v-toolbar>

                  <v-card class="mx-auto mt-5" outlined>
                    <v-toolbar dense elevation="0" class="mt-3">
                      <v-toolbar-title class="font-weight-regular">
                        <v-icon large>mdi-drag</v-icon>Week 1 - Arms
                      </v-toolbar-title>

                      <v-spacer></v-spacer>

                      <v-btn icon>
                        <v-icon medium color="success">mdi-check-circle</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon medium>mdi-plus</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-list two-line subheader class="pl-3">
                      <v-list-item v-for="item in items" :key="item.title">
                        <v-icon medium>mdi-drag</v-icon>
                        <v-icon large color="grey lighten-1">mdi-video</v-icon>&nbsp;
                        <v-list-item-content>
                          <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>

                        <v-btn icon>
                          <v-icon color="grey lighten-1">mdi-lock</v-icon>
                        </v-btn>
                        <v-btn icon>
                          <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                        </v-btn>
                      </v-list-item>
                    </v-list>
                  </v-card>
                  <v-card class="mx-auto mt-5" outlined>
                    <v-toolbar dense elevation="0" class="mt-3">
                      <v-toolbar-title class="font-weight-regular">
                        <v-icon large>mdi-drag</v-icon>Week 2 - Shoulder
                      </v-toolbar-title>

                      <v-spacer></v-spacer>

                      <v-btn icon>
                        <v-icon medium color="success">mdi-check-circle</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon medium>mdi-plus</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-list two-line subheader class="pl-3">
                      <v-list-item v-for="item in items" :key="item.title">
                        <v-icon medium>mdi-drag</v-icon>
                        <v-icon large color="grey lighten-1">mdi-video</v-icon>&nbsp;
                        <v-list-item-content>
                          <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>

                        <v-btn icon>
                          <v-icon color="grey lighten-1">mdi-lock</v-icon>
                        </v-btn>
                        <v-btn icon>
                          <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                        </v-btn>
                      </v-list-item>
                    </v-list>
                  </v-card>
                  <v-card class="mx-auto mt-5" outlined>
                    <v-toolbar dense elevation="0" class="mt-3">
                      <v-toolbar-title class="font-weight-regular">
                        <v-icon large>mdi-drag</v-icon>Week 3 - Chest
                      </v-toolbar-title>

                      <v-spacer></v-spacer>

                      <v-btn icon>
                        <v-icon medium color="success">mdi-check-circle</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon medium>mdi-plus</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-list two-line subheader class="pl-3">
                      <v-list-item v-for="item in items" :key="item.title">
                        <v-icon medium>mdi-drag</v-icon>
                        <v-icon large color="grey lighten-1">mdi-video</v-icon>&nbsp;
                        <v-list-item-content>
                          <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>

                        <v-btn icon>
                          <v-icon color="grey lighten-1">mdi-lock</v-icon>
                        </v-btn>
                        <v-btn icon>
                          <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                        </v-btn>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
                <v-col md="9">
                  <v-row justify="center">
                    <v-col md="4" class="text-center">PREVIEW HERE</v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>

            <v-row>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="e1 = 3">Continue</v-btn>
              <v-btn text>Cancel</v-btn>
            </v-row>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="mb-12" elevation="0" height="auto">PROGRAM SETTINGS</v-card>

            <v-row>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="e1 = 1">Continue</v-btn>
              <v-btn text>Cancel</v-btn>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    e1: 1,
    items: [
      {
        icon: "folder",
        iconClass: "grey lighten-1 white--text",
        title: "5 sets push up",
        subtitle: "Jan 9, 2014",
      },
      {
        icon: "folder",
        iconClass: "grey lighten-1 white--text",
        title: "5 sets hammer curl",
        subtitle: "Jan 17, 2014",
      },
      {
        icon: "folder",
        iconClass: "grey lighten-1 white--text",
        title: "5 sets jumping jack",
        subtitle: "Jan 28, 2014",
      },
    ],
  }),
};
</script>

<style>
.remove-box-shadow {
  box-shadow: none;
}
</style>