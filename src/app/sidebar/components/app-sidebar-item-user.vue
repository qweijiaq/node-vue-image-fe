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
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import userAvatar from '@/user/components/user-avatar.vue';
import userMenu from '@/user/components/user-menu.vue';

const store = useStore();

const currentUser = computed(() => store.getters['user/currentUser']);
const userAvatarLink = computed(() =>
  currentUser.value ? undefined : 'login',
);

const showUserMenu = ref(false);

const onClickUserAvatar = () => {
  if (currentUser.value) {
    showUserMenu.value = !showUserMenu.value;
  }
};
</script>

<style scoped></style>
