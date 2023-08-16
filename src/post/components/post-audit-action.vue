<template>
  <div class="post-audit-action">
    <div class="icon">
      <CircleButton :icon="icon" @click="onClickButton" :disabled="disabled" />
    </div>
    <div class="text">
      <button class="button basic" @click="onClickButton" :disabled="disabled">
        {{ text }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../app/app.store';
import CircleButton from '../../app/components/circle-button.vue';

const props = defineProps({
  post: {
    type: Object,
  },
});

const emits = defineEmits(['change']);

const getAuditAction = ({ audit }) => {
  let icon, text, action;
  const status = audit && audit.status ? audit.status : null;

  switch (status) {
    case 'pending':
      icon = 'pending';
      text = '审核中';
      action = 'revoke';
      break;
    case 'denied':
      icon = 'error_outline';
      text = '审核被拒';
      action = 'create';
      break;
    case 'approved':
      icon = 'check_circle';
      text = '审核通过';
      action = null;
      break;
    default:
      icon = 'add_task';
      text = '提交审核';
      action = 'create';
      break;
  }

  return { icon, text, action };
};

const icon = computed(() => {
  const { icon } = getAuditAction(props.post);
  return icon;
});

const text = computed(() => {
  const { text } = getAuditAction(props.post);
  return text;
});

const action = computed(() => {
  const { action } = getAuditAction(props.post);
  return action;
});

const disabled = computed(() => !action.value);

const submitCreateAudit = () => {
  const { id: resourceId } = props.post;
  const status = 'pending';

  try {
    store.dispatch('audit/create/createAudit', {
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

const submitRevokeAudit = () => {
  const { id: resourceId } = props.post;

  try {
    store.dispatch('audit/revoke/revokeAudit', {
      data: {
        resourceId,
        resourceType: 'post',
      },
    });

    emits('change', null);
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};

const onClickButton = () => {
  switch (action.value) {
    case 'create':
      submitCreateAudit();
      break;
    case 'revoke':
      submitRevokeAudit();
      break;
  }
};
</script>

<style scoped>
@import './styles/post-audit-action.css';
</style>
