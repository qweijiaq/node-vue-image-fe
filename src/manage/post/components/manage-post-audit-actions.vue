<template>
  <div class="manage-post-audit-actions">
    <CircleButton
      v-for="{ status, icon, active } in actions"
      :key="status"
      :icon="icon"
      :active="active"
      :disabled="active"
      @click="onClickActionButton(status)"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import CircleButton from '../../../app/components/circle-button.vue';

const props = defineProps({
  post: {
    type: Object,
  },
});

const emits = defineEmits(['change']);

const actions = computed(() => {
  console.log(props.post);
  const isActive = (status: string) => props.post?.audit?.status === status;
  return [
    {
      status: 'pending',
      icon: 'pending',
      active: isActive('pending'),
    },
    {
      status: 'denied',
      icon: 'error_outline',
      active: isActive('denied'),
    },
    {
      status: 'approved',
      icon: 'check_circle',
      active: isActive('approved'),
    },
  ];
});

const onClickActionButton = async (status: any) => {
  const { id: resourceId } = props.post;

  try {
    await store.dispatch('audit/create/createAudit', {
      data: {
        resourceId,
        resourceType: 'post',
        status,
      },
    });

    emits('change', { status });
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};
</script>

<style scoped>
@import './styles/manage-post-audit-actions.css';
</style>
