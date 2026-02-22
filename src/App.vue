<script setup>
  import { useTheme } from 'vuetify/framework'
  import Toast from '@/components/toast/Toast.vue'
  import { useToast } from '@/components/toast/useToast.js'
  import user from '@/store/user.js'

  const { messages, visibility, types } = useToast()
  const theme = useTheme()
  const userInfos = user.getters.user

  if (userInfos.loggedIn) {
    theme.change(user.getters.user.data.theme)
  }

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
