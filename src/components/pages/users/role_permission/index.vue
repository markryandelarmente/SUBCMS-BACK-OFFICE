<template>
  <v-row>
    <v-col md="2" sm="12">
      <v-card outlined class="mt-5">
        <v-list shaped>
          <div class="d-flex">
            <v-subheader>ROLES</v-subheader>
            <v-spacer></v-spacer>
            <v-btn icon color="secondary">
              <v-icon medium>mdi-plus</v-icon>
            </v-btn>
          </div>

          <v-list-item-group v-model="item" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-avatar>{{ item.count }}</v-list-item-avatar>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
    <v-col md="10" sm="12" class="text-center mt-5">
      <v-card outlined>
        <v-list shaped>
          <div class="d-flex">
            <v-subheader>PERMISSIONS</v-subheader>
            <v-spacer></v-spacer>
          </div>
        </v-list>
        <v-row>
          <v-col
            v-for="(permission, index) in permissions"
            :key="index"
            md="3"
            sm="12"
            class="text-left"
          >
            <v-list subheader two-line flat>
              <v-subheader class="font-weight-medium">{{permission}}</v-subheader>

              <v-list-item-group v-model="settings" multiple>
                <v-list-item>
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-checkbox :input-value="active" color="primary"></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>View user</v-list-item-title>
                      <v-list-item-subtitle>can view users list</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>

                <v-list-item>
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-checkbox :input-value="active" color="primary"></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>Create user</v-list-item-title>
                      <v-list-item-subtitle>can create/add user</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>

                <v-list-item>
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-checkbox :input-value="active" color="primary"></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>Edit user</v-list-item-title>
                      <v-list-item-subtitle>can edit/update user</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>

                <v-list-item>
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-checkbox :input-value="active" color="primary"></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>Delete user</v-list-item-title>
                      <v-list-item-subtitle>can delete user</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    item: 1,
    items: [
      {
        text: "Admin",
        count: 5,
      },
      {
        text: "Manager",
        count: 2,
      },
      {
        text: "Author",
        count: 4,
      },
      {
        text: "User",
        count: 256,
      },
      {
        text: "Guest",
        count: 3,
      },
    ],
    settings: [],
    permissions: [
      "BACK OFFICE",
      "DASHBOARD",
      "USERS",
      "TICKETS",
      "ROLES AND PERMISSIONS",
      "SUBSCRIPTIONS",
      "RESOURCES",
      "SETTINGS",
      "SETTINGS",
    ],
  }),
  computed: {},
};
</script>

<style>
</style>