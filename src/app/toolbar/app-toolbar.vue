<template>
  <div class="app-toolbar">
    <template v-if="!showAppSearch">
      <transition name="app-toolbar-item-layout">
        <div class="app-toolbar-item layout" v-if="showPostListLayoutSwitcher">
          <PostListLayoutSwitcher />
        </div>
      </transition>
      <transition name="app-toolbar-item-navigator">
        <div class="app-toolbar-item navigator" v-if="showPostShowNavigator">
          <PostShowNavigator />
        </div>
      </transition>
      <transition name="app-toolbar-item-side-sheet">
        <AppToolbarItemSideSheet v-if="showSideSheetItem" />
      </transition>
      <AppToolbarItemAdmin v-if="showAdminItem && isAdmin" />
    </template>
    <AppSearch v-if="showAppSearch" />
    <AppToolbarItemSearch />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import store from '../app.store';
import AppToolbarItemSearch from './components/app-toolbar-item-search.vue';
import PostListLayoutSwitcher from '../../post/index/components/post-list-layout-switcher.vue';
import PostShowNavigator from '../../post/show/components/post-show-navigator.vue';
import AppToolbarItemSideSheet from './components/app-toolbar-item-side-sheet.vue';
import AppSearch from '../search/app-search.vue';
import AppToolbarItemAdmin from './components/app-toolbar-item-admin.vue';

const showPostListLayoutSwitcher = computed(
  () => store.getters['toolbar/showPostListLayoutSwitcher'],
);

const showPostShowNavigator = computed(
  () => store.getters['toolbar/showPostShowNavigator'],
);

const showSideSheetItem = computed(
  () => store.getters['toolbar/showSideSheetItem'],
);

const showAppSearch = computed(() => store.getters['toolbar/showAppSearch']);

const showAdminItem = computed(() => store.getters['toolbar/showAdminItem']);

const isAdmin = computed(() => store.getters['user/isAdmin']);
</script>

<style scoped>
@import url('./styles/app-toolbar.css');
</style>
