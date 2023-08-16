<template>
  <div class="manage-post-edit-selected-list-item">
    <div class="small">
      <img class="image" :src="image" v-if="image" />
      <ManagePostStatusAction :post="item" />
    </div>
    <div class="actions">
      <CircleButton
        icon="remove_circle_outline"
        @click="onClickRemoveButton(item)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import ManagePostStatusAction from '../components/manage-post-status-action.vue';
import CircleButton from '../../../app/components/circle-button.vue';
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
