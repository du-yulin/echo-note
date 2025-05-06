<template>
  <a-result status="404" title="404" sub-title="页面不存在...">
    <template #extra>
      <a-button @click="redirectHome">返回首页</a-button>
      <a-button type="primary" @click="backLast">返回上一页</a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">
const router = useRouter()
const redirectHome = () => {
  router.push('home')
}
const backLast = () => {
  router.go(-1)
}
</script>

<style scoped></style>
