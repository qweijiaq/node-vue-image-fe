<template>
  <div class="subscription-card">
    <div class="thumbnail">
      <slot name="thumbnail"></slot>
    </div>
    <div class="content">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="meta">
        <slot name="meta"></slot>
      </div>
      <div class="description">
        <slot name="description"></slot>
      </div>
    </div>
    <div class="action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
</script>

<style scoped>
@import './styles/subscription-card.css';
</style>
