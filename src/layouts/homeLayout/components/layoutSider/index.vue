<template>
  <div
    class="flex-grow-0 flex-shrink-0 transition-width duration-400 box-content"
    :class="{ 'transition-none': isResizing }"
    :style="asideContainerStyle"
  >
    <aside
      ref="siderRef"
      class="transition-[transform,height,margin,shadow,border-radius,border-width] duration-400 fixed z-999 bg-[--antd-color-bg-layout]"
      :class="{
        'shadow-2xl rounded-xl border-1 border-solid border-[--antd-color-border]': coverShow,
      }"
      :style="asideStyle"
    >
      <Transition enter-active-class="animate-fade-in" leave-active-class="animate-fade-out">
        <div
          class="absolute h-full w-full transition-opacity-400 border-r-3 border-[--antd-color-border] border-r-solid"
          :class="{
            'rounded-xl': appStore.siderCollapsed,
          }"
          v-if="isResizing || isHovering"
        ></div>
      </Transition>

      <div ref="resizeBar" class="w-3 h-full absolute right-0" v-show="!screen.isSm.value"></div>
      <SiderMenu></SiderMenu>
    </aside>
  </div>
  <Transition enter-active-class="animate-fade-in" leave-active-class="animate-fade-out">
    <div
      class="fixed w-screen h-screen bg-[--antd-color-bg-mask] z-998"
      v-show="!appStore.siderCollapsed && screen.isSm.value"
      @click="maskCollapseHandler"
    ></div>
  </Transition>
</template>

<script setup lang="ts">
import SiderMenu from './components/siderMenu/index.vue'
import { SIDER_COVERSHOW_MARGIN_LEFT, SIDER_COVERSHOW_MARGIN_Y } from '@/appConfig'
import { useAppStore } from '@/stores/app'
import { useScreen } from '@/composables/screen'
import { useSiderCoverShow } from './composables/covershow'
import { useResize } from './composables/resize'

const appStore = useAppStore()
const screen = useScreen()
// 侧边栏宽度控制
const resizeBarRef = useTemplateRef<HTMLElement>('resizeBar')
const { isResizing, isHovering } = useResize(resizeBarRef)
// 侧边栏覆盖显示控制
const siderRef = useTemplateRef<HTMLElement>('siderRef')
const coverShow = useSiderCoverShow(siderRef)

const asideContainerStyle = computed(() => {
  return {
    width: appStore.siderCollapsed || screen.isSm.value ? '0' : `${appStore.siderWidth}px`,
  }
})
const asideStyle = computed(() => {
  return {
    width: `${appStore.siderWidth}px`,
    transform: appStore.siderCollapsed
      ? coverShow.value
        ? `translateX(${SIDER_COVERSHOW_MARGIN_LEFT}px)`
        : `translateX(-100%)`
      : 'unset',
    height: coverShow.value
      ? `${screen.height.value - SIDER_COVERSHOW_MARGIN_Y * 2}px`
      : `${screen.height.value}px`,
    margin: coverShow.value ? `${SIDER_COVERSHOW_MARGIN_Y}px 0` : '0',
  }
})
const maskCollapseHandler = () => {
  appStore.siderCollapsed = true
}
</script>
