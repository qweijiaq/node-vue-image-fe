<template>
  <div class="weixin-login-account">
    <div class="form">
      <TextField v-model="formData.name" placeholder="请输入用户" />
      <TextField
        v-model="formData.password"
        placeholder="请输入密码"
        type="password"
      />
      <IconTextButton
        :icon="selectedConnectOption.icon"
        :text="submitButtonText"
        :isActive="isVerified"
        variations="fluid"
        @click="onClickSubmitButton"
      />
    </div>
    <div class="action">
      <button class="button basic fluid" @click="onClickSwitchOptionButton">
        {{ switchOptionButtonText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import TextField from '../../../app/components/text-field.vue';
import IconTextButton from '../../../app/components/icon-text-button.vue';

const formData = reactive({
  name: '',
  password: '',
});

const selectedConnectOption = computed(
  () => store.getters['weixin/login/selectedConnectOption'],
);

const connectOptions = computed(
  () => store.getters['weixin/login/connectOptions'],
);

const isVerified = computed(() =>
  formData.name && formData.password ? true : false,
);

const submitButtonText = computed(
  () => `确定${selectedConnectOption.value.title}`,
);

const nextOption = computed(() =>
  connectOptions.value.find(
    (option) => option.value !== selectedConnectOption.value.value,
  ),
);

const switchOptionButtonText = computed(() => `${nextOption.value.title} ↓`);

const onClickSubmitButton = async () => {
  try {
    switch (selectedConnectOption.value.value) {
      case 'verifyAccount':
        await store.dispatch('weixin/login/weixinLoginConnect', {
          data: {
            name: formData.name,
            password: formData.password,
          },
        });
        break;
      case 'createAccount':
        await store.dispatch('weixin/login/weixinLoginCreateConnect', {
          data: {
            name: formData.name,
            password: formData.password,
          },
        });
        break;
    }

    store.commit(
      'weixin/login/setCurrentLoginStepName',
      'connectAccountCompleted',
    );
  } catch (error) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};

const onClickSwitchOptionButton = () => {
  store.commit('weixin/login/setCurrentLoginStepName', nextOption.value.value);
};
</script>

<style scoped>
@import './styles/weixin-login-account.css';
</style>
