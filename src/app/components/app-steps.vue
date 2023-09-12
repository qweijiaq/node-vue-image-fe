AppStep,
<template>
  <div class="app-steps">
    <AppStep
      v-for="(step, index) in props.steps"
      :key="step.name"
      :title="step.title"
      :number="index + 1"
      :class="{ active: props.current === step.name }"
    />
  </div>
</template>

<script lang="ts" setup>
import AppStep from './app-step.vue';
import { SubscriptionStep } from '../../subscription/signup/subscription-signup.store';

const props = defineProps({
  // 订阅步骤数组
  steps: {
    type: Array<SubscriptionStep>,
  },

  // 当前步骤
  current: {
    type: String,
  },
});
</script>

<style scoped>
@import './styles/app-steps.css';
</style>
