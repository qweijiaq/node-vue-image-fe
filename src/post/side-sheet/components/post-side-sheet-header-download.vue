<template>
  <div class="post-side-sheet-header-download">
    <div class="media">
      <div :class="imageClasses">
        <AppQrcode :content="qrcodeContent" />
      </div>
      <div class="action" v-if="!qrcodeContent">
        <button class="button basic" @click="onClickGenerateButton">
          <AppIcon name="autorenew" color="#000000" />
        </button>
      </div>
    </div>
    <div class="header">下载原图</div>
    <div class="description">扫码二维码下载或点击图标下载</div>
    <div class="action">
      <button class="button basic" @click="onClickDownloadButton">
        <AppIcon name="cloud_download" color="#ffffff3e" :size="32" />
      </button>
      <a :href="fileDownloadUrl" ref="downloadLink"></a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onUnmounted } from 'vue';
import AppQrcode from '../../../app/components/app-qrcode.vue';
import AppIcon from '../../../app/components/app-icon.vue';
import store from '../../../app/app.store';
import { socket } from '../../../app/app.service';

const fileDownloadUrl = computed(
  () => store.getters['download/create/fileDownloadUrl'],
);

const download = computed(() => store.getters['download/create/download']);

const sideSheetProps = computed(() => store.getters['layout/sideSheetProps']);

const post = computed(() => sideSheetProps.value.post);

const generateDownload = async () => {
  try {
    await store.dispatch('download/create/createDownload', {
      fileId: post.value.file.id,
      data: {
        resourceType: 'post',
        resourceId: post.value.id,
      },
    });
  } catch (error) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};

const downloadLink = ref(null);

const onClickDownloadButton = async () => {
  if (download.value) {
    (downloadLink.value as any).click();
    store.dispatch('notification/pushMessage', {
      content: '正在生成下载，请稍候',
    });
  } else {
    await generateDownload();
    (downloadLink.value as any).click();
    store.dispatch('notification/pushMessage', {
      content: '正在生成下载，请稍候',
    });
  }
};

const qrcodeContent = ref('');

const imageClasses = computed(() => ['image', { mask: !qrcodeContent.value }]);

const onClickGenerateButton = async () => {
  await generateDownload();

  if (download.value) [(qrcodeContent.value = fileDownloadUrl.value)];
};

const onFileDownloadUsed = ({ id }) => {
  if (download.value.id === id) {
    console.log('on file download used', id);
    store.commit('download/create/setDownload', null);
    store.commit('download/create/setFileDownloadUrl', '');
    qrcodeContent.value = '';
  }
};

socket.on('fileDownloadUsed', onFileDownloadUsed);

onUnmounted(() => {
  socket.off('fileDownloadUsed', onFileDownloadUsed);
});
</script>

<style scoped>
@import './styles/post-side-sheet-header-download.css';
</style>
