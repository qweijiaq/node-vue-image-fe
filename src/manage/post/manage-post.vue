<template>
  <div class="manage-post">
    <ManagePostList />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../app/app.store';
import { useRoute } from 'vue-router';
import router from '../../app/app.router';
import ManagePostList from './components/manage-post-list.vue';

const route = useRoute();

store.commit('layout/setSideSheetComponent', 'ManagePostSideSheet');

const useAdmin = computed(() => store.getters['user/useAdmin']);

const { admin } = route.query;

if (admin === 'true') {
  store.commit('user/setUseAdmin', true);
}

if (useAdmin.value) {
  router.replace({ query: { admin: true } });
}
</script>

<style scoped>
@import './styles/manage-post.css';
</style>
