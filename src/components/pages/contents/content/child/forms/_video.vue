<template>
  <v-col md="10 " class="p-0">
    <v-row v-if="!is_video">
      <v-col md="12">
        <v-row>
          <v-col md="6" sm="6">
            <h2 class="font-weight-regular mb-5">Upload Video</h2>
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
            <v-progress-circular
              :rotate="360"
              :size="215"
              :width="15"
              :value="value"
              color="primary"
            >
              <v-avatar size="200" color="#ebebeb">
                <v-icon size="70">mdi-upload</v-icon>
              </v-avatar>
            </v-progress-circular>

            <div class="mt-5" v-if="!is_uploading">Select video file to upload</div>
            <div class="mt-5" v-else>Uploading video . . .</div>
            <small class="mt-3 mb-5 font-weight-light">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Doloribus, id.
            </small>
            <div class="my-5">
              <v-btn large color="secondary" elevation="0" @click="triggerInputFile">Select video</v-btn>
            </div>
            <h3 class="font-weight-medium">OR</h3>
            <div class="my-5">
              <v-btn
                elevation="1"
                large
                color="default"
                @click="selectFromResources"
              >Select from resources</v-btn>
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
    </v-row>
    <v-row v-else>
      <v-col md="12">
        <v-row>
          <v-col md="6" sm="6">
            <h2 class="font-weight-regular mb-5">Content Video</h2>
          </v-col>
          <v-col md="6" sm="6" class="text-right">
            <v-btn icon @click="$router.push({ name: 'content_index' })">
              <v-icon medium>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" class="mt-5">
            <h2 class="font-weight-regular">Details</h2>
          </v-col>
          <v-col md="7" sm="12">
            <v-text-field label="Title (required)" outlined height="80" v-model="video.title"></v-text-field>
            <v-textarea
              outlined
              name="input-7-4"
              label="Description"
              height="140"
              v-model="video.description"
            ></v-textarea>
            <h4 class="font-weight-regular">Thumbnail</h4>
            <p class="font-weight-light subtitle-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
              tenetur soluta quisquam placeat illo eius nisi dignissimos. Vero,
              facere sed.
            </p>
            <div class="mt-5 d-flex">
              <input
                type="file"
                style="display:none;"
                ref="FileInputThumbnail"
                accept="image/*"
                @change="uploadThumbnail"
              />
              <div class="text-center mx-2 file-input__dotted" @click="triggerFileInputThumbnail">
                <v-icon size="50" class="my-5">mdi-image-plus</v-icon>Upload
              </div>
              <div class="text-center mx-2 mb-3 file-input__dotted">
                <v-icon size="50" class="my-5">mdi-plus</v-icon>gallery
              </div>
            </div>
            <v-select
              :items="items"
              label="Categories"
              outlined
              class="mt-5"
              multiple
              v-model="video.categories"
            ></v-select>
            <v-select :items="items" label="Tags" outlined multiple v-model="video.tags"></v-select>

            <v-select :items="visibility" label="Visibility" outlined v-model="video.is_free"></v-select>
          </v-col>
          <v-col md="5" sm="12">
            <v-row justify-md="center">
              <v-col cols="7">
                <v-card elevation="1" max-width="380" min-height="400">
                  <v-img
                    class="grey lighten-2"
                    height="250px"
                    :src="video.thumbnail"
                    aspect-ratio="1"
                  ></v-img>

                  <v-card-actions class="pb-0">
                    <v-list-item class="list-item">
                      <v-card-subtitle class="pl-0">
                        <v-icon small>mdi-heart-outline</v-icon>&nbsp; 0
                        <span class="mx-2"></span>
                        <v-icon small>mdi-message-outline</v-icon>&nbsp; 0
                        <span class="mx-2"></span>
                        <v-icon small>mdi-eye-outline</v-icon>&nbsp; 0
                      </v-card-subtitle>

                      <v-row justify="end">
                        <span class="mr-1">·</span>
                        <v-icon small class="mr-1">mdi-dots-vertical</v-icon>
                      </v-row>
                    </v-list-item>
                  </v-card-actions>

                  <v-card-text class="text--secondary pt-0">
                    <div class="font-weight-medium">{{ video.title ? video.title : "Title" }}</div>

                    <div class="font-weight-light">{{ cutDescription(video.description) }} ...</div>
                    <div class="font-weight-thin">Upload date</div>
                  </v-card-text>

                  <v-card-actions>
                    <v-chip outlined>
                      <v-icon small>{mdi-video-outline</v-icon>
                      <span class="subtitle-2 font-weight-light ml-1">VIDEO</span>
                    </v-chip>
                    <v-spacer></v-spacer>
                    <v-icon small :color="video.is_free == 'FREE' ? 'success' : 'default'">
                      {{
                      video.is_free == "FREE"
                      ? "mdi-check-circle-outline"
                      : "mdi-lock-open-outline"
                      }}
                    </v-icon>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="text-right">
          <v-col md="12">
            <v-btn
              large
              elevation="0"
              color="primary"
              @click="$router.push({ name: 'content_index' })"
            >
              <v-icon>mdi-content-save-cog</v-icon>Save
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { VIDEO_UPLOAD_MUTATION } from "@/graphql/resource.js";
export default {
  data: () => ({
    is_video: false,
    is_uploading: false,
    value: 0,
    interval: {},
    items: ["Arms", "Shoulder", "Back", "Leg"],
    visibility: ["FREE", "PAID"],
    video: {
      video_file: "",
      title: "",
      description: "",
      thumbnail: "",
      categories: [],
      tags: [],
      is_free: "",
    },
    video_upload: {},
  }),
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {},
  beforeMount() {
    this.$route.query.resource_id
      ? (this.is_video = true)
      : (this.is_video = false);
  },
  methods: {
    // first page

    triggerLoading() {
      this.interval = setInterval(() => {
        if (this.value === 100) {
          this.is_video = true;
          return (this.value = 100);
        }
      }, 500);
    },
    triggerInputFile() {
      this.$refs.fileInput.click();
    },
    async uploadVideo(e) {
      this.is_uploading = true;
      this.triggerLoading();
      let file = e.target.files[0] || e.dataTransfer.files[0];
      await this.$apollo
        .mutate({
          mutation: VIDEO_UPLOAD_MUTATION,
          variables: {
            file: file,
          },
        })
        .then(({ data }) => {
          this.video_upload = data.video_upload;
        })
        .catch(() => {
          // error logs here
        });
      this.is_video = true;
      this.is_uploading = false;

      this.$router.push({
        name: "content_create",
        query: {
          id: this.$route.query.id,
          resource_id: this.video_upload.id,
        },
      });
    },
    selectFromResources() {
      alert("Under construction");
    },

    // second page
    cutDescription(str) {
      return str ? str.split(" ").splice(0, 4).join(" ") : "Description";
    },
    triggerFileInputThumbnail() {
      this.$refs.FileInputThumbnail.click();
    },
    uploadThumbnail(e) {
      let photo = e.target.files[0] || e.dataTransfer.files[0];
      this.video.thumbnail = URL.createObjectURL(photo);
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
.no-border {
  border: none;
}
.file-input__dotted {
  height: 100px;
  width: 200px;
  border: 3px dotted;
  cursor: pointer;
}
</style>
