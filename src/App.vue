<script setup>
  import { computed, watch } from 'vue'
  import { useTheme } from 'vuetify/framework'
  import { useStore } from 'vuex'
  import Toast from '@/components/toast/Toast.vue'
  import { useToast } from '@/components/toast/useToast.js'

  const { messages, visibility, types } = useToast()
  const theme = useTheme()
  const store = useStore()
  const userInfos = computed(() => store.getters['user/user'])

  watch(
    () => userInfos.value.data,
    () => {
      if (userInfos.value.loggedIn && userInfos.value.data !== null) {
        theme.change(userInfos.value.data.theme)
      }
    },
    { immediate: true },
  )

</script>

<template>
  <v-app>
    <v-main>

      <TransitionGroup name="toast">
        <Toast
          v-for="(message, index) in messages"
          :key="index"
          :index="index"
          :message="message"
          :type="types[index]"
          :visible="visibility"
        />
      </TransitionGroup>

      <router-view />

    </v-main>
  </v-app>
</template>
