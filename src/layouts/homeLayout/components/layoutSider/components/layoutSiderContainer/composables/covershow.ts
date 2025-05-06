import { useEventListener, useDebounceFn, useTimeoutFn } from '@vueuse/core'
import { useAppStore } from '@/stores/app'
import {
  SIDER_COVERSHOW_TRIGGER_X,
  SIDER_COVERSHOW_OFF_TRIGGER_X,
  SIDER_COVERSHOW_MARGIN_LEFT,
  SIDER_COVERSHOW_MARGIN_Y,
} from '@/appConfig'
import { useScreen } from '@/composables/screen'
export const useSiderCoverShow = (sider: Ref<HTMLElement | null>) => {
  const appStore = useAppStore()
  const screen = useScreen()
  const coverShow = ref(false)
  let stopTriggerCoverShow = () => {}
  watchEffect(() => {
    if (appStore.siderCollapsed && !screen.isSm.value) {
      // sider收起并且屏幕不为sm时开启侧边栏covershow监听
      const stop = useEventListener(
        'mousemove',
        useDebounceFn((e: MouseEvent) => {
          if (e.pageY <= appStore.headerHeight) return
          if (e.pageX < SIDER_COVERSHOW_TRIGGER_X) {
            coverShow.value = true

            // 开启关闭监听
            const stopTriggerCoverShowOff = useEventListener(
              'mousemove',
              useDebounceFn((e: MouseEvent) => {
                if (
                  e.pageX >
                    appStore.siderWidth +
                      SIDER_COVERSHOW_OFF_TRIGGER_X +
                      SIDER_COVERSHOW_MARGIN_LEFT ||
                  e.pageY < SIDER_COVERSHOW_MARGIN_Y ||
                  e.pageY > screen.height.value - SIDER_COVERSHOW_MARGIN_Y
                ) {
                  coverShow.value = false
                  stopTriggerCoverShowOff()
                }
              }, 50),
            )
          }
        }, 50),
      )
      stopTriggerCoverShow = () => stop()
    } else {
      // sider未收起或屏幕为sm时，关闭侧边栏covershow监听
      stopTriggerCoverShow()
    }
  })

  return coverShow
}
