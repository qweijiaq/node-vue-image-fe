<template>
  <div class="post-side-sheet-content-subscription">
    <SubscriptionSelect />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import SubscriptionSelect from '../../../subscription/components/subscription-select.vue';
</script>

<style scoped>
@import './styles/post-side-sheet-content-subscription.css';
</style>
