<template>
  <div class="weixin-login-header">
    <div class="thumbnail">
      <WeixinIcon :size="64" />
    </div>
    <div class="header">
      {{ currentLoginStep.title }}
    </div>
    <div class="description">
      {{ currentLoginStep.description }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import WeixinIcon from '../../components/weixin-icon.vue';

const currentLoginStep = computed(
  () => store.getters['weixin/login/currentLoginStep'],
);
</script>

<style scoped>
@import './styles/weixin-login-header.css';
</style>
