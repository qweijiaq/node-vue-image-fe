<template>
  <div class="post-list-layout-switcher">
    <postListLayoutIcon
      v-for="(icon, index) in data.icons"
      :key="index"
      :name="icon"
      @click="onClickPostListLayoutIcon"
    />
  </div>
</template>

<script lang="ts" setup>
import postListLayoutIcon from './post-list-layout-icon.vue';
import { reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const data = reactive({
  icons: ['stackable', 'flow', 'stackable-minimal', 'flow-minimal'],
});

const onClickPostListLayoutIcon = (icon: string) => {
  store.commit('post/index/setLayout', icon);
};
</script>

<style scoped></style>
