<template>
  <div class="app-search">
    <AppSearchField />
    <AppSearchOptions />
    <transition name="app-search-result-list">
      <AppSearchResultList v-if="hasSearchResults" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onUnmounted } from 'vue';
import store from '../app.store';
import AppSearchOptions from './components/app-search-options.vue';
import AppSearchResultList from './components/app-search-result-list.vue';
import AppSearchField from './components/app-search-field.vue';

const hasSearchResults = computed(
  () => store.getters['search/hasSearchResults'],
);

const onKeydownWindow = (event) => {
  if (event.key === 'Escape') {
    store.commit('search/setSearchResults', null);
    store.commit('search/setSearchKeyword', '');
  }
};

if (window) {
  window.addEventListener('keydown', onKeydownWindow);
}

onUnmounted(() => {
  if (window) {
    window.removeEventListener('keydown', onKeydownWindow);
  }

  store.commit('search/setSearchResults', null);
  store.commit('search/setSearchKeyword', '');
});
</script>

<style scoped>
@import './styles/app-search.css';
</style>
