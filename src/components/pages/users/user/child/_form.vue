<template>
  <v-form v-model="valid">
    <v-container>
      <v-toolbar-title class="text-left">ACCOUNT DETAILS</v-toolbar-title>

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
              <v-text-field v-model="lastname" :counter="10" label="Email" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="lastname" :counter="10" label="Username" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="lastname" :counter="10" label="Password" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="lastname" :counter="10" label="Confirm Password" required></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-toolbar-title class="text-left mt-5">PERSONAL DETAILS</v-toolbar-title>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="lastname" :counter="10" label="First Name" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="lastname" :counter="10" label="Last Name" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="lastname" :counter="10" label="Gender" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="lastname" :counter="10" label="Birthdate" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="lastname" :counter="10" label="Age" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="lastname" :counter="10" label="Address" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="lastname" :counter="10" label="City" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="lastname" :counter="10" label="Country" required></v-text-field>
        </v-col>
      </v-row>
      <div class="my-2 text-right">
        <v-btn depressed large color="primary">
          <v-icon left>mdi-content-save-cog</v-icon>SAVE
        </v-btn>
      </div>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    email: "",
  }),
};
</script>

<style>
</style>