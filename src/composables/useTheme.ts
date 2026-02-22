import { ref } from 'vue'

const KEY = 'theme'
const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

// Shared state so multiple imports share the same reactive flag
const isDark = ref<boolean>(false)

function apply(d: boolean) {
    isDark.value = d
    // Toggle both classes so app-level CSS vars and PrimeVue's darkModeSelector work
    document.documentElement.classList.toggle('dark', d)
    document.documentElement.classList.toggle('app-dark', d)
    try {
        localStorage.setItem(KEY, d ? 'dark' : 'light')
    } catch {
        // ignore
    }
}

function toggle() {
    apply(!isDark.value)
}

function init() {
    try {
        const saved = localStorage.getItem(KEY)
        if (saved === 'dark') apply(true)
        else if (saved === 'light') apply(false)
        else apply(prefersDark)
    } catch {
        apply(prefersDark)
    }
}

export function useTheme() {
    return { isDark, toggle, init, apply }
}

export default useTheme