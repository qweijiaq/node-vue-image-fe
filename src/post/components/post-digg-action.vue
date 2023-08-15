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

const isLogin = computed(() => store.getters['auth/isLogin']);

const onClickDiggButton = () => {
  if (!isLogin.value) {
    return store.dispatch('notification/pushMessage', {
      content: '请先登录',
    });
  }

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
