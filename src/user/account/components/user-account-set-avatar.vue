<template>
  <div class="user-account-set-avatar">
    <div class="form">
      <h2 class="header">设置头像</h2>
      <div class="field" v-if="data.avatarFile">
        <div class="user-avatar large">
          <img class="image" :src="avatarPreviewImage" alt="" />
        </div>
      </div>
      <div class="fields">
        <fileField
          :text="avatarFileFieldText"
          size="large"
          name="avatar"
          fileType="image/jpeg"
          @change="onChangeAvatarFileField"
        />
        <buttonField
          v-if="data.avatarFile"
          text="取消"
          size="large"
          type="outline"
          @click="onClickCancelButton"
        />
        <buttonField text="提交" size="large" @click="onClickSubmitBtn" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import buttonField from '@/app/components/button-field.vue';
import fileField from '@/app/components/file-field.vue';
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const data = reactive({
  avatarFile: null,
});

const avatarPreviewImage = computed(
  () => store.getters['user/account/avatarPreviewImage'],
);

const avatarFileFieldText = computed(() =>
  data.avatarFile ? '重新选择' : '选择头像',
);

const onClickSubmitBtn = async () => {
  try {
    await store.dispatch('user/account/createAvatar', data.avatarFile);
    store.dispatch('notification/pushMessage', {
      content: '设置头像成功',
    });
    data.avatarFile = null;
  } catch (e) {
    store.dispatch('notification/pushMessage', {
      content: '设置头像出错了',
    });
  }
};

const onClickCancelButton = () => {
  store.commit('user/account/setAvatarPreviewImage', '');
  data.avatarFile = null;
};

// eslint-disable-next-line
const createAvatarPreviewImage = (file: any) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = (event) => {
    store.commit('user/account/setAvatarPreviewImage', event.target?.result);
  };
};

// eslint-disable-next-line
const onChangeAvatarFileField = (files: any) => {
  if (files.length) {
    data.avatarFile = files[0];
    createAvatarPreviewImage(files[0]);
  }
};
</script>

<style scoped></style>
