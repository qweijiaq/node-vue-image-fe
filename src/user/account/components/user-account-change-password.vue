<template>
  <div class="user-account-change-password">
    <div class="form">
      <h2 class="header">修改密码</h2>
      <textField
        v-model="data.newPassword"
        type="password"
        placeholder="请输入新的密码"
      />
      <textField
        v-if="data.newPassword"
        v-model="data.password"
        placeholder="验证用户登录密码"
        type="password"
      />
      <buttonField text="提交" size="large" @click="onClickSubmitBtn" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import textField from '@/app/components/text-field.vue';
import buttonField from '@/app/components/button-field.vue';
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const data = reactive({
  newPassword: '',
  password: '',
});

const currentUser = computed(() => store.getters['user/currentUser']);

const onClickSubmitBtn = async () => {
  if (!data.newPassword) {
    return store.dispatch('notification/pushMessage', {
      content: '请输入新的密码',
    });
  }
  try {
    await store.dispatch('user/account/updateUserAccount', {
      userId: currentUser.value.id,
      body: {
        update: {
          password: data.newPassword,
        },
        validate: {
          password: data.password,
        },
      },
    });
    store.dispatch('notification/pushMessage', {
      content: '成功修改了密码',
    });
    data.newPassword = '';
    data.password = '';
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};
</script>

<style scoped></style>
