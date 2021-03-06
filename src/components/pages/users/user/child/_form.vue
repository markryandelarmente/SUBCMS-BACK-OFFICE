<template>
  <v-form>
    <v-container>
      <v-toolbar-title class="text-left">
        {{ $t("user_group.user._form.account_details") }}
        <v-btn class="float-right" color="gray" @click="cancel" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-row>
        <v-col sm="12" md="4">
          <v-avatar size="200" class="mx-auto">
            <img
              :src="
                user.profile_image
                  ? user.profile_image
                  : 'https://www.nepic.co.uk/wp-content/uploads/2016/11/blank-staff-circle-male.png'
              "
            />
          </v-avatar>
        </v-col>
        <v-col sm="12" md="8">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.email"
                :label="$t('user_group.user._form.email')"
                hint="example@gmail.com"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.username"
                :label="$t('user_group.user._form.username')"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.password"
                type="password"
                :counter="10"
                :label="$t('user_group.user._form.password')"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.confirm_password"
                type="password"
                :counter="10"
                :label="$t('user_group.user._form.confirm_password')"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                dense
                v-model="user.role"
                :items="computedRoles"
                :label="$t('user_group.user._form.role')"
                class="mt-3"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-toolbar-title class="text-left mt-5">{{
        $t("user_group.user._form.personal_details")
      }}</v-toolbar-title>
      <v-row>
        <v-col sm="12" md="4">
          <v-text-field
            v-model="user.firstname"
            :label="$t('user_group.user._form.first_name')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.lastname"
            :label="$t('user_group.user._form.last_name')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :items="gender"
            v-model="user.gender"
            :label="$t('user_group.user._form.gender')"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-dialog
            ref="dialog"
            v-model="birthdate.modal"
            :return-value.sync="user.birthdate"
            persistent
            width="380px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="user.birthdate"
                :label="$t('user_group.user._form.birthdate')"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="user.birthdate" width="100%">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="birthdate.modal = false">{{
                $t("user_group.user._form.cancel")
              }}</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialog.save(user.birthdate)"
                >{{ $t("user_group.user._form.ok") }}</v-btn
              >
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.age"
            :counter="2"
            type="number"
            :label="$t('user_group.user._form.age')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.address"
            :label="$t('user_group.user._form.address')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.city"
            :label="$t('user_group.user._form.city')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.postal_code"
            :counter="10"
            :label="$t('user_group.user._form.postal_code')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.country"
            :label="$t('user_group.user._form.country')"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="my-2 text-right">
        <v-btn class="mx-5" color="gray" @click="cancel" depressed large>
          <v-icon>mdi-close</v-icon>
          {{ $t("user_group.user._form.cancel") }}
        </v-btn>
        <v-btn
          :loading="loading"
          :disabled="loading"
          @click="submit"
          depressed
          large
          color="primary"
        >
          <v-icon>mdi-content-save</v-icon>
          {{
            is_edit
              ? $t("user_group.user._form.update")
              : $t("user_group.user._form.save")
          }}
        </v-btn>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import {
  USER_STORE_MUTATION,
  USER_UPDATE_MUTATION,
  USER_QUERY,
} from "@/graphql/user.js";
import { ROLES_QUERY } from "@/graphql/role.js";
export default {
  data: () => ({
    is_edit: false,
    loading: false,
    user: {
      id: null,
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      profile_image: "",
      gender: "",
      age: 0,
      birthdate: "",
      address: "",
      city: "",
      postal_code: "",
      country: "",
      password: "",
      confirm_password: "",
      role: null,
    },
    gender: ["Male", "Female"],
    roles: [],
    birthdate: {
      modal: false,
    },
  }),
  created() {
    this.$route.params.id
      ? ((this.is_edit = true), this.fetchUser(this.$route.params.id))
      : false;
    this.fetchRole();
  },
  methods: {
    fetchRole() {
      this.$apollo
        .query({
          query: ROLES_QUERY,
        })
        .then(({ data }) => {
          this.roles = data.roles;
        });
    },
    fetchUser(id) {
      this.$apollo
        .query({
          query: USER_QUERY,
          variables: { id: id },
        })
        .then(({ data }) => {
          this.user = {
            ...data.user,
            role: data.user.roles[0].id,
          };
        });
    },
    submit() {
      this.loading = true;
      delete this.user.roles;
      this.$apollo
        .mutate({
          mutation: this.is_edit ? USER_UPDATE_MUTATION : USER_STORE_MUTATION,
          variables: {
            input: {
              ...this.user,
            },
          },
        })
        .then(() => {
          this.$router.push({ name: "user_index" });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    cancel() {
      this.$router.push({ name: "user_index" });
    },
    _calculateAge(DOB) {
      var today = new Date();
      var birthDate = new Date(DOB);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
      }

      return age;
    },
  },
  computed: {
    computedRoles: function() {
      return this.roles.map((role) => {
        return {
          ...role,
          text: role.name.toUpperCase(),
          value: role.id,
        };
      });
    },
  },
  watch: {
    "user.birthdate": function(val) {
      val ? (this.user.age = this._calculateAge(val)) : "";
    },
  },
};
</script>

<style></style>
