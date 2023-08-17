<template>
  <div class="icon-text-button">
    <button :class="buttonClasses">
      <div class="icon">
        <AppIcon :name="icon" :color="iconColor" />
      </div>
      <div class="text" v-if="text">
        {{ text }}
      </div>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import AppIcon from './app-icon.vue';

const props = defineProps({
  icon: {
    type: String,
  },

  text: {
    type: String,
  },

  isActive: {
    type: Boolean,
  },

  size: {
    type: String,
    default: 'large',
  },

  variations: {
    type: String,
  },
});

const buttonClasses = computed(() => {
  const classes = [
    'button',
    'icon',
    'text',
    props.size,
    { outline: props.isActive },
  ];
  if (props.variations) {
    classes.push(props.variations);
  }

  return classes;
});

const iconColor = computed(() => (props.isActive ? '#fff' : ''));
</script>

<style scoped>
@import './styles/icon-text-button.css';
</style>
