<template>
  <div class="post-show-header">
    <div class="content">
      <h1 class="text" @click="onClickPostTitle">{{ props.post?.title }}</h1>
      <div class="meta">
        <userName :user="props.post?.user" />
      </div>
    </div>
    <div class="small">
      <userAvatar :user="props.post?.user" size="medium" link="user" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import userAvatar from '../../../user/components/user-avatar.vue';
import userName from '../../../user/components/user-name.vue';
const props = defineProps({
  post: {
    type: Object,
  },
});

const emits = defineEmits(['click']);

const onClickPostTitle = () => {
  emits('click');
};
</script>

<style scoped>
@import url('./styles/post-show-header.css');
</style>
