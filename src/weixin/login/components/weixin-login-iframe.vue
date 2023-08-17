<template>
  <div :class="weixinLoginIframeClasses">
    <div class="image skeleton"></div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';

const weixinLoginIframeClasses = computed(() => [
  'weixin-login-iframe',
  { loading: false },
]);
</script>

<style scoped>
@import './styles/weixin-login-iframe.css';
</style>
