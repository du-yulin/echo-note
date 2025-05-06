import { useWindowSize } from '@vueuse/core'

type ScreenSize = 'sm' | 'md' | 'lg'
export const useScreen = () => {
  const { width, height } = useWindowSize()
  const size = computed<ScreenSize>(() => {
    if (width.value < 640) {
      return 'sm'
    } else if (width.value < 1024) {
      return 'md'
    } else {
      return 'lg'
    }
  })
  const isSm = computed(() => size.value === 'sm')
  const isMd = computed(() => size.value === 'md')
  const isLg = computed(() => size.value === 'lg')
  return {
    size,
    width,
    height,
    isSm,
    isMd,
    isLg,
  }
}
