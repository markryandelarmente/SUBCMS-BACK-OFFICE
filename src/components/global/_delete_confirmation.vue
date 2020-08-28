<template>
  <div>
    <v-dialog v-model="activate" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Are you sure you want to delete {{ title }}?</v-card-title>
        <v-card-text>{{ description }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="activate = false">Cancel</v-btn>
          <v-btn color="primary" text @click="activate = false">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    activate: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    mutation: {
      type: String,
    },
    ids: {
      type: Array,
    },
  },
  methods: {
    onAgree() {
      this.$apollo
        .mutate({
          mutation: this.mutation,
          variables: {
            ids: this.ids,
          },
        })
        .then(() => {
          this.dialog = false;
        });
    },
  },
};
</script>

<style>
</style>