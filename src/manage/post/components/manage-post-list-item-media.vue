<template>
  <div class="manage-post-list-item-media">
    <div class="link">
      <img class="image" :src="image" v-if="image" />
      <ManagePostStatusAction :post="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { getImageBase64 } from '../../../file/file.service';
import ManagePostStatusAction from './manage-post-status-action.vue';

const props = defineProps({
  item: {
    type: Object,
  },
});

const image = ref(null) as any;
const getImage = async () => {
  image.value = await getImageBase64(props.item?.file.size.medium);
};
getImage();

const itemLinkTo = computed(() => ({
  name: 'postShow',
  params: {
    postId: props.item?.id,
  },
}));
</script>

<style scoped>
@import './styles/manage-post-list-item-media.css';
</style>
