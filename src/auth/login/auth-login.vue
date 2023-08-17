<template>
  <div class="auth-login">
    <div class="form">
      <h1 class="header">用户登录</h1>
      <TextField v-model="data.name" placeholder="请输入用户名" />
      <TextField
        v-model="data.password"
        placeholder="请输入密码"
        type="password"
      />
      <div class="section actions">
        <ButtonField
          text="登录"
          size="large"
          :type="loginButtonType"
          @click="onClickLoginBtn"
        />
        <WeixinLoginButton />
      </div>
    </div>
    <div class="action">
      <router-link class="link" :to="registerLinkTo"> 注册 →</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import TextField from '../../app/components/text-field.vue';
import ButtonField from '../../app/components/button-field.vue';
import WeixinLoginButton from '../../weixin/login/components/weixin-login-button.vue';

const store = useStore();
const router = useRouter();

const data = reactive({
  name: '',
  password: '',
});

const loginButtonType = computed(() =>
  data.name && data.password ? '' : 'outline',
);

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

const registerLinkTo = computed(() => ({
  name: 'userCreate',
}));
</script>

<style scoped>
@import url('./styles/auth-login.css');
</style>
