<template>
  <div class="post-side-sheet-content-license" v-if="hasLicenseProduct">
    <div
      class="line"
      v-for="(line, index) in licenseProduct.description"
      :key="index"
    >
      {{ line }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';

const hasLicenseProduct = computed(
  () => store.getters['product/show/hasLicenseProduct'],
);
const licenseProduct = computed(
  () => store.getters['product/show/licenseProduct'],
);
</script>

<style scoped>
@import './styles/post-side-sheet-content-license.css';
</style>
