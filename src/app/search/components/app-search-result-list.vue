<template>
  <div class="app-search-result-list">
    <div class="header">
      <CloseButton @click="onClickCloseButton" />
    </div>
    <div class="content">
      <AppSearchResultListItem
        v-for="(result, index) in searchResults"
        :key="index"
        :item="result"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../app.store';
import CloseButton from '../../components/close-button.vue';
import AppSearchResultListItem from './app-search-result-list-item.vue';

const searchResults = computed(() => store.getters['search/searchResults']);

const onClickCloseButton = () => {
  store.commit('search/setSearchResults', null);
};
</script>

<style scoped>
@import './styles/app-search-result-list.css';
</style>
