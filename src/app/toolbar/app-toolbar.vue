<template>
  <div class="app-toolbar">
    <transition name="app-toolbar-item-layout">
      <div class="app-toolbar-item layout" v-if="showPostListLayoutSwitcher">
        <postListLayoutSwitcher />
      </div>
    </transition>
    <transition name="app-toolbar-item-navigator">
      <div class="app-toolbar-item navigator" v-if="showPostShowNavigator">
        <postShowNavigator />
      </div>
    </transition>
    <appToolbarItemSearch />
  </div>
</template>

<script lang="ts" setup>
import appToolbarItemSearch from './components/app-toolbar-item-search.vue';
import postListLayoutSwitcher from '../../post/index/components/post-list-layout-switcher.vue';
import postShowNavigator from '../../post/show/components/post-show-navigator.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const showPostListLayoutSwitcher = computed(
  () => store.getters['toolbar/showPostListLayoutSwitcher'],
);

const showPostShowNavigator = computed(
  () => store.getters['toolbar/showPostShowNavigator'],
);
</script>

<style scoped>
@import url('./styles/app-toolbar.css');
</style>
