import { useEventListener } from '@vueuse/core'
import { useAppStore } from '@/stores/app'
import { SIDER_MAX_WIDTH, SIDER_MIN_WIDTH } from '@/appConfig'
import { AppstoreAddOutlined } from '@ant-design/icons-vue'
export const useResize = (resizeBarRef: Ref<HTMLElement | null>) => {
  const isHovering = ref(false)
  const isResizing = ref(false)
  const appStore = useAppStore()
  watchEffect(() => {
    if (isResizing.value || isHovering.value) {
      document.body.style.cursor = 'ew-resize'
      document.body.style.userSelect = 'none'
    } else {
      document.body.style.cursor = 'unset'
      document.body.style.userSelect = 'unset'
    }
  })
  useEventListener(resizeBarRef, 'mouseenter', () => {
    isHovering.value = true
  })
  useEventListener(resizeBarRef, 'mouseleave', () => {
    isHovering.value = false
  })
  useEventListener(resizeBarRef, 'mousedown', () => {
    isResizing.value = true
    const stopListenMouseMove = useEventListener('mousemove', (e: MouseEvent) => {
      if (appStore.siderWidth + e.movementX >= SIDER_MAX_WIDTH) {
        return appStore.setSiderWidth(SIDER_MAX_WIDTH)
      }
      if (appStore.siderWidth + e.movementX <= SIDER_MIN_WIDTH) {
        return appStore.setSiderWidth(SIDER_MIN_WIDTH)
      }
      appStore.setSiderWidth(appStore.siderWidth + e.movementX)
    })
    const stopListenMouseUp = useEventListener('mouseup', () => {
      isResizing.value = false
      stopListenMouseMove()
      stopListenMouseUp()
    })
  })
  return { isResizing, isHovering }
}
