<template>
  <div class="weixin-login-button">
    <button
      class="button large green outline circle"
      @click="onClickWeixinLoginButton"
    >
      <WeixinIcon />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import router from '../../../app/app.router';
import WeixinIcon from '../../components/weixin-icon.vue';

const onClickWeixinLoginButton = () => {
  router.replace({ name: 'weixinLogin' });
};
</script>

<style scoped>
@import './styles/weixin-login-button.css';
</style>
