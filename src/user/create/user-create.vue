<template>
  <div class="user-create">
    <div class="content" v-if="isSuccessful">
      <h1 class="header">注册成功</h1>
      <div class="description">恭喜，您成功注册了用户: {{ formData.name }}</div>
    </div>
    <div class="form" v-if="!isSuccessful">
      <h1 class="header">用户注册</h1>
      <TextField v-model="formData.name" placeholder="请输入用户名" />
      <TextField
        v-model="formData.password"
        placeholder="请输入密码"
        type="password"
      />
      <ButtonField
        text="注册"
        size="large"
        :type="registerButtonType"
        @click="onClickRegisterBtn"
      />
    </div>
    <div class="action" v-if="!isSuccessful">
      <router-link class="link" :to="loginLinkTo">← 登录</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import TextField from '../../app/components/text-field.vue';
import ButtonField from '../../app/components/button-field.vue';

const store = useStore();
const router = useRouter();

const formData = reactive({
  name: '',
  password: '',
});

const registerButtonType = computed(() =>
  formData.name && formData.password ? '' : 'outline',
);

const isSuccessful = ref(false);

const onClickRegisterBtn = async () => {
  try {
    const data = {
      name: formData.name,
      password: formData.password,
    };
    await store.dispatch('user/create/createUser', { data });
    await store.dispatch('auth/login/login', data);
    store.dispatch('notification/pushMessage', {
      content: `注册并登录成功！`,
    });
    isSuccessful.value = true;
  } catch (error) {
    console.log(error);
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};

const loginLinkTo = computed(() => ({ name: 'login' }));
</script>

<style scoped>
@import './styles/user-create.css';
</style>
