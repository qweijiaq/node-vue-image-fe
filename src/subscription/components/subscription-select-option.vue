<template>
  <div
    :class="subscriptionSelectOptionClasses"
    @click="onClickSubscriptionSelectOption(option.meta.subscriptionType)"
  >
    <div class="header">
      <div class="title">{{ option.title }}</div>
      <div class="meta">
        <ProductPrice
          class="small right saved-bottom"
          :price="option.price"
          :salePrice="option.salePrice"
          :unit="option.meta.unit"
        />
      </div>
    </div>
    <div class="content">
      <div class="description">
        <div
          class="line"
          v-for="(line, index) in option.description"
          :key="index"
        >
          {{ line }}
        </div>
      </div>
    </div>
    <div class="icon">
      <SubscriptionIcon :color="option.meta.color" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import SubscriptionIcon from './subscription-icon.vue';
import ProductPrice from '../../product/components/product-price.vue';

const props = defineProps({
  option: {
    type: Object,
  },

  isActive: {
    type: Boolean,
  },
});

const emits = defineEmits(['change']);

const subscriptionSelectOptionClasses = computed(() => [
  'subscription-select-option',
  { active: props.isActive },
]);

const onClickSubscriptionSelectOption = (type) => {
  emits('change', type);
};
</script>

<style scoped>
@import './styles/subscription-select-option.css';
</style>
