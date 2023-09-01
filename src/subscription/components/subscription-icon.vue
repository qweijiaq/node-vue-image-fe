<template>
  <i :class="['subscription-icon', icon]" :style="subscriptionIconStyles"></i>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';

const props = defineProps({
  size: {
    type: String,
  },

  color: {
    type: String,
  },
});

const icon = computed(() => {
  let icon = 'diamond';

  if (props.size === 'large') {
    icon = 'diamond-64';
  }

  return icon;
});

const subscriptionIconStyles = computed(() => {
  let styleObject: any = { color: props.color };

  if (props.size) {
    styleObject = {
      ...styleObject,
      fontSize: `${props.size}px`,
    };
  }

  return styleObject;
});
</script>

<style scoped>
@import './styles/subscription-icon.css';
</style>
