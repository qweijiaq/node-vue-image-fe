<template>
  <div class="app-sidebar-item theme bottom">
    <appIcon :name="themeIcon" @click="onClickThemeIcon" />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import appIcon from '../../../app/components/app-icon.vue';
import { computed } from 'vue';

const store = useStore();
const theme = computed(() => store.getters['layout/theme']);
const themeIcon = computed(() =>
  theme.value === 'dark' ? 'wb_sunny' : 'wb_incandescent',
);

const onClickThemeIcon = () => {
  const _theme = theme.value === 'dark' ? 'light' : 'dark';
  store.commit('layout/setTheme', _theme);
};
</script>

<style scoped></style>
