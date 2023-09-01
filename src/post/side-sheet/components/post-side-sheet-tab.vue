<template>
  <div class="post-side-sheet-tab" v-if="showPostSideSheetTab">
    <div
      :class="['item', { active: item.isActive }]"
      v-for="item in tabItems"
      :key="item.value"
    >
      <button class="button basic" @click="onClickTabButton(item.value)">
        {{ item.title }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';

const selectedProductType = computed(
  () => store.getters['product/select/selectedProductType'],
);
const hasLicenseProduct = computed(
  () => store.getters['product/show/hasLicenseProduct'],
);
const hasSubscriptionProducts = computed(
  () => store.getters['product/show/hasSubscriptionProducts'],
);
const canDownload = computed(() => store.getters['download/canDownload']);

const tabItems = computed(() => [
  {
    title: '许可',
    value: 'license',
    isActive: selectedProductType.value === 'license',
  },
  {
    title: '订阅',
    value: 'subscription',
    isActive: selectedProductType.value === 'subscription',
  },
]);

const showPostSideSheetTab = computed(() => {
  return (
    !canDownload.value &&
    hasLicenseProduct.value &&
    hasSubscriptionProducts.value
  );
});

const onClickTabButton = (value) => {
  store.commit('product/select/setSelectedProductType', value);
};
</script>

<style scoped>
@import './styles/post-side-sheet-tab.css';
</style>
