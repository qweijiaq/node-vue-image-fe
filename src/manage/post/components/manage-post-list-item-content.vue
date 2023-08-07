<template>
  <div class="manage-post-list-item-content">
    <div class="small">
      <UserAvatar :user="item?.user" link="user" />
    </div>
    <div class="meta">
      <UserName :user="item?.user" />
    </div>
    <div class="header">
      <div class="text">
        <router-link class="link" :to="itemTitleLinkTo">
          {{ item?.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import UserAvatar from '../../../user/components/user-avatar.vue';
import UserName from '../../../user/components/user-name.vue';
import store from '../../../app/app.store';

const props = defineProps({
  item: {
    type: Object,
  },
});

const itemTitleLinkTo = computed(() => ({
  name: 'postShow',
  params: {
    postId: props.item?.id,
  },
}));
</script>

<style scoped>
@import './styles/manage-post-list-item-content.css';
</style>
