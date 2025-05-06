<template>
  <slot></slot>
</template>

<script setup lang="ts">
/**
 * @description event 弹窗
 */
import { useEventBus } from '@/composables/eventBus'
import { App } from 'ant-design-vue'
const { message } = App.useApp()
const eventBus = useEventBus()

eventBus.on('API:401', (err) => {
  message.error(401)
  console.log(err)
})
eventBus.on('API:403', (err) => {
  message.error(403)
  console.log(err)
})
eventBus.on('API:404', (err) => {
  message.error(404)
  console.log(err)
})
eventBus.on('API:500', (err) => {
  message.error(500)
  console.log(err)
})
eventBus.on('API:ECONNABORTED', (err) => {
  message.error('ECONNABORTED')
  console.log(err)
})
eventBus.on('API:ERR_NETWORK', (err) => {
  message.error('ERR_NETWORK')
  console.log(err)
})
eventBus.on('API:UNKNOWN', (err) => {
  message.error('UNKNOWN')
  console.log(err)
})
</script>

<style scoped></style>
