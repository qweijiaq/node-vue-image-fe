<template>
  <component :is="AppLayout">
    <router-view></router-view>
  </component>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import AppLayout from './layout/app-layout.vue';
import { getStorages, socket, apiHttpClient } from './app.service';

const store = useStore();

const token = getStorages('nid');
if (token) {
  store.commit('auth/setToken', token);
  store.dispatch('auth/configApiHttpClientAuthHeader', token);
}

// 当前用户
const userId = getStorages('uid');
if (userId) {
  store.dispatch('user/getCurrentUser', userId);
}

// 设置请求头部
socket.on('connect', () => {
  apiHttpClient.defaults.headers.common['X-Socket-Id'] = socket.id;
  store.commit('user/setSocketId', socket.id);
});
</script>

<style>
@import url('./styles/normalize.css');
@import url('./styles/app.css');
@import url('./styles/base.css');
@import url('./styles/page.css');
@import url('./styles/theme.css');
@import url('./styles/form.css');
@import url('./styles/button.css');
</style>
