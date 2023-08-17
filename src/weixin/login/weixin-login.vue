<template>
  <div class="weixin-login">
    <WeixinLoginHeader />
    <component :is="currentComponent"></component>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../app/app.store';
import WeixinLoginHeader from './components/weixin-login-header.vue';
import WeixinLoginIframe from './components/weixin-login-iframe.vue';
import WeixinLoginConnect from './components/weixin-login-connect.vue';
import WeixinLoginAccount from './components/weixin-login-account.vue';

store.commit('weixin/login/resetLoginStep');

const currentLoginStep = computed(
  () => store.getters['weixin/login/currentLoginStep'],
);

const currentComponent = computed(() => {
  if (currentLoginStep.value.component === 'WeixinLoginIframe')
    return WeixinLoginIframe;
  if (currentLoginStep.value.component === 'WeixinLoginConnect')
    return WeixinLoginConnect;
  if (currentLoginStep.value.component === 'WeixinLoginAccount')
    return WeixinLoginAccount;
});
</script>

<style scoped>
@import './styles/weixin-login.css';
</style>
