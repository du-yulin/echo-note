<template>
  <a-config-provider :theme="{ token: appStore.blackPrimaryToken }">
    <LayoutSiderContainer>
      <a-menu
        class="h-full p-1 bg-[unset] text-[--antd-color-text-secondary]"
        :class="{
          'rounded-xl': !screen.isSm.value && appStore.siderCollapsed,
        }"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        :inlineIndent="16"
      >
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1 后脑勺发</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </LayoutSiderContainer>
  </a-config-provider>
</template>

<script setup lang="ts">
import LayoutSiderContainer from './components/layoutSiderContainer/index.vue'
import { useScreen } from '@/composables/screen'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
const screen = useScreen()
const selectedKeys = ref(['1'])
</script>

<style scoped></style>
