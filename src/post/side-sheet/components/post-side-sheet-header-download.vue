<template>
  <div class="post-side-sheet-header-download">
    <div class="image"><AppQrcode /></div>
    <div class="header">HEADER</div>
    <div class="description">DESCRIPTION</div>
    <div class="action">ACTION</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import AppQrcode from '../../../app/components/app-qrcode.vue';
</script>

<style scoped>
@import './styles/post-side-sheet-header-download.css';
</style>
