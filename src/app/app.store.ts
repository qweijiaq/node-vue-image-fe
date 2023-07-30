import { createStore } from 'vuex';
import { postStoreModule, PostStoreState } from '../post/post.store';
import { layoutStoreModule, LayoutStoreState } from './layout/layout.store';
import { localStorageStorePlugin } from './app.store.plugin';
import { authStoreModule, AuthStoreState } from '../auth/auth.store';
import {
  AppNotificationStoreState,
  appNotificationStoreModule,
} from './notification/app-notification.store';
import { UserStoreState, userStoreModule } from '../user/user.store';
import {
  AppToolbarStoreState,
  appToolbarStoreModule,
} from './toolbar/app-toolbar.store';
import { fileStoreModule, FileStoreState } from '../file/file.store';
import { ReplyStoreState, replyStoreModule } from '../reply/reply.store';
import {
  commentStoreModule,
  CommentStoreState,
} from '../comment/comment.store';

export interface RootState {
  appName: string;
  post: PostStoreState;
  layout: LayoutStoreState;
  auth: AuthStoreState;
  notification: AppNotificationStoreState;
  user: UserStoreState;
  toolbar: AppToolbarStoreState;
  file: FileStoreState;
  comment: CommentStoreState;
  reply: ReplyStoreState;
}

/**
 * 创建 Store
 */
const store = createStore({
  state: {
    appName: 'GopherImage | 照片分享平台',
  } as RootState,

  modules: {
    post: postStoreModule,
    layout: layoutStoreModule,
    auth: authStoreModule,
    notification: appNotificationStoreModule,
    user: userStoreModule,
    toolbar: appToolbarStoreModule,
    file: fileStoreModule,
    comment: commentStoreModule,
    reply: replyStoreModule,
  },
  plugins: [localStorageStorePlugin],
});

/**
 * 默认导出
 */
export default store;
