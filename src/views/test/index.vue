<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const checked = ref(false)
const show = ref(false)
</script>

<template>
  <div>
    <PageHeader>
      <template #header-end>
        <li class="header__item">
          <menu-fold-outlined />
        </li>
      </template>
      <template #header-center>
        <li class="header__item">
          <menu-fold-outlined />
        </li>
      </template>
    </PageHeader>
    <div class="fds">
      <h1 class="">你好</h1>
      <button>test</button>
      <a-button @click="appStore.colorMode = 'auto'">auto</a-button>
      <a-button @click="appStore.colorMode = 'dark'">dark</a-button>
      <a-button @click="appStore.colorMode = 'light'">light</a-button>

      <a-button type="primary" @click="show = !show">show</a-button>
      <Transition
        enter-from-class="h-0"
        enter-to-class="h-25"
        enter-active-class="transition-all duration-5000"
        leave-to-class="h-0"
        leave-from-class="h-25"
        leave-active-class="transition-all duration-5000"
      >
        <div class="bg-red w-25 h-25 hover:animate-flash" v-show="show"></div>
      </Transition>
      <div class="bg-green w-25 h-25 animate-flash"></div>
      <a-switch v-model:checked="checked"></a-switch>
    </div>
  </div>
</template>

<style scoped></style>
