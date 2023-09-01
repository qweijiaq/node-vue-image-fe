<template>
  <div class="post-side-sheet-actions">
    <PaymentSelect v-if="!canDownload" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import PaymentSelect from '../../../payment/select/payment-select.vue';
import store from '../../../app/app.store';

const canDownload = computed(() => store.getters['download/canDownload']);
</script>

<style scoped>
@import './styles/post-side-sheet-actions.css';
</style>
