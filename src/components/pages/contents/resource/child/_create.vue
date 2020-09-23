<template>
  <v-row justify="center">
    <v-col md="12">
      <v-row>
        <v-col md="6" sm="6">
          <h2 class="font-weight-regular mb-5">Upload resources</h2>
        </v-col>
        <v-col md="6" sm="6" class="text-right">
          <v-btn icon @click="$router.push({ name: 'resource_index' })">
            <v-icon medium>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row justify="center" class="wrapper">
        <v-col md="4" class="text-center my-auto">
          <v-progress-circular
            :indeterminate="is_uploading"
            :size="215"
            :width="10"
            color="primary"
          >
            <v-avatar size="200" color="#ebebeb">
              <v-icon size="70">mdi-upload</v-icon>
            </v-avatar>
          </v-progress-circular>

          <div class="mt-5" v-if="!is_uploading">Select video and image files to upload</div>
          <div class="mt-5" v-else>Uploading files . . .</div>
          <small class="mt-3 mb-5 font-weight-light">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Doloribus.
          </small>
          <div class="my-5">
            <v-btn large color="secondary" elevation="0" @click="triggerInputFile">Select</v-btn>
          </div>
          <input
            type="file"
            accept="video/*, image/*"
            ref="fileInput"
            multiple="multiple"
            class="file-input"
            @change="uploadResources"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-snackbar
      color="error"
      v-model="toaster.activate"
      :timeout="3000"
      :bottom="true"
      :left="true"
      width="auto"
    >{{ toaster.text }}</v-snackbar>
  </v-row>
</template>

<script>
import { UPLOAD_RESOURCES } from "@/graphql/resource.js";
export default {
  data: () => ({
    is_uploading: false,
    value: 0,
    interval: {},
    files: [],
    toaster: {
      activate: false,
      text: "Went something wrong!",
    },
  }),
  created() {},
  methods: {
    triggerInputFile() {
      this.$refs.fileInput.click();
    },
    async uploadResources({ target: { files = [] } }) {
      if (!files.length) {
        return;
      }
      this.is_uploading = true;

      await this.$apollo
        .mutate({
          mutation: UPLOAD_RESOURCES,
          variables: {
            files: files,
          },
          context: {
            hasUpload: true,
          },
        })
        .then(({ data }) => {
          data;
          this.$router.push({ name: "resource_index" });
        })
        .catch(() => {
          this.toaster.activate = true;
        });

      this.is_uploading = false;
    },
  },
};
</script>

<style>
.remove-box-shadow {
  box-shadow: none;
}
</style>
