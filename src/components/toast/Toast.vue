<script setup>

  const isVisible = defineModel('visible', { required: true })

  defineProps({
    message: {
      required: true,
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
  })

</script>

<template>

  <div>
    <v-snackbar
      v-model="isVisible"
      class="cursor-pointer"
      :color="type"
      location="top end"
      width="auto"
      @click="isVisible = false"
    >
      <p class="text-body-2 font-weight-medium">
        {{ message }}
      </p>

    </v-snackbar>
  </div>

</template>
