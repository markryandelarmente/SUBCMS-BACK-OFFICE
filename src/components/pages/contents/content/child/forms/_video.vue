<template>
  <v-col md="10 " class="p-0">
    <v-row>
      <v-col md="6" sm="6">
        <h2 class="font-weight-medium mb-5">Upload Video</h2>
      </v-col>
      <v-col md="6" sm="6" class="text-right">
        <v-btn icon @click="$router.push({ name: 'content_index' })">
          <v-icon medium>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row justify="center" class="wrapper">
      <v-col md="4" class="text-center my-auto">
        <v-progress-circular :rotate="360" :size="215" :width="15" :value="value" color="primary">
          <v-avatar size="200" color="#ebebeb">
            <v-icon size="70">mdi-upload</v-icon>
          </v-avatar>
        </v-progress-circular>

        <div class="mt-5">Drag and drop video files to upload</div>
        <small
          class="mt-3 mb-5 font-weight-light"
        >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, id.</small>
        <div class="my-5">
          <v-btn large color="secondary" elevation="0" @click="triggerInputFile">Select video</v-btn>
        </div>
        <input
          type="file"
          accept="video/*"
          ref="fileInput"
          class="file-input"
          @change="uploadVideo"
        />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    value: 0,
    video: "",
    interval: {},
  }),
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {},
  methods: {
    triggerLoading() {
      this.interval = setInterval(() => {
        if (this.value === 90) {
          return (this.value = 90);
        }
        this.value += 5;
      }, 500);
    },
    triggerInputFile() {
      this.$refs.fileInput.click();
    },
    uploadVideo(e) {
      this.triggerLoading();
      let video = e.target.files[0] || e.dataTransfer.files[0];
      console.log(video);
    },
  },
};
</script>

<style>
.wrapper {
  height: 70vh;
}
.v-progress-circular {
  margin: 1rem;
}
.file-input {
  display: none;
}
</style>  