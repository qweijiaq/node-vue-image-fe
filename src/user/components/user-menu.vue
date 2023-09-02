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
import CloseButton from '../../app/components/close-button.vue';
import UserName from './user-name.vue';
import { onUnmounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const emits = defineEmits(['close']);

// eslint-disable-next-line
const onKeyUpWindow = (event: any) => {
  if (event.key === 'Escape') {
    emits('close');
  }
};

if (window) {
  window.addEventListener('keyup', onKeyUpWindow);
}

onUnmounted(() => {
  if (window) {
    window.removeEventListener('keyup', onKeyUpWindow);
  }
});

const currentUser = computed(() => store.getters['user/currentUser']);

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

const onClickLogoutBtn = () => {
  emits('close');
  store.dispatch('auth/logout');
};
</script>

<style scoped>
@import url('./styles/user-menu.css');
</style>
