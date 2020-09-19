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

          <v-list-item-group v-model="selected_role" color="primary">
            <v-list-item v-for="(role, i) in roles" :key="i">
              <v-list-item-content>
                <span class="capitalize">{{role.name}}</span>
              </v-list-item-content>
              <v-list-item-avatar>{{ role.users_count }}</v-list-item-avatar>
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
            v-for="(permission, index) in computedPermissions"
            :key="index"
            md="3"
            sm="12"
            class="text-left"
          >
            <v-list subheader two-line flat>
              <v-subheader class="font-weight-medium uppercase">{{permission}}</v-subheader>

              <v-list-item-group
                v-for="permission_item in permissions[permission]"
                :key="permission_item.id"
              >
                <v-list-item @click="pushToPermissions(permission_item.id)">
                  <v-list-item-action>
                    <v-checkbox
                      v-model="role_permissions"
                      :value="permission_item.id"
                      color="primary"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-regular">{{ permission_item.name}}</v-list-item-title>
                    <small class="font-weight-light">Can {{ permission_item.name }}</small>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col md="12" class="text-right mr-3 pt-0 mt-0">
            <v-btn color="primary">
              <v-icon class="mr-1">mdi-content-save-outline</v-icon>Save changes
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { ROLES_QUERY, ROLE_QUERY } from "@/graphql/role.js";
import { PERMISSIONS_QUERY } from "@/graphql/permission.js";
export default {
  data: () => ({
    setting: "",
    roles: [],
    selected_role: "",
    permissions: [],
    role_permissions: [],
  }),
  beforeMount() {
    this.fetchData();
  },
  mounted() {
    this.$route.query.id ? (this.selected_role = this.$route.query.id - 1) : "";
  },
  created() {},
  methods: {
    // get all roles and permissions
    fetchData() {
      this.$apollo
        .query({
          query: ROLES_QUERY,
        })
        .then(({ data }) => {
          this.roles = data.roles;
          this.fetchRole();
        });

      this.$apollo
        .query({
          query: PERMISSIONS_QUERY,
        })
        .then(({ data }) => {
          this.permissions = this.groupBy(data.permissions, "group");
        });
    },
    // get single role with permissions
    fetchRole() {
      this.$apollo
        .query({
          query: ROLE_QUERY,
          variables: {
            id: this.selected_role + 1,
          },
        })
        .then(({ data }) => {
          console.log(data);
          this.role_permissions = data.role.permissions.map((permission) => {
            return permission.id;
          });

          //check if active
          this.checkIfActive();
        });
    },
    checkIfActive() {
      this.computedPermissions.forEach((permission_group) => {
        this.permissions[permission_group].forEach((permission) => {
          if (this.role_permissions.includes(permission.id)) {
            permission.active = true;
          } else {
            permission.active = false;
          }
        });
      });
    },
    // push selected permission to role_permissions
    pushToPermissions(permission_id) {
      if (this.role_permissions.includes(permission_id)) {
        let index = this.role_permissions.indexOf(permission_id);
        if (index > -1) {
          this.role_permissions.splice(index, 1);
        }
      } else {
        this.role_permissions.push(permission_id);
      }
    },
    groupBy(xs, key) {
      let list = xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
      return list;
    },
  },
  computed: {
    computedPermissions: function () {
      return Object.keys(this.permissions);
    },
  },
  watch: {
    selected_role: function (val) {
      this.fetchRole();
      val;
    },
  },
};
</script>

<style scoped>
.uppercase {
  text-transform: uppercase;
}
.capitalize {
  text-transform: capitalize;
}
</style>