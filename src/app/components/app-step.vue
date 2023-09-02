<template>
  <div class="app-step">
    <div class="number">
      {{ number }}
    </div>
    <div class="text">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';

const props = defineProps({
  number: {
    type: Number,
  },

  title: {
    type: String,
  },
});
</script>

<style scoped>
@import './styles/app-step.css';
</style>
