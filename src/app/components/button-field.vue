<template>
  <div class="field">
    <button :class="['button', props.size, props.type]" @click="onClickButton">
      {{ props.text }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  // 按钮文字
  text: {
    type: String,
  },
  // 按钮尺寸
  size: {
    type: String,
  },
  // 按钮类型
  type: {
    type: String,
  },
});

// 发送事件
const emits = defineEmits(['click']);

// 点击按钮
const onClickButton = () => {
  emits('click');
};
</script>

<style scoped></style>
