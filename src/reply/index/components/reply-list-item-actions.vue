<template>
  <div class="reply-list-item-actions">
    <div class="action" v-if="showOwnReplyOperation">
      <button class="button basic" @click="onClickDeleteBtn">
        {{ deleteButtonText }}
      </button>
    </div>
    <div class="action" v-if="showOwnReplyOperation">
      <button class="button basic" @click="onClickUpdateBtn">
        {{ updateButtonText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';

const props = defineProps({
  item: {
    type: Object,
  },
  showOperations: {
    type: Boolean,
  },
  comment: {
    type: Object,
  },
  isEditing: {
    type: Boolean,
  },
});

const emits = defineEmits(['editing']);

const confirmDelete = ref(false);

const currentUser = computed(() => store.getters['user/currentUser']);
const showOwnReplyOperation = computed(() => {
  return (
    currentUser.value &&
    currentUser.value.id === props.item?.user.id &&
    props.showOperations
  );
});
const deleteButtonText = computed(() =>
  confirmDelete.value ? '确定删除' : '删除',
);

const onClickDeleteBtn = async () => {
  if (confirmDelete.value) {
    try {
      await store.dispatch('comment/destroy/deleteComment', {
        commentId: props.item.id,
      });
      store.commit('reply/index/removeReplyItem', {
        commentId: props.comment.id,
        replyId: props.item.id,
      });
      store.commit('comment/index/decreaseTotalReplies', props.comment.id);
    } catch (error: any) {
      store.dispatch('notification/pushMessage', {
        content: error.data.message,
      });
    }
  }

  confirmDelete.value = !confirmDelete.value;
};

const updateButtonText = computed(() =>
  props.isEditing ? '取消编辑' : '编辑',
);

const onClickUpdateBtn = () => emits('editing');
</script>

<style scoped>
@import './styles/reply-list-item-actions.css';
</style>
