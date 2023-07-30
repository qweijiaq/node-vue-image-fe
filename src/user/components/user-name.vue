<template>
  <div :class="userNameClasses">
    <div class="user-name-text">
      <router-link :to="userNameLinkTo" class="link">{{
        props.user?.name
      }}</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

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
  name: 'userShow',
  params: {
    userId: props.user?.id,
  },
}));
</script>

<style scoped>
@import url('./styles/user-name.css');
</style>
