<template>
  <div :class="userNameClasses">
    <div class="text">
      <router-link :to="userNameLinkTo" class="link">{{
        props.user?.name
      }}</router-link>
    </div>
    <div class="icon" v-if="hasSubscription">
      <router-link class="link" :to="subscriptionIconLinkTo">
        <SubscriptionIcon :color="subscriptionIconColor" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import SubscriptionIcon from '../../subscription/components/subscription-icon.vue';
import {
  STANDARD_SUBSCRIPTION_COLOR,
  PRO_SUBSCRIPTION_COLOR,
} from '../../app/app.config';

const props = defineProps({
  user: {
    type: Object,
  },
  size: {
    type: String,
  },
});

const userNameClasses = computed(() => ['user-name', props.size]);
const userNameLinkTo = computed(() => ({
  name: 'userPosts',
  params: {
    userId: props.user?.id,
  },
}));

const hasSubscription = computed(() =>
  props.user.subscription ? true : false,
);

const subscriptionIconLinkTo = computed(() => ({ name: 'subscription' }));

const subscriptionIconColor = computed(() => {
  let color = '';

  const { subscription } = props.user;

  if (hasSubscription.value && subscription.status === 'valid') {
    switch (subscription.type) {
      case 'standard':
        color = STANDARD_SUBSCRIPTION_COLOR;
        break;
      case 'pro':
        color = PRO_SUBSCRIPTION_COLOR;
        break;
    }
  }

  return color;
});
</script>

<style scoped>
@import url('./styles/user-name.css');
</style>
