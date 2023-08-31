<template>
  <div class="app-qrcode" v-html="qrcodeSvg" :style="appQrcodeStyles"></div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import QRcode from 'qrcode-svg';

const props = defineProps({
  content: {
    type: String,
    default: 'http://blog.wei-jia.top',
  },

  padding: {
    type: Number,
    default: 2,
  },

  color: {
    type: String,
    default: 'rgba(0, 0, 0, 0.9)',
  },

  background: {
    type: String,
    default: 'rgba(255, 255, 255, 0.1)',
  },

  size: {
    type: Number,
    default: 128,
  },
});

const qrcodeSvg = computed(() => {
  const content = props.content ? props.content : 'http://blog.wei-jia.top';

  const qrcode = new QRcode({
    content,
    container: 'svg-viewbox',
    join: true,
    width: props.size,
    height: props.size,
    padding: props.padding,
    background: props.background,
    color: props.color,
  });

  return qrcode.svg();
});

const appQrcodeStyles = computed(() => {
  return {
    width: `${props.size}px`,
  };
});
</script>

<style scoped>
@import './styles/app-qrcode.css';
</style>
