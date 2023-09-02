<template>
  <div class="post-side-sheet-header-payment" v-if="selectedPayment">
    <div class="media">
      <div class="image">
        <AppQrcode :content="qrcodeContent" />
      </div>
    </div>
    <div class="header">
      {{ headerText }}
    </div>
    <div class="description">
      {{ selectedPayment.description }}
    </div>
    <div class="action">
      <button class="button basic" @click="onClickPaymentIconButton">
        <PaymentIcon :name="selectedPayment.name" :size="32" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import AppQrcode from '../../../app/components/app-qrcode.vue';
import PaymentIcon from '../../../payment/components/payment-icon.vue';

const selectedPayment = computed(
  () => store.getters['payment/select/selectedPayment'],
);
const selectedPaymentName = computed(
  () => store.getters['payment/select/selectedPaymentName'],
);
const payments = computed(() => store.getters['payment/index/payments']);

const selectedProduct = computed(
  () => store.getters['product/select/selectedProduct'],
);

const headerText = computed(() => {
  let headerText = '支付';

  if (selectedProduct.value) {
    headerText = `支付${selectedProduct.value.title}`;
  }
  return headerText;
});

const onClickPaymentIconButton = () => {
  // 当前支付方法索引
  let index = payments.value.findIndex(
    (payment) => payment.name === selectedPaymentName.value,
  );

  // 往后移一个或重新开始
  if (index + 1 === payments.value.length) {
    index = 0;
  } else {
    index++;
  }

  // 设置选择的支付方法
  store.commit(
    'payment/select/setSelectedPaymentName',
    payments.value[index].name,
  );
};

const prePay = computed(() => store.getters['order/pay/prePay']);
const qrcodeContent = computed(() =>
  prePay.value ? prePay.value.codeUrl : null,
);
</script>

<style scoped>
@import './styles/post-side-sheet-header-payment.css';
</style>
