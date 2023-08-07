<template>
  <div class="post-show-actions">
    <PostDiggAction class="action" :post="post" />
    <div class="action">
      <div class="icon">
        <button class="button basic" @click="onClickCommentsBtn">
          <appIcon name="comment" />
        </button>
      </div>
      <div class="text" v-if="post?.totalComments">
        {{ post?.totalComments }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import appIcon from '../../../app/components/app-icon.vue';
import PostDiggAction from '../../components/post-digg-action.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const props = defineProps({
  post: {
    type: Object,
  },
});

const sideSheetComponent = computed(
  () => store.getters['layout/sideSheetComponent'],
);

if (sideSheetComponent.value) {
  store.commit('layout/setSideSheetProps', {
    filter: {
      post: props.post?.id,
    },
  });
}

const onClickCommentsBtn = () => {
  if (sideSheetComponent.value) {
    store.commit('layout/resetSideSheetComponent');
  } else {
    store.commit('layout/setSideSheetComponent', 'CommentSideSheet');
    store.commit('layout/setSideSheetProps', {
      filter: {
        post: props.post?.id,
      },
    });
  }
};
</script>

<style scoped>
@import url('./styles/post-show-actions.css');
</style>
