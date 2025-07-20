import { watch } from 'vue'
import { useRoute } from 'vue-router'

const appName = import.meta.env.VITE_APP_NAME || 'Cek Ketersediaan Kamar Aplicare'

export function usePageTitle() {
  const route = useRoute()
  
  const updateTitle = (pageTitle?: string) => {
    if (pageTitle) {
      document.title = `${appName} | ${pageTitle}`
    } else {
      document.title = appName
    }
  }

  const setPageTitle = (title: string) => {
    updateTitle(title)
  }

  // Watch for route changes and update title based on route meta
  watch(
    () => route.meta.title,
    (title) => {
      if (title) {
        updateTitle(title as string)
      }
    },
    { immediate: true }
  )

  return {
    setPageTitle,
    appName
  }
}
