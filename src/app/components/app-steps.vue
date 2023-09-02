AppStep,
<template>
  <div class="app-steps">
    <AppStep
      v-for="(step, index) in steps"
      :key="step.name"
      :title="step.title"
      :number="index + 1"
      :class="{ active: current === step.name }"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import AppStep from './app-step.vue';
import { SubscriptionStep } from '../../subscription/signup/subscription-signup.store';

const props = defineProps({
  steps: {
    type: Array<SubscriptionStep>,
  },

  current: {
    type: String,
  },
});
</script>

<style scoped>
@import './styles/app-steps.css';
</style>
