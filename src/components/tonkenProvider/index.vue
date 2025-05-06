<template>
  <slot />
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import type { GlobalToken } from 'ant-design-vue/es/theme'
import _ from 'lodash'
import { useStyleTag } from '@vueuse/core'
const { useToken } = theme
const { token } = useToken()
const { tokenRegex = /.*/g, tokenPrefix = '--antd' } = defineProps<{
  tokenRegex?: RegExp
  tokenPrefix?: string
}>()

const genCSSVarString = (token: GlobalToken) => {
  return Object.entries(token)
    .filter(([key]) => tokenRegex.test(key))
    .map(([key, value]) => `${tokenPrefix}-${_.kebabCase(key)}:${value};`)
    .join('\n')
}
watch(
  token,
  (newToken) => {
    const css = `:root {\n${genCSSVarString(newToken)}\n}`
    useStyleTag(css)
  },
  { immediate: true },
)
</script>
