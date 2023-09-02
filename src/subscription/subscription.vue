<template>
  <div class="subscription">
    <SubscriptionSignup />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import SubscriptionSignup from './signup/subscription-signup.vue';
</script>

<style scoped>
@import './styles/subscription.css';
</style>
