<template>
  <div class="comment-list-item-actions">
    <div class="action" v-if="props.item?.totalReplies">
      <div class="button basic" @click="onClickTotalRepliesBtn">
        {{ props.item?.totalReplies }} 条回复
        <appIcon :name="totalRepliesIconName" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import appIcon from '../../../app/components/app-icon.vue';

const props = defineProps({
  item: {
    type: Object,
  },
});

const emits = defineEmits(['toggle-replies']);

const showReplies = ref(false);

const onClickTotalRepliesBtn = () => {
  showReplies.value = !showReplies.value;
  emits('toggle-replies', showReplies.value);
};

const totalRepliesIconName = computed(() =>
  showReplies.value ? 'arrow_drop_up' : 'arrow_drop_down',
);
</script>

<style scoped>
@import url('./styles/comment-list-item-actions.css');
</style>
