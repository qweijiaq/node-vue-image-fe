<template>
  <div :class="weixinLoginIframeClasses">
    <div class="image skeleton" v-if="loading"></div>
    <div class="content">
      <iframe
        :src="weixinConnectUrl"
        width="300"
        height="360"
        scrolling="no"
        frameBorder="0"
        allowTransparency="true"
        @load="onLoadIframe"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import { queryStringProcess } from '../../../app/app.service';
import {
  WEIXIN_WEBSITE_APP_ID,
  WEIXIN_LOGIN_REDIRECT_URI,
  WEIXIN_LOGIN_CUSTOM_STYLE,
} from '../../../app/app.config';
import store from '../../../app/app.store';

const loading = ref(true);

const socketId = computed(() => store.getters['user/socketId']);

const weixinLoginIframeClasses = computed(() => [
  'weixin-login-iframe',
  { loading: loading.value },
]);

const weixinConnectUrl = computed(() => {
  const baseUrl = 'https://open.weixin.qq.com/connect/qrconnect';
  const queryString = queryStringProcess({
    appid: WEIXIN_WEBSITE_APP_ID,
    redirect_uri: WEIXIN_LOGIN_REDIRECT_URI,
    response_type: 'code',
    scope: 'snsapi_login',
    login_type: 'jssdk',
    self_redirect: true,
    href: WEIXIN_LOGIN_CUSTOM_STYLE,
    state: socketId.value,
  });

  return `${baseUrl}?${queryString}`;
});

const onLoadIframe = () => {
  loading.value = false;
};
</script>

<style scoped>
@import './styles/weixin-login-iframe.css';
</style>
