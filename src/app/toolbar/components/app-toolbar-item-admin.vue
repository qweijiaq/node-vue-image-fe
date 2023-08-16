<template>
  <div :class="appToolbarItemAdminClasses">
    <button class="button basic" @click="onClickadminButton">
      <AppIcon name="admin_panel_settings" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import AppIcon from '../../components/app-icon.vue';
import store from '../../app.store';
import router from '../../app.router';

const useAdmin = computed(() => store.getters['user/useAdmin']);

const appToolbarItemAdminClasses = computed(() => [
  'app-toolbar-item',
  'admin',
  { inactive: !useAdmin.value },
]);

const onClickadminButton = () => {
  store.commit('user/setUseAdmin', !useAdmin.value);

  const query = useAdmin.value ? { manage: 'true', admin: 'true' } : {};
  router.replace({ query });
};
</script>

<style scoped>
@import './styles/app-toolbar-item-admin.css';
</style>
