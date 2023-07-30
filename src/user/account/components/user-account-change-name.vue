<template>
  <div class="user-account-change-name">
    <div class="form">
      <h2 class="header">修改名称</h2>
      <textField v-model="data.newName" placeholder="请输入新的用户名" />
      <textField
        v-if="data.newName"
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
  newName: '',
  password: '',
});

const currentUser = computed(() => store.getters['user/currentUser']);

const onClickSubmitBtn = async () => {
  if (!data.newName) {
    return store.dispatch('notification/pushMessage', {
      content: '请输入新的用户名',
    });
  }
  try {
    await store.dispatch('user/account/updateUserAccount', {
      userId: currentUser.value.id,
      body: {
        update: {
          name: data.newName,
        },
        validate: {
          password: data.password,
        },
      },
    });
    store.dispatch('notification/pushMessage', {
      content: '成功修改了用户名',
    });
    data.newName = '';
    data.password = '';
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};
</script>

<style scoped>
.user-account-change-name {
  padding-bottom: 32px;
}
</style>
