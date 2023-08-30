<template>
  <div class="post-show-file-meta-specs">
    <div class="icon">
      <AppIcon name="camera-alt" />
    </div>
    <div class="content">
      <div class="spec" v-for="(spec, index) in props.specs" :key="index">
        <div class="title">{{ spec.title }}</div>
        <div class="value">
          {{ spec.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppIcon from '../../../app/components/app-icon.vue';

interface SpecsTypeItem {
  title: string;
  value: string;
}

const props = defineProps({
  specs: {
    type: Array<SpecsTypeItem>,
  },
});
</script>

<style scoped>
@import url('./styles/post-show-file-meta-specs.css');
</style>
