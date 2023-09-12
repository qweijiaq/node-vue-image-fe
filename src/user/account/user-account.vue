<template>
  <div class="user-account">
    <UserAccountSetAvatar />
    <UserAccountChangeName />
    <UserAccountChangePassword />
  </div>
</template>

<script lang="ts" setup>
import UserAccountSetAvatar from './components/user-account-set-avatar.vue';
import UserAccountChangeName from './components/user-account-change-name.vue';
import UserAccountChangePassword from './components/user-account-change-password.vue';
</script>

<style scoped>
@import url('./styles/user-account.css');
</style>
