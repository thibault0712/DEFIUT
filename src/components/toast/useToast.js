import { ref } from 'vue'

const visibility = ref(false)
const messages = ref([])
const types = ref([])

export function useToast () {
  function resetMessages () {
    messages.value = []
  }

  function addMessage (message, type = 'info') {
    if (message) {
      messages.value.push(message)
      types.value.push(type)
      visibility.value = true
      setTimeout(() => {
        visibility.value = false
        resetMessages()
      }, 4000)
    }
  }

  return {
    messages,
    addMessage,
    visibility,
    types,
  }
}
