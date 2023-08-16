<template>
  <div class="manage-post-list-item-media">
    <div class="link">
      <img class="image" :src="image" v-if="image" />
      <PostAuditAction
        class="compact"
        :post="item"
        @change="onChangeAuditAction"
        @click.stop
      />
      <ManagePostStatusAction :post="item" @click.stop />
      <ManagePostAuditActions
        v-if="canUseAdmin"
        :post="item"
        @click.stop
        @change="onChangeAuditAction"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import store from '../../../app/app.store';
import { getImageBase64 } from '../../../file/file.service';
import ManagePostStatusAction from './manage-post-status-action.vue';
import PostAuditAction from '../../../post/components/post-audit-action.vue';
import ManagePostAuditActions from './manage-post-audit-actions.vue';

const props = defineProps({
  item: {
    type: Object,
  },
});

const itemLinkTo = computed(() => ({
  name: 'postShow',
  params: {
    postId: props.item?.id,
  },
}));

const onChangeAuditAction = (audit) => {
  store.commit('post/index/setPostItem', { id: props.item?.id, audit });
};

const canUseAdmin = computed(() => store.getters['user/canUseAdmin']);

const image = ref(null) as any;
const getImage = async () => {
  image.value = await getImageBase64(props.item?.file.size.medium);
};
getImage();

watch(
  () => image.value,
  () => {
    getImage();
  },
);
</script>

<style scoped>
@import './styles/manage-post-list-item-media.css';
</style>
