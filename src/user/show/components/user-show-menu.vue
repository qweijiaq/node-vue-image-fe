<template>
  <div class="user-show-menu">
    <div
      class="user-show-menu-item"
      v-for="(item, index) in menuItems"
      :key="index"
    >
      <router-link class="link" :to="item.linkTo">{{ item.text }}</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, watch } from 'vue';
import store from '../../../app/app.store';

const props = defineProps({
  user: {
    type: Object,
  },
});

let menuItems = reactive([
  {
    linkTo: {
      name: 'userPosts',
    },
    text: '作品',
  },
  {
    linkTo: {
      name: 'userDigged',
    },
    text: '点赞',
  },
  {
    linkTo: {
      name: 'userComments',
    },
    text: '评论',
  },
  {
    linkTo: {
      name: 'userReplies',
    },
    text: '回复',
  },
]);

const userAccountItem = reactive({
  linkTo: {
    name: 'userAccount',
  },
  text: '账户',
});

const currentUser = computed(() => store.getters['user/currentUser']);

const addUserAccountItem = () => {
  if (menuItems.some((item) => item.text === '账户')) return;
  menuItems = [...menuItems, userAccountItem];
};

const deleteUserAccountItem = () => {
  menuItems = menuItems.filter((item) => item.text !== '账户');
};

watch(
  () => props.user?.id,
  () => {
    if (currentUser.value && currentUser.value.id === props.user?.id) {
      addUserAccountItem();
    } else {
      deleteUserAccountItem();
    }
  },
);
</script>

<style scoped>
@import url('./styles/user-show-menu.css');
</style>
