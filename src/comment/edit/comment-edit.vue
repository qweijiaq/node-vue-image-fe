<template>
  <div class="comment-edit">
    <TextareaField v-model="commentContent" />
    <div class="actions">
      <button class="button pill" @click="onClickCancelBtn">取消</button>
      <button class="button pill" @click="onClickUpdateBtn">更新</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../app/app.store';
import TextareaField from '../../app/components/textarea-field.vue';

const props = defineProps({
  comment: {
    type: Object,
  },
});

const commentContent = ref(props.comment?.content);

const onClickCancelBtn = () => {
  commentContent.value = props.comment?.content;
};

const emits = defineEmits(['updated']);

const onClickUpdateBtn = async () => {
  if (!commentContent.value.trim()) return;
  try {
    await store.dispatch('comment/edit/updateComment', {
      commentId: props.comment.id,
      content: commentContent.value,
    });
    emits('updated', commentContent.value);
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};
</script>

<style scoped>
@import './styles/comment-edit.css';
</style>
