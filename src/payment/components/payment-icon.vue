<template>
  <i :class="paymentIconClasses" :style="paymentIconStyles"></i>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: 'wxpay',
  },

  size: {
    type: Number,
    default: 24,
  },
});

const paymentIconClasses = computed(() => ['payment-icon', props.name]);

const paymentIconStyles = computed(() => {
  return {
    fontSize: `${props.size}px`,
  };
});
</script>

<style scoped>
@import './styles/payment-icon.css';
</style>
