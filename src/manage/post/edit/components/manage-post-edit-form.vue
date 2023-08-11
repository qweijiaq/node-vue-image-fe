<template>
  <div class="manage-post-edit-form">
    <TextField
      v-model="currentEditedPost.title"
      placeholder="标题"
      @dirty="onDirty"
      v-if="isSingleSelect"
    />
    <TextareaField
      class="bordered"
      :rows="1"
      v-model="currentEditedPost.content"
      placeholder="描述"
      @dirty="onDirty"
      v-if="isSingleSelect"
    />
    <PostTagField :posts="selectedPosts" @updated="onUpdatedPostTagfield" />
    <div class="actions">
      <SubmitButton text="更新" :unsaved="unsaved" @submit="onSubmitButton" />
      <DeleteButton @delete="onDeleteButton" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../../app/app.store';
import TextField from '../../../../app/components/text-field.vue';
import TextareaField from '../../../../app/components/textarea-field.vue';
import SubmitButton from '../../../../app/components/submit-button.vue';
import DeleteButton from '../../../../app/components/delete-button.vue';
import PostTagField from '../../../../post/components/post-tag-field.vue';

const unsaved = ref(false);

const currentEditedPost = computed(
  () => store.getters['manage/select/currentEditedPost'],
);

const isSingleSelect = computed(
  () => store.getters['manage/select/isSingleSelect'],
);

const onDirty = () => {
  unsaved.value = true;
};

const onSubmitButton = async () => {
  if (!unsaved.value) return;

  try {
    await store.dispatch('post/edit/updatePost', {
      postId: currentEditedPost.value.id,
      data: currentEditedPost.value,
    });
    store.commit('post/index/setPostItem', currentEditedPost.value);
    unsaved.value = false;
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};
const onDeleteButton = () => {
  store.dispatch('manage/select/deleteSelectedPosts');
};

const selectedPosts = computed(
  () => store.getters['manage/select/selectedPosts'],
);

const onUpdatedPostTagfield = () => {
  store.dispatch('manage/select/getSelectedPosts');
};
</script>

<style scoped>
@import './styles/manage-post-edit-form.css';
</style>
