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
    <div class="section status">
      <CheckboxField
        v-for="{ text, value } in statusFields"
        :key="value"
        :value="value"
        :text="text"
        name="status"
        type="radio"
        v-model="postStatus"
      />
    </div>
    <div class="actions">
      <SubmitButton text="更新" :unsaved="unsaved" @submit="onSubmitButton" />
      <DeleteButton @delete="onDeleteButton" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, watch } from 'vue';
import store from '../../../../app/app.store';
import TextField from '../../../../app/components/text-field.vue';
import TextareaField from '../../../../app/components/textarea-field.vue';
import SubmitButton from '../../../../app/components/submit-button.vue';
import DeleteButton from '../../../../app/components/delete-button.vue';
import PostTagField from '../../../../post/components/post-tag-field.vue';
import CheckboxField from '../../../../app/components/checkbox-field.vue';

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

const onDeleteButton = () => {
  store.dispatch('manage/select/deleteSelectedPosts');
};

const selectedPosts = computed(
  () => store.getters['manage/select/selectedPosts'],
);

const onUpdatedPostTagfield = () => {
  store.dispatch('manage/select/getSelectedPosts');
};

const statusFields = ref([
  {
    value: 'draft',
    text: '私有',
  },
  {
    value: 'published',
    text: '公开',
  },
]);

const selectedStatus = ref(null);
const isMultiSelect = computed(
  () => store.getters['manage/select/isMultiSelect'],
);
const postStatus = computed({
  get() {
    return isMultiSelect.value
      ? selectedStatus.value
      : currentEditedPost.value.status;
  },
  set(value) {
    if (isMultiSelect.value) {
      selectedStatus.value = value;
    } else {
      currentEditedPost.value.status = value;
    }

    unsaved.value = true;
  },
});

if (isMultiSelect.value) {
  selectedStatus.value = null;
} else {
  selectedStatus.value = currentEditedPost.value.status;
}

watch(
  () => isMultiSelect.value,
  (value) => {
    if (value) {
      selectedStatus.value = null;
    } else {
      unsaved.value = false;
    }
  },
);

const submitUpdatePost = async () => {
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

const batchUpdatePost = async () => {
  if (!selectedStatus.value) return;

  for (const post of selectedPosts.value) {
    if (post.status === selectedStatus.value) continue;

    try {
      await store.dispatch('post/edit/updatePost', {
        postId: post.id,
        data: {
          status: selectedStatus.value,
        },
      });

      store.commit('post/index/setPostItem', {
        id: post.id,
        status: selectedStatus.value,
      });
      unsaved.value = false;
    } catch (error) {
      continue;
    }
  }

  store.dispatch('manage/select/getSelectedPosts');
};

const onSubmitButton = async () => {
  if (!unsaved.value) return;

  if (isMultiSelect.value) {
    batchUpdatePost();
  } else {
    submitUpdatePost();
  }
};
</script>

<style scoped>
@import './styles/manage-post-edit-form.css';
</style>
