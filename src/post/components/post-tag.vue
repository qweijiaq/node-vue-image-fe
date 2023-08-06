<template>
  <div class="post-tag">
    <div class="text">
      <router-link class="link" :to="tagNameLinkTo">
        {{ props.tag?.name }}
      </router-link>
    </div>
    <div class="action" v-if="useDeleteButton">
      <button class="button basic" @click="onClickDeleteBtn">
        <AppIcon name="close" size="14" color="#656565" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import AppIcon from '../../app/components/app-icon.vue';

const props = defineProps({
  tag: {
    type: Object,
  },
  useDeleteButton: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['delete']);

const tagNameLinkTo = computed(() => {
  return {
    name: 'postIndexPopular',
    query: {
      tag: props.tag?.name,
    },
  };
});

const onClickDeleteBtn = () => {
  emits('delete', props.tag?.id);
};
</script>

<style scoped>
@import url('./styles/post-tag.css');
</style>
