<template>
  <div :class="subscriptionSignupContentClasses">
    <SubscriptionSignupCard
      v-for="product in subscriptionProducts"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import SubscriptionSignupCard from './subscription-signup-card.vue';
import store from '../../../app/app.store';

const subscriptionProducts = computed(
  () => store.getters['product/show/subscriptionProducts'],
);

const selectedSubscriptionType = computed(
  () => store.getters['product/select/selectedSubscriptionType'],
);

const subscriptionSignupContentClasses = computed(() => [
  'subscription-signup-content',
  {
    stack: selectedSubscriptionType.value,
  },
]);

// 调取订阅产品
store.dispatch('product/show/getSubscriptionProducts');
// 重置选择的订阅类型
store.commit('product/select/setSelectedSubscriptionType', '');
</script>

<style scoped>
@import './styles/subscription-signup-content.css';
</style>
