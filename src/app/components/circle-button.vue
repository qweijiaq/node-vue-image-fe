<template>
  <div class="circle-button">
    <button :class="buttonClasses" @click="onClickButton" :disabled="disabled">
      <AppIcon color="#fff" size="16" :name="icon" />
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

  active: {
    type: Boolean,
  },

  disabled: {
    type: Boolean,
  },
});

const emits = defineEmits(['click']);

const buttonClasses = computed(() => [
  'button',
  'basic',
  'circle',
  { active: props.active },
]);

const onClickButton = () => {
  emits('click');
};
</script>

<style scoped>
@import './styles/circle-button.css';
</style>
