<template>
  <div class="comment-list-item-actions">
    <div class="action" v-if="props.item?.totalReplies">
      <button class="button basic" @click="onClickTotalRepliesBtn">
        {{ props.item?.totalReplies }} 条回复
        <appIcon :name="totalRepliesIconName" />
      </button>
    </div>
    <div class="action">
      <button class="button basic" @click="onClickReplyBtn">
        {{ replyBtnText }}
      </button>
    </div>
    <div class="action" v-if="showOwnCommentOperation">
      <button class="button basic" @click="onClickDeleteBtn">
        {{ deleteBtnText }}
      </button>
    </div>
    <div class="action" v-if="showOwnCommentOperation">
      <button class="button basic" @click="onClickUpdateBtn">
        {{ updateBtnText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import store from '../../../app/app.store';
import appIcon from '../../../app/components/app-icon.vue';

const props = defineProps({
  item: {
    type: Object,
  },
  showOperations: {
    type: Boolean,
  },
  isEditing: {
    type: Boolean,
  },
  isReplying: {
    type: Boolean,
  },
});

const emits = defineEmits(['toggle-replies', 'editing', 'replying']);

const showReplies = ref(false);

const onClickTotalRepliesBtn = () => {
  showReplies.value = !showReplies.value;
  emits('toggle-replies', showReplies.value);
};

const totalRepliesIconName = computed(() =>
  showReplies.value ? 'arrow_drop_up' : 'arrow_drop_down',
);

const currentUser = computed(() => store.getters['user/currentUser']);

const showOwnCommentOperation = computed(() => {
  return (
    currentUser.value &&
    currentUser.value.id === props.item?.user.id &&
    props.showOperations
  );
});

const confirmDelete = ref(false);

const deleteBtnText = computed(() =>
  confirmDelete.value ? '确定删除' : '删除',
);

const onClickDeleteBtn = async () => {
  if (confirmDelete.value) {
    try {
      await store.dispatch('comment/destroy/deleteComment', {
        commentId: props.item?.id,
      });
      store.commit('comment/index/removeCommentItem', props.item?.id);
    } catch (error: any) {
      store.dispatch('notification/pushMessage', {
        content: error.data.message,
      });
    }
  }
  confirmDelete.value = !confirmDelete.value;
};

const updateBtnText = computed(() => (props.isEditing ? '取消编辑' : '编辑'));

const onClickUpdateBtn = () => {
  emits('editing');
};

const replyBtnText = computed(() => (props.isReplying ? '取消回复' : '回复'));

const onClickReplyBtn = () => {
  emits('replying');
};
</script>

<style scoped>
@import url('./styles/comment-list-item-actions.css');
</style>
