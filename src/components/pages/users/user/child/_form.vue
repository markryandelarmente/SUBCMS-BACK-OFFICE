<template>
  <v-form>
    <v-container>
      <v-toolbar-title class="text-left">
        ACCOUNT DETAILS
        <v-btn class="float-right" color="gray" @click="cancel" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-row>
        <v-col cols="4" md="4">
          <v-avatar size="200" class="mx-auto">
            <img
              src="https://www.nepic.co.uk/wp-content/uploads/2016/11/blank-staff-circle-male.png"
            />
          </v-avatar>
        </v-col>
        <v-col cols="8" md="8">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="user.email" label="Email *" hint="example@gmail.com" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="user.username" label="Username *" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.password"
                type="password"
                :counter="10"
                label="Password *"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.confirm_password"
                type="password"
                :counter="10"
                label="Confirm Password *"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-toolbar-title class="text-left mt-5">PERSONAL DETAILS</v-toolbar-title>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="user.firstname" label="First Name"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="user.lastname" label="Last Name"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select :items="gender" v-model="user.gender" label="Gender"></v-select>
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
                label="Birthdate"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="user.birthdate" width="100%">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="birthdate.modal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(user.birthdate)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="user.age" :counter="2" type="number" label="Age"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="user.address" label="Address"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="user.city" label="City"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="user.postal_code" :counter="10" label="Postal Code"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="user.country" label="Country"></v-text-field>
        </v-col>
      </v-row>
      <div class="my-2 text-right">
        <v-btn class="mx-5" color="gray" @click="cancel" depressed large>
          <v-icon>mdi-close</v-icon>CANCEL
        </v-btn>
        <v-btn
          :loading="loading"
          :disabled="loading"
          @click="submit"
          depressed
          large
          color="primary"
        >
          <v-icon>mdi-content-save</v-icon>SAVE
        </v-btn>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import { USER_STORE } from "@/graphql/user.js";

export default {
  data: () => ({
    loading: false,
    user: {
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
    },
    gender: ["Male", "Female"],
    birthdate: {
      modal: false,
    },
  }),
  methods: {
    submit() {
      this.loading = true;
      this.$apollo
        .mutate({
          mutation: USER_STORE,
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
  watch: {
    "user.birthdate": function (val) {
      this.user.age = this._calculateAge(val);
    },
  },
};
</script>

<style>
</style>