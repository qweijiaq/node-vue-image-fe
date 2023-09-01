<template>
  <div class="post-side-sheet-footer">
    <ProductPrice
      v-if="showProductPrice"
      :price="selectedProduct.price"
      :salePrice="selectedProduct.salePrice"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import ProductPrice from '../../../product/components/product-price.vue';
import store from '../../../app/app.store';

const canDownload = computed(() => store.getters['download/canDownload']);
const selectedProduct = computed(
  () => store.getters['product/select/selectedProduct'],
);
const showProductPrice = computed(() => {
  return !canDownload.value && selectedProduct.value;
});
</script>

<style scoped>
@import './styles/post-side-sheet-footer.css';
</style>
