<template>
  <div class="product-price">
    <div class="price through" v-if="saved">
      <span class="symbol">{{ symbol }}</span>
      <span class="value">{{ price }}</span>
      <span class="unit" v-if="unit">{{ unit }}</span>
    </div>
    <div class="price sale">
      <span class="symbol">{{ symbol }}</span>
      <span class="value">{{ salePrice }}</span>
      <span class="unit" v-if="unit">{{ unit }}</span>
      <span class="saved" v-if="saved">节省: {{ saved }}%</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';

const props = defineProps({
  symbol: {
    type: String,
    default: '¥',
  },

  unit: {
    type: String,
  },

  price: {
    type: String,
    default: '0.00',
  },

  salePrice: {
    type: String,
    default: '0.00',
  },
});

const saved = computed(() => {
  const salePrice = parseFloat(parseFloat(props.salePrice).toFixed(2));
  const price = parseFloat(parseFloat(props.price).toFixed(2));
  const discount = parseFloat((salePrice / price).toFixed(2));

  return Math.round(100 - discount * 100);
});
</script>

<style scoped>
@import './styles/product-price.css';
</style>
