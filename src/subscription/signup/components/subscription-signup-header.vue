<template>
  <div class="subscription-signup-header">
    <div class="title">
      {{ currentStep.title }}
    </div>
    <div class="description">
      {{ currentStep.description }}
    </div>
    <div class="content">
      <AppSteps :steps="steps" :current="currentStepName" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import AppSteps from '../../../app/components/app-steps.vue';

const currentStep = computed(
  () => store.getters['subscription/signup/currentStep'],
);
const steps = computed(() => store.getters['subscription/signup/steps']);
const currentStepName = computed(
  () => store.getters['subscription/signup/currentStepName'],
);
</script>

<style scoped>
@import './styles/subscription-signup-header.css';
</style>
