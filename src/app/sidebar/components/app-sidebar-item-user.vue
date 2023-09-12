<template>
  <div class="app-sidebar-item user">
    <userAvatar
      :user="currentUser"
      :link="userAvatarLink"
      @click="onClickUserAvatar"
    />
    <transition name="user-menu">
      <userMenu v-if="showUserMenu" @close="showUserMenu = false" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import store from '../../app.store';
import userAvatar from '@/user/components/user-avatar.vue';
import userMenu from '@/user/components/user-menu.vue';

// 当前用户
const currentUser = computed(() => store.getters['user/currentUser']);

// 用户头像对应的跳转链接
const userAvatarLink = computed(() =>
  currentUser.value ? undefined : 'login',
);

// 是否显示用户菜单
const showUserMenu = ref(false);

// 点击用户头像
const onClickUserAvatar = () => {
  if (currentUser.value) {
    showUserMenu.value = !showUserMenu.value;
  }
};
</script>

<style scoped></style>
