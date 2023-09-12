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
import store from '../../app/app.store';
import { API_BASE_URL } from '../../app/app.config';

const props = defineProps({
  // 当前用户
  user: {
    type: Object,
  },
  // 头像尺寸
  size: {
    type: String,
    default: 'small',
  },
  // 点击头像时的链接
  link: {
    type: String,
  },
});

const loading = ref(true);

// 判断是否登录
const isLogin = computed(() => store.getters['auth/isLogin']);

// 获取预览头像
const avatarPreviewImage = computed(
  () => store.getters['user/account/avatarPreviewImage'],
);

// 获取当前用户
const currentUser = computed(() => store.getters['user/currentUser']);

// class 属性
const userAvatarClasses = computed(() => [
  'user-avatar',
  props.size,
  { fade: !isLogin.value && !props.user },
  { loading: loading.value },
]);

// 用户头像地址
const userAvatarSource = computed(() => {
  let avatarSource: string;
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

// 点击头像后的路由
const userAvatarLinkTo = computed(() => {
  let linkTo: any;
  if (props.link === 'login' && !isLogin.value) {
    linkTo = { name: 'login' }; // 路由到登录页
  } else if (props.user) {
    linkTo = {
      name: 'userPosts', // 路由到用户详情页
      params: { userId: props.user.id }, // 携带用户 ID 参数
    };
  } else {
    linkTo = '/'; // 路由到首页
  }
  return linkTo;
});

// 头像加载完成
const onLoadImage = () => (loading.value = false);
</script>

<style scoped>
@import url('./styles/user-avatar.css');
</style>
