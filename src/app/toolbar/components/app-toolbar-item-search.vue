<template>
  <div class="app-toolbar-item search">
    <button class="button basic" @click="onClickSearchButton">
      <appIcon :name="searchIcon" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import appIcon from '../../components/app-icon.vue';
import store from '../../app.store';
import { computed } from 'vue';

const showAppSearch = computed(() => store.getters['toolbar/showAppSearch']);

const searchIcon = computed(() => (showAppSearch.value ? 'close' : 'search'));

const onClickSearchButton = () => {
  store.commit('toolbar/setShowAppSearch', !showAppSearch.value);
};
</script>

<style scoped></style>
