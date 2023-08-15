<template>
  <div class="app-search-field">
    <button class="button basic" @click="onClickSearchIconButton">
      <AppIcon name="search" />
    </button>
    <TextField
      v-model="keyword"
      :placeholder="placeholder"
      @keydown.enter="onKeydownSearchField"
      ref="searchField"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, watch } from 'vue';
import store from '../../app.store';
import AppIcon from '../../components/app-icon.vue';
import TextField from '../../components/text-field.vue';

const searchOption = computed(() => store.getters['search/searchOption']);
const searchKeyword = computed(() => store.getters['search/searchKeyword']);

const keyword = computed({
  get() {
    return searchKeyword.value;
  },
  set(value) {
    store.commit('search/setSearchKeyword', value);
    if (!value) {
      store.commit('search/setSearchResults', null);
    }
  },
});

const placeholder = computed(() => `搜索${searchOption.value.title}`);

const submitSearch = async () => {
  const response = await store.dispatch('search/search');

  if (!response.data.length) {
    store.dispatch('notification/pushMessage', {
      content: `没找到相关${searchOption.value.title}`,
    });
  }
};

const onClickSearchIconButton = () => {
  submitSearch();
};

const onKeydownSearchField = () => {
  submitSearch();
};

const searchField = ref(null);

const focusSearchField = () => {
  (searchField.value as any).$el.querySelector('input').focus();
};

onMounted(() => {
  focusSearchField();
});

watch(
  () => searchOption.value,
  () => {
    focusSearchField();
  },
);
</script>

<style scoped>
@import './styles/app-search-field.css';
</style>
