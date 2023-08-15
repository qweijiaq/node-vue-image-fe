<template>
  <div :class="appSearchOptionClasses">
    <button class="button basic" @click="onClickOptionButton(option)">
      {{ option?.title }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../app.store';

const props = defineProps({
  option: {
    type: Object,
  },
});

const searchOption = computed(() => store.getters['search/searchOption']);
const searchKeyword = computed(() => store.getters['search/searchKeyword']);

const appSearchOptionClasses = computed(() => [
  'app-search-option',
  { active: searchOption.value.value === props.option?.value },
]);

const onClickOptionButton = (option) => {
  store.commit('search/setSearchResults', null);
  store.commit('search/setSearchOption', option);

  if (searchKeyword.value) {
    store.dispatch('search/search');
  }
};
</script>

<style scoped>
@import './styles/app-search-option.css';
</style>
