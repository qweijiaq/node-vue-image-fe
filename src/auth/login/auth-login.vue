<template>
  <div class="auth-login">
    <div class="form">
      <h1 class="header">用户登录</h1>
      <textField v-model="data.name" placeholder="请输入用户名" />
      <textField
        v-model="data.password"
        placeholder="请输入密码"
        type="password"
      />
      <buttonField text="登录" size="large" @click="onClickLoginBtn" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import textField from '@/app/components/text-field.vue';
import buttonField from '@/app/components/button-field.vue';

const store = useStore();
const router = useRouter();

const data = reactive({
  name: '',
  password: '',
});

const loading = computed(() => store.getters['auth/login/loading']);
const loginResponseData = computed(
  () => store.getters['auth/login/loginResponseData'],
);

const onClickLoginBtn = async () => {
  try {
    const res = await store.dispatch('auth/login/login', {
      name: data.name,
      password: data.password,
    });
    store.dispatch('notification/pushMessage', {
      content: `欢迎回来, ${res.data.name}`,
    });

    router.back();
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};
</script>

<style scoped>
.auth-login {
  max-width: 520px;
  margin: 0 auto;
  padding: 32px;
}
</style>
