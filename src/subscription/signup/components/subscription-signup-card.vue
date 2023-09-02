<template>
  <div class="subscription-signup-card" v-if="showSubscriptionSignupCard">
    <SubscriptionCard
      :class="subscriptionCardClasses"
      :style="subscriptionCardStyles"
    >
      <template #thumbnail
        ><SubscriptionIcon size="large" :color="color"
      /></template>
      <template #header>
        {{ product!.title }}
      </template>
      <template #meta>
        <ProductPrice
          :price="product!.price"
          :salePrice="product!.salePrice"
          :unit="product!.unit"
        />
      </template>
      <template #description>
        <div
          class="line"
          v-for="(line, index) in product!.description"
          :key="index"
        >
          {{ line }}
        </div>
      </template>
      <template #action>
        <button class="button outline" @click="onClickActionButton">
          {{ actionButtonText }}
        </button>
      </template>
    </SubscriptionCard>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import SubscriptionIcon from '../../components/subscription-icon.vue';
import ProductPrice from '../../../product/components/product-price.vue';
import SubscriptionCard from '../../components/subscription-card.vue';
import store from '../../../app/app.store';

const props = defineProps({
  product: {
    type: Object,
  },
});

const selectedSubscriptionType = computed(
  () => store.getters['product/select/selectedSubscriptionType'],
);

const subscriptionType = computed(() => props.product!.meta.subscriptionType);

const color = computed(() => props.product!.meta.color);

const subscriptionCardClasses = computed(() => [
  'colored',
  'shadow',
  { stack: selectedSubscriptionType.value },
]);

const subscriptionCardStyles = computed(() => ({
  '--color': color.value,
}));

const currentStepName = computed(
  () => store.getters['subscription/signup/currentStepName'],
);

const isSelected = computed(
  () => subscriptionType.value === selectedSubscriptionType.value,
);

const actionButtonText = computed(() => {
  let actionButtonText = '选择';

  if (isSelected.value) {
    actionButtonText = '重新选择';
  }

  return actionButtonText;
});

const showSubscriptionSignupCard = computed(() =>
  selectedSubscriptionType.value ? isSelected.value : true,
);

const onClickActionButton = () => {
  if (!selectedSubscriptionType.value) {
    store.commit(
      'product/select/setSelectedSubscriptionType',
      subscriptionType.value,
    );
    store.commit('subscription/signup/setCurrentStepName', 'payment');
    return;
  }

  if (currentStepName.value === 'payment') {
    store.commit('product/select/setSelectedSubscriptionType', '');
    store.commit('subscription/signup/setCurrentStepName', 'select');
    return;
  }
};
</script>

<style scoped>
@import './styles/subscription-signup-card.css';
</style>
