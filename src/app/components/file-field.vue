<template>
  <div class="field">
    <label :for="props.name" :class="['button', 'outline', props.size]">{{
      props.text
    }}</label>
    <input
      type="file"
      :name="props.name"
      :id="props.name"
      :accept="props.fileType"
      class="input file hide"
      @change="$emit('change', $event.target.files)"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
  },
  size: {
    type: String,
  },
  name: {
    type: String,
  },
  fileType: {
    type: String,
  },
});

const emits = defineEmits(['change']);
</script>

<style scoped></style>
