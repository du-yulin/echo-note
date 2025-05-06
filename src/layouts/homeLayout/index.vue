<template>
  <div class="h-screen flex bg-bg dark:bg-bg-dark">
    <LayoutSider></LayoutSider>
    <LayoutMain>
      <slot></slot>
    </LayoutMain>
  </div>
</template>
<script lang="ts" setup>
import LayoutSider from './components/layoutSider/index.vue'
import LayoutMain from './components/layoutMain/index.vue'
</script>
<style scoped></style>
