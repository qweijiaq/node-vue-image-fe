<template>
  <div class="subscription-select">
    <SubscriptionSelectOption
      v-for="option in subscriptionProducts"
      :key="option.meta.subscriptiontype"
      :option="option"
      @change="onChangeSubscriptionSelectOption"
      :isActive="option.meta.subscriptionType === selectedSubscriptionType"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import SubscriptionSelectOption from './subscription-select-option.vue';
import store from '../../app/app.store';

const subscriptionProducts = computed(
  () => store.getters['product/show/subscriptionProducts'],
);
const selectedSubscriptionType = computed(
  () => store.getters['product/select/selectedSubscriptionType'],
);

const onChangeSubscriptionSelectOption = (type) => {
  store.commit('product/select/setSelectedSubscriptionType', type);
};
</script>

<style scoped>
@import './styles/subscription-select.css';
</style>
