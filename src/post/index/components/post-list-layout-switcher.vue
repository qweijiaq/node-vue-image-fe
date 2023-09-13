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
import { reactive } from 'vue';
import store from '../../../app/app.store';
import postListLayoutIcon from './post-list-layout-icon.vue';

const data = reactive({
  icons: ['stackable', 'flow', 'stackable-minimal', 'flow-minimal'],
});

// 点击布局按钮
const onClickPostListLayoutIcon = (icon: string) => {
  store.commit('post/index/setLayout', icon);
};
</script>

<style scoped></style>
