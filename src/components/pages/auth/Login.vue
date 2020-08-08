<template>
  <v-app>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <div>
        <v-tabs show-arrows background-color="secondary" icons-and-text dark grow>
          <v-tabs-slider color="purple darken-4"></v-tabs-slider>
          <v-tab>
            <v-icon large>mdi-account</v-icon>
            <div class="caption py-1">Login</div>
          </v-tab>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="loginForm" v-model="valid">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="user.email" label="Email" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="user.password"
                        label="Password"
                        hint="At least 8 characters"
                        type="password"
                        counter
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" xsm="12"></v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                      <v-btn x-large block color="primary">Login</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    dialog: true,
    user: {
      email: "",
      password: "",
    },
  }),
};
</script>

<style>
</style>