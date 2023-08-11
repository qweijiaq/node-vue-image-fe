<template>
  <div class="manage">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onUnmounted } from 'vue';
import store from '../app/app.store';

const hasSelected = computed(() => store.getters['manage/select/hasSelected']);

const onKeydownWindow = (event: any) => {
  if (hasSelected.value && event.key === 'Escape') {
    store.dispatch('manage/select/manageSelectedItems', {
      resourceType: 'post',
      actionType: 'reset',
    });
  }
};

if (window) {
  window.addEventListener('keydown', onKeydownWindow);
}

onUnmounted(() => {
  if (window) {
    window.removeEventListener('keydown', onKeydownWindow);
  }
});
</script>

<style scoped>
@import './styles/manage.css';
</style>
