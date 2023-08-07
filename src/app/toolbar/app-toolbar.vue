<template>
  <div class="app-toolbar">
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
    <AppToolbarItemSearch />
  </div>
</template>

<script lang="ts" setup>
import AppToolbarItemSearch from './components/app-toolbar-item-search.vue';
import PostListLayoutSwitcher from '../../post/index/components/post-list-layout-switcher.vue';
import PostShowNavigator from '../../post/show/components/post-show-navigator.vue';
import AppToolbarItemSideSheet from '../../toolbar/components/app-toolbar-item-side-sheet.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const showPostListLayoutSwitcher = computed(
  () => store.getters['toolbar/showPostListLayoutSwitcher'],
);

const showPostShowNavigator = computed(
  () => store.getters['toolbar/showPostShowNavigator'],
);

const showSideSheetItem = computed(
  () => store.getters['toolbar/showSideSheetItem'],
);
</script>

<style scoped>
@import url('./styles/app-toolbar.css');
</style>
