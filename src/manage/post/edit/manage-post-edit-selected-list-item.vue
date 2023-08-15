<template>
  <div class="manage-post-edit-selected-list-item">
    <div class="small">
      <img class="image" :src="image" v-if="image" />
      <ManagePostStatusAction :post="item" />
    </div>
    <div class="actions">
      <button class="button basic circle" @click="onClickRemoveButton(item)">
        <AppIcon name="remove_circle_outline" color="#fff" size="16" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import AppIcon from '../../../app/components/app-icon.vue';
import ManagePostStatusAction from '../../components/manage-selected-status.vue';
import { getImageBase64 } from '../../../file/file.service';

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

const onClickRemoveButton = (post) => {
  store.dispatch('manage/select/manageSelectedItems', {
    resourceType: 'post',
    item: post.id,
    actionType: 'remove',
  });
};
</script>

<style scoped>
@import './styles/manage-post-edit-selected-list-item.css';
</style>
