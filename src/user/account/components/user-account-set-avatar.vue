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
        <FileField
          :text="avatarFileFieldText"
          size="large"
          name="avatar"
          fileType="image/jpeg"
          @change="onChangeAvatarFileField"
        />
        <ButtonField
          v-if="data.avatarFile"
          text="取消"
          size="large"
          type="outline"
          @click="onClickCancelButton"
        />
        <ButtonField text="提交" size="large" @click="onClickSubmitBtn" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ButtonField from '@/app/components/button-field.vue';
import FileField from '@/app/components/file-field.vue';
import { reactive, computed } from 'vue';
import store from '../../../app/app.store';

const data = reactive({
  avatarFile: null, // 用户选择的头像文件
});

// 获取头像预览图片
const avatarPreviewImage = computed(
  () => store.getters['user/account/avatarPreviewImage'],
);

const avatarFileFieldText = computed(() =>
  data.avatarFile ? '重新选择' : '选择头像',
);

// 点击提交按钮
const onClickSubmitBtn = async () => {
  try {
    await store.dispatch('user/account/createAvatar', data.avatarFile);
    store.dispatch('notification/pushMessage', {
      content: '设置头像成功',
    });
    data.avatarFile = null;
  } catch (error) {
    store.dispatch('notification/pushMessage', {
      content: '设置头像时出错了',
    });
  }
};

// 点击取消按钮
const onClickCancelButton = () => {
  store.commit('user/account/setAvatarPreviewImage', '');
  data.avatarFile = null;
};

// 创建头像预览
// eslint-disable-next-line
const createAvatarPreviewImage = (file: any) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = (event) => {
    // 设置头像预览图片
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
