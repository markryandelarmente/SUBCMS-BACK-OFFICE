<template>
  <v-row>
    <v-col md="12" sm="12"></v-col>
    <v-col v-for="stat in stats" :key="stat.icon + stat.value" md="12">
      <v-card max-width="350" outlined class="mt-0 rounded-lg">
        <div class="mt-5 ml-5">
          <v-icon>{{ stat.icon }}</v-icon>
          {{ stat.text }}
        </div>
        <v-list-item three-line>
          <v-list-item-content class="text-center">
            <v-list-item-title class="headline">
              <strong class="display-1">{{ stat.value }}</strong>
              <span class="subtitle-1" v-if="stat.subtitle"
                >&nbsp; {{ stat.subtitle }}</span
              >
            </v-list-item-title>
            <v-list-item-subtitle class="pb-5">
              <small>{{ stat.description }}</small>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    stats: function() {
      return [
        {
          icon: "mdi-video-outline",
          text: "Videos",
          value: `32`,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, cumque?",
        },
        {
          icon: "mdi-image-outline",
          text: "Images",
          value: "102",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, cumque?",
        },
        {
          icon: "mdi-cloud-outline",
          text: "Storage",
          value: "34",
          subtitle: "GB",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, cumque?",
        },
      ];
    },
  },
};
</script>

<style></style>
