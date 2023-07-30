<template>
  <postListFilters v-if="filterItems.length" :filters="filterItems" />
  <postList :sort="sort" :filter="filter" />
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import postList from './components/post-list.vue';
import postListFilters from './components/post-list-filters.vue';

const store = useStore();

const props = defineProps({
  sort: {
    type: String,
  },
  filter: {
    type: Object,
  },
});

const filterItems = computed(() => store.getters['post/index/filterItems']);
</script>
