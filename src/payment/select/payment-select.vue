<template>
  <div class="payment-select">
    <CheckboxField
      v-for="{ name, meta: { buttonText, color } } in payments"
      :key="name"
      :class="['outline', color]"
      :value="name"
      :text="buttonText"
      name="status"
      type="radio"
      v-model="currentPayment"
    >
      <PaymentIcon class="extra" :name="name" />
    </CheckboxField>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import CheckboxField from '../../app/components/checkbox-field.vue';
import PaymentIcon from '../components/payment-icon.vue';
import store from '../../app/app.store';

const payments = computed(() => store.getters['payment/index/payments']);
const selectedPaymentName = computed(
  () => store.getters['payment/select/selectedPaymentName'],
);

const currentPayment = computed({
  get() {
    return selectedPaymentName.value;
  },
  set(value) {
    store.commit('payment/select/setSelectedPaymentName', value);
  },
});
</script>

<style scoped>
@import './styles/payment-select.css';
</style>
