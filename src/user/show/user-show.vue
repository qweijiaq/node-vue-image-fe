<template>
  <div class="user-show" v-if="user">
    <div class="user-show-header">
      <userAvatar :user="user" size="large" />
      <userName :user="user" size="large" />
    </div>
    <userShowMenu :user="user" />
    <div class="user-show-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed, watch } from 'vue';
import userAvatar from '../components/user-avatar.vue';
import userName from '../components/user-name.vue';
import userShowMenu from './components/user-show-menu.vue';

const store = useStore();

const props = defineProps({
  userId: {
    type: String,
  },
});

const user = computed(() => store.getters['user/show/user']);

watch(
  props,
  () => {
    store.dispatch('user/show/getUserById', props.userId);
  },
  { deep: true },
);

store.dispatch('user/show/getUserById', props.userId);
</script>

<style scoped>
@import url('./styles/user-show.css');
</style>
