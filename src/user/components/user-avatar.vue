<template>
  <div :class="userAvatarClasses">
    <router-link class="link" :to="userAvatarLinkTo" v-if="props.link">
      <img class="image" :src="userAvatarSource" @load="onLoadImage" />
    </router-link>
    <img v-else class="image" :src="userAvatarSource" @load="onLoadImage" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { API_BASE_URL } from '../../app/app.config';

const store = useStore();

const props = defineProps({
  user: {
    type: Object,
  },
  size: {
    type: String,
    default: 'small',
  },
  link: {
    type: String,
  },
});

const loading = ref(true)

const isLogin = computed(() => store.getters['auth/isLogin']);
const avatarPreviewImage = computed(
  () => store.getters['user/account/avatarPreviewImage'],
);
const currentUser = computed(() => store.getters['user/currentUser']);

const userAvatarClasses = computed(() => [
  'user-avatar',
  props.size,
  { fade: !isLogin.value && !props.user },
  {loading: loading.value}
]);

const userAvatarSource = computed(() => {
  let avatarSource;
  if (props.user && props.user.avatar) {
    avatarSource = `${API_BASE_URL}/users/${props.user.id}/avatar?size=${props.size}`;
  } else {
    avatarSource = '/icons/account-black-32px.svg';
  }
  if (
    currentUser.value &&
    currentUser.value.id === props.user?.id &&
    avatarPreviewImage.value
  ) {
    avatarSource = avatarPreviewImage.value;
  }
  return avatarSource;
});

const userAvatarLinkTo = computed(() => {
  let linkTo;
  if (props.link === 'login' && !isLogin.value) {
    linkTo = { name: 'login' };
  } else if (props.user) {
    linkTo = {
      name: 'userPosts',
      params: { userId: props.user.id },
    };
  } else {
    linkTo = '/';
  }
  return linkTo;
});

const onLoadImage = () => loading.value = false
</script>

<style scoped>
@import url('./styles/user-avatar.css');
</style>
