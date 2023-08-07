<template>
  <div class="post-digg-action">
    <div class="icon">
      <button class="button basic" @click="onClickDiggButton">
        <appIcon :name="diggIcon" />
      </button>
    </div>
    <div class="text" v-if="post.totalDiggs">
      {{ post.totalDiggs }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../app/app.store';
import AppIcon from '../../app/components/app-icon.vue';

const props = defineProps({
  post: {
    type: Object,
  },
});

const diggIcon = computed(() =>
  props.post?.digged ? 'favorite' : 'favorite_border',
);

const onClickDiggButton = () => {
  if (props.post?.digged) {
    store.dispatch('digg/destroy/deleteUserDiggPost', {
      postId: props.post.id,
    });
  } else {
    store.dispatch('digg/create/createUserDiggPost', {
      postId: props.post?.id,
    });
  }
};
</script>

<style scoped>
@import './styles/post-digg-action.css';
</style>
