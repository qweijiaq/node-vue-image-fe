<template>
  <div class="app-qrcode" v-html="qrcodeSvg" :style="appQrcodeStyles"></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import QRcode from 'qrcode-svg';

const props = defineProps({
  // 二维码蕴含的链接
  content: {
    type: String,
    default: 'http://blog.wei-jia.top',
  },

  // 二维码内边距
  padding: {
    type: Number,
    default: 2,
  },

  // 二维码颜色
  color: {
    type: String,
    default: 'rgba(0, 0, 0, 0.9)',
  },

  // 二维码背景色
  background: {
    type: String,
    default: 'rgba(255, 255, 255, 0.1)',
  },

  // 二维码尺寸
  size: {
    type: Number,
    default: 128,
  },
});

// 二维码图片
const qrcodeSvg = computed(() => {
  const { content, size, padding, background, color } = props;

  const qrcode = new QRcode({
    content,
    container: 'svg-viewbox',
    join: true,
    width: size, // 生成时宽度
    height: size,
    padding,
    background,
    color,
  });

  return qrcode.svg();
});

// 二维码图片样式（展示宽度）
const appQrcodeStyles = computed(() => {
  return {
    width: `${props.size}px`,
  };
});
</script>

<style scoped>
@import './styles/app-qrcode.css';
</style>
