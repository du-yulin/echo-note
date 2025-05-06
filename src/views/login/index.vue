<template>
  <a-config-provider
    :theme="{
      token: appStore.blackPrimaryToken,
    }"
  >
    <div class="bg-bg dark:bg-bg-dark flex flex-col min-h-screen">
      <div class="flex-auto flex flex-col justify-center items-center gap-12">
        <div class="flex justify-center">
          <img class="w-60" :src="logoUrl" alt="" />
        </div>
        <div
          class="w-full flex p-4 gap-4 md:(w-160 border-([--antd-color-border] 1 solid) rounded-3xl shadow-xl)"
        >
          <a-tabs v-model:activeKey="activeKey" centered class="login-tabs flex-auto">
            <a-tab-pane key="1" tab="验证码登礼">
              <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
              >
                <a-form-item
                  label="Username"
                  name="username"
                  :rules="[{ required: true, message: 'Please input your username!' }]"
                >
                  <a-input v-model:value="formState.username" />
                </a-form-item>

                <a-form-item
                  label="Password"
                  name="password"
                  :rules="[{ required: true, message: 'Please input your password!' }]"
                >
                  <a-input-password v-model:value="formState.password" />
                </a-form-item>

                <a-form-item name="remember">
                  <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                </a-form-item>

                <a-form-item>
                  <a-button type="primary" html-type="submit">Submit</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" tab="密码登录" force-render>
              <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
              >
                <a-form-item
                  label="Username"
                  name="username"
                  :rules="[{ required: true, message: 'Please input your username!' }]"
                >
                  <a-input v-model:value="formState.username" />
                </a-form-item>

                <a-form-item
                  label="Password"
                  name="password"
                  :rules="[{ required: true, message: 'Please input your password!' }]"
                >
                  <a-input-password v-model:value="formState.password" />
                </a-form-item>

                <a-form-item name="remember">
                  <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                </a-form-item>

                <a-form-item>
                  <a-button type="primary" html-type="submit">Submit</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
          </a-tabs>
          <div class="w-60 bg-[--antd-color-fill-tertiary] rounded-xl hidden md:block"></div>
        </div>
      </div>
      <div
        class="h-12 flex-grow-0 bottom-0 flex items-center justify-center gap-1 [&>*]:text-[--antd-color-text-quaternary] [&>*:hover]:text-[--antd-color-text-secondary]"
      >
        <a href="">xICP备xxxxxxxxxx号</a>
        <span>·</span>
        <a href="">联系我们</a>
      </div>
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
const logoUrl = computed(() => {
  const url = new URL(`../../assets/imgs/logo-${appStore.colorMode}.png`, import.meta.url)
  console.log(url)
  return url.pathname
})

const activeKey = ref('1')

interface FormState {
  username: string
  password: string
  remember: boolean
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
})
const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<style scoped>
.login-tabs :deep(.ant-tabs-nav::before) {
  /* 移除tabs底部的线 */
  border: unset;
}
.login-tabs :deep(.ant-tabs-ink-bar) {
  /* 修改tabs 底部active状态的线高度及位置 */
  height: 3px;
  bottom: 8px;
}
</style>
