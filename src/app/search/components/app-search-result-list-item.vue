<template>
  <div class="app-search-result-list-item">
    <div class="thumbnail" v-if="showThumbnail">
      <UserAvatar :user="item.extra" link="user" />
    </div>
    <div class="title">
      <router-link class="link" :to="item.link">
        {{ item.title }}
      </router-link>
    </div>
    <div class="meta">
      {{ item.meta }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../app.store';
import UserAvatar from '../../../user/components/user-avatar.vue';

const props = defineProps({
  item: {
    type: Object,
  },
});

const searchOption = computed(() => store.getters['search/searchOption']);

const showThumbnail = () => {
  return searchOption.value == 'users';
};
</script>

<style scoped>
@import './styles/app-search-result-list-item.css';
</style>
