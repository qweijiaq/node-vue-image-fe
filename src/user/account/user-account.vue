<template>
  <div class="user-account">
    <userAccountSetAvatar />
    <userAccountChangeName />
    <userAccountChangePassword />
  </div>
</template>

<script lang="ts" setup>
import userAccountSetAvatar from './components/user-account-set-avatar.vue';
import userAccountChangeName from './components/user-account-change-name.vue';
import userAccountChangePassword from './components/user-account-change-password.vue';
</script>

<style scoped>
@import url('./styles/user-account.css');
</style>
