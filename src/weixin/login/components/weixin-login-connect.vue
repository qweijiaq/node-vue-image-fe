<template>
  <div class="weixin-login-connect">
    <div
      class="option"
      v-for="{ title, value, icon } in connectOptions"
      :key="value"
    >
      <IconTextButton
        :icon="icon"
        :text="title"
        variations="relaxed"
        @click="onClickOptionButton(value)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import IconTextButton from '../../../app/components/icon-text-button.vue';

const connectOptions = computed(
  () => store.getters['weixin/login/connectOptions'],
);

const onClickOptionButton = (value) =>
  store.commit('weixin/login/setCurrentLoginStepName', value);
</script>

<style scoped>
@import './styles/weixin-login-connect.css';
</style>
