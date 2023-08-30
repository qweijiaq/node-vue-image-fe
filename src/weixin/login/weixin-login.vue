<template>
  <div class="weixin-login">
    <WeixinLoginHeader />
    <component :is="currentComponent"></component>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onUnmounted } from 'vue';
import store from '../../app/app.store';
import WeixinLoginHeader from './components/weixin-login-header.vue';
import WeixinLoginIframe from './components/weixin-login-iframe.vue';
import WeixinLoginConnect from './components/weixin-login-connect.vue';
import WeixinLoginAccount from './components/weixin-login-account.vue';
import { socket } from '../../app/app.service';
import router from '../../app/app.router';

store.commit('weixin/login/resetLoginStep');

const currentLoginStep = computed(
  () => store.getters['weixin/login/currentLoginStep'],
);

const canGoBack = ref(false);

defineOptions({
  beforeRouteUpdate(to, from, next) {
    next((vm: any) => {
      vm.canGoBack = from.name ? true : false;
    });
  },
});

const onWeixinLoginConnect = (weixinUserInfo) => {
  store.commit('weixin/login/setCurrentLoginStepName', 'connectAccount');
  store.commit('weixin/login/setWeixinUserInfo', weixinUserInfo);
};

const onWeixinLoginSucceeded = (data) => {
  store.dispatch('weixin/login/weixinLogin', data);
  if (canGoBack.value) {
    router.back();
  } else {
    router.push('/');
  }
};

socket.on('weixinLoginConnect', onWeixinLoginConnect);
socket.on('weixinLoginSucceeded', onWeixinLoginSucceeded);

onUnmounted(() => {
  socket.off('weixinLoginConnect', onWeixinLoginConnect);
  socket.off('weixinLoginSucceeded', onWeixinLoginSucceeded);
});

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
