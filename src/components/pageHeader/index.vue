<template>
  <header class="header">
    <ul class="header__start">
      <li class="header__item" v-if="collapseTrigger" @click="handleCollapseClick">
        <menu-unfold-outlined v-if="appStore.siderCollapsed" />
        <menu-fold-outlined v-else />
      </li>
      <slot name="start"></slot>
    </ul>
    <ul class="header__center mx-auto">
      <slot name="center"></slot>
    </ul>
    <ul class="header__end">
      <slot name="end"></slot>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { useAppStore } from '@/stores/app'

const { collapseTrigger = true } = defineProps<{
  collapseTrigger?: boolean
}>()

const appStore = useAppStore()
const screen = useScreen()
const handleCollapseClick = () => {
  appStore.siderCollapsed = !appStore.siderCollapsed
  // 移动端点击展开侧边栏时，添加一个history,用于点击浏览器返回按钮时，不会返回上个历史记录
  if (screen.isSm.value && appStore.siderCollapsed === false && history.pushState) {
    history.pushState(null, '', location.href)
    const stop = useEventListener('popstate', () => {
      appStore.siderCollapsed = true
      stop()
    })
  }
}
</script>

<style scoped>
.header {
  --at-apply: flex h-12 flex py-3 line-height-6;
}
.header__start,
.header__center,
.header__end {
  --at-apply: flex gap-1 my-auto p-0;
}
.header :deep(.header__item) {
  --at-apply: 'rounded-md transition-colors duration-300 px-2 list-none hover:bg-[--antd-color-bg-text-hover]';
}
</style>
