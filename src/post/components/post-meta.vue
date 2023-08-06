<template>
  <div class="post-meta">
    <div class="actions">
      <router-link class="link" :to="previewLinkTo">
        查看“<i>{{ post!.title }}</i
        >”
      </router-link>
    </div>
    <div class="meta">
      <UserAvatar :user="post!.user" link="user" />
      <UserName :user="post!.user" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import UserAvatar from '../../user/components/user-avatar.vue';
import UserName from '../../user/components/user-name.vue';

const props = defineProps({
  post: {
    type: Object,
  },
});

const previewLinkTo = computed(() => ({
  name: 'postShow',
  params: {
    postId: props.post.id,
  },
}));
</script>

<style scoped>
@import './styles/post-meta.css';
</style>
