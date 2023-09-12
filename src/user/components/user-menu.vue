<template>
  <div class="user-menu">
    <CloseButton @click="$emit('close')" />
    <div class="user-menu-header">
      <UserName :user="currentUser" />
    </div>
    <div
      class="user-menu-items"
      v-for="(menuItems, menuItemsIndex) in menu"
      :key="menuItemsIndex"
    >
      <div
        class="user-menu-item"
        v-for="(item, itemIndex) in menuItems"
        :key="itemIndex"
        @click="$emit('close')"
      >
        <router-link class="link" :to="item.linkTo">{{
          item.text
        }}</router-link>
      </div>
    </div>
    <div class="user-menu-footer">
      <button class="button block lowkey" @click="onClickLogoutBtn">
        退出登录
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, computed } from 'vue';
import store from '../../app/app.store';
import CloseButton from '../../app/components/close-button.vue';
import UserName from './user-name.vue';

const emits = defineEmits(['close']);

// 键盘键入 Escape => 等价于点击"关闭按钮"
// eslint-disable-next-line
const onKeyUpWindow = (event: any) => {
  if (event.key === 'Escape') {
    emits('close');
  }
};

// 监听键盘事件
if (window) {
  window.addEventListener('keyup', onKeyUpWindow);
}

// 取消监听键盘事件
onUnmounted(() => {
  if (window) {
    window.removeEventListener('keyup', onKeyUpWindow);
  }
});

// 当前用户
const currentUser = computed(() => store.getters['user/currentUser']);

// 菜单项
const menu = computed(() => {
  return [
    [
      {
        linkTo: {
          name: 'userPosts',
          params: {
            userId: currentUser.value.id,
          },
        },
        text: '作品',
      },
      {
        linkTo: {
          name: 'userComments',
          params: {
            userId: currentUser.value.id,
          },
        },
        text: '评论',
      },
    ],
    [
      {
        linkTo: {
          name: 'userAccount',
          params: {
            userId: currentUser.value.id,
          },
        },
        text: '账户',
      },
      {
        linkTo: {
          name: 'managePost',
          params: {
            userId: currentUser.value.id,
          },
        },
        text: '管理',
      },
    ],
    [
      {
        linkTo: {
          name: 'subscription',
          params: {
            userId: currentUser.value.id,
          },
        },
        text: '订阅',
      },
    ],
  ];
});

// 点击"退出登录按钮"
const onClickLogoutBtn = () => {
  emits('close');
  store.dispatch('auth/logout');
};
</script>

<style scoped>
@import url('./styles/user-menu.css');
</style>
