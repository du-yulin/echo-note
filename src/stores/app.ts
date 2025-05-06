import { defineStore } from 'pinia'
import { useColorMode, useLocalStorage, useDebounceFn } from '@vueuse/core'
import { theme } from 'ant-design-vue'
import {
  DEFAULT_COLOR_MODE,
  HEADER_HEIGHT,
  HEADER_HEIGHT_SM,
  SIDER_DEFAULT_WIDTH,
  SIDER_COVERSHOW_MARGIN_RIGHT_SM,
} from '@/appConfig'
import { useScreen } from '@/composables/screen'
import { GLOBAL_TOKEN, BLACK_PRIMARY_TOKEN } from '@/appConfig'
const { defaultAlgorithm, darkAlgorithm } = theme

export const useAppStore = defineStore('app', () => {
  const screen = useScreen()

  const colorMode = useColorMode({
    initialValue: DEFAULT_COLOR_MODE,
  })
  // 主题算法
  const themeAlgorithm = computed(() => {
    return colorMode.value === 'dark' ? darkAlgorithm : defaultAlgorithm
  })
  //全局token
  const globalToken = computed(() => {
    return colorMode.value === 'dark' ? GLOBAL_TOKEN.dark : GLOBAL_TOKEN.light
  })
  // 黑色主题色token
  const blackPrimaryToken = computed(() => {
    return colorMode.value === 'dark' ? BLACK_PRIMARY_TOKEN.dark : BLACK_PRIMARY_TOKEN.light
  })
  // header高度
  const headerHeight = computed(() => {
    return screen.isSm.value ? HEADER_HEIGHT_SM : HEADER_HEIGHT
  })
  // 侧边栏折叠状态
  const siderCollapsed = useLocalStorage('siderCollapsed', screen.isSm.value ? true : false)
  // md屏幕下侧边栏宽度
  const mdSiderWidth = ref(
    parseInt(localStorage.getItem('siderWidth') || '0') || SIDER_DEFAULT_WIDTH,
  )
  // sm屏幕下侧边栏宽度
  const smSiderWidth = computed(() => screen.width.value - SIDER_COVERSHOW_MARGIN_RIGHT_SM)
  // 真实侧边栏宽度
  const siderWidth = computed(() => {
    return screen.isSm.value ? smSiderWidth.value : mdSiderWidth.value
  })

  // 设置侧边栏宽度
  const setSiderWidth = (width: number) => {
    mdSiderWidth.value = width
    useDebounceFn(() => {
      localStorage.setItem('siderWidth', mdSiderWidth.value.toString())
    }, 500)()
  }
  return {
    colorMode,
    themeAlgorithm,
    globalToken,
    blackPrimaryToken,
    headerHeight,
    siderCollapsed,
    siderWidth,
    setSiderWidth,
  }
})
