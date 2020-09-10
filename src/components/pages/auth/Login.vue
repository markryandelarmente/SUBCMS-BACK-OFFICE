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
                <v-form ref="loginForm">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="user.email"
                        label="Email"
                        required
                        @keyup.enter="handleEnterEvent"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="user.password"
                        label="Password"
                        hint="At least 8 characters"
                        type="password"
                        counter
                        required
                        @keyup.enter="handleEnterEvent"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" xsm="12"></v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                      <v-btn @click="login" x-large block color="primary">Login</v-btn>
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
import { LOGIN_MUTATION, SELF_QUERY } from "@/graphql/auth.js";
import * as cookie from "@/plugins/cookie.js";

export default {
  name: "Login",
  data: () => ({
    dialog: true,
    user: {
      email: "",
      password: "",
    },
  }),
  created() {
    this.checkIfAuthenticated();
  },
  methods: {
    handleEnterEvent() {
      this.login();
    },
    checkIfAuthenticated() {
      this.token = cookie.getCookie("token");

      if (this.token) {
        this.$apollo
          .query({
            query: SELF_QUERY,
          })
          .then(({ data }) => {
            let { self: user } = data;
            if (user) {
              this.$store.commit("authenticated/SET_TOKEN", this.token);
              this.$store.commit("authenticated/SET_USER", user);
              this.$router.push({ name: "dashboard" });
            }
          });
      } else {
        this.$router.push({ name: "login" });
      }
    },
    login() {
      this.$apollo
        .mutate({
          mutation: LOGIN_MUTATION,
          variables: {
            input: {
              email: this.user.email,
              password: this.user.password,
            },
          },
        })
        .then(({ data }) => {
          let {
            admin_login: { token, user },
          } = data;

          this.$store.commit("authenticated/SET_TOKEN", token);
          this.$store.commit("authenticated/SET_USER", user);

          cookie.setCookie("token", token, 7);
          this.$router.push({ name: "dashboard" });
        });
    },
  },
  computed: {},
};
</script>

<style></style>
