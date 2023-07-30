<template>
  <div class="post-show-file-meta-kit">
    <div class="icon">
      <appIcon name="camera_alt" />
    </div>
    <div class="content">
      <div class="kit" v-for="(item, index) in props.kit" :key="index">
        <div class="title">{{ item.title }}</div>
        <div class="value">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import appIcon from '../../../app/components/app-icon.vue';

interface KitTypeItem {
  title: string;
  value: string;
}

const props = defineProps({
  kit: {
    type: Array<KitTypeItem>,
  },
});
</script>

<style scoped>
@import url('./styles/post-show-file-meta-kit.css');
</style>
