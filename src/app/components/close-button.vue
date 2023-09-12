<template>
  <div :class="['close-button', props.align]">
    <button class="button basic" @click="onClickButton">
      <AppIcon name="close" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import AppIcon from './app-icon.vue';

const props = defineProps({
  // 用于控制按钮的对齐
  align: {
    type: String,
  },
});

const emits = defineEmits(['click']);

const onClickButton = () => {
  emits('click')
}
</script>

<style scoped>
@import url('../../app/styles/close-button.css');
</style>
