    SubscriptionSignupContent,
<template>
  <div class="subscription-signup">
    <SubscriptionSignupHeader />
    <SubscriptionSignupContent />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import SubscriptionSignupHeader from './components/subscription-signup-header.vue';
import SubscriptionSignupContent from './components/subscription-signup-content.vue'
</script>

<style scoped>
@import './styles/subscription-signup.css';
</style>
