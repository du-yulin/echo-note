<template>
  <a-config-provider :theme="themeConfig">
    <a-app>
      <TonkenProvider :token-regex="/(color).*/">
        <EventTipster>
          <component v-if="route.meta.layout" :is="route.meta.layout">
            <RouterView v-slot="{ Component, route }">
              <component :is="Component" :key="route.path" />
            </RouterView>
          </component>
          <RouterView v-else v-slot="{ Component, route }">
            <component :is="Component" :key="route.path" />
          </RouterView>
        </EventTipster>
      </TonkenProvider>
    </a-app>
  </a-config-provider>
</template>

<script setup lang="ts">
import type { ThemeConfig } from 'ant-design-vue/lib/config-provider/context'

import { useAppStore } from './stores/app'
const route = useRoute()
const appStore = useAppStore()

const themeConfig = computed<ThemeConfig>(() => {
  return {
    algorithm: appStore.themeAlgorithm,
    token: appStore.globalToken,
    components: {
      Button: appStore.blackPrimaryToken,
    },
  }
})
</script>

<style scoped></style>
