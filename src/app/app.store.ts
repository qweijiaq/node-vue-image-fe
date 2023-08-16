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

import { DiggStoreState, diggStoreModule } from '@/digg/digg.store';
import { ManageStoreState, manageStoreModule } from '@/manage/manage.store';

import {
  AppSearchStoreState,
  appSearchStoreModule,
} from '@/app/search/app-search.store';

import { AuditAuditStoreState, auditAuditStoreModule } from '@/audit/audit.store';
import { DashboardStoreState, dashboardStoreModule } from '@/dashboard/dashboard.store';

export interface RootState {
  dashboard: DashboardStoreState,
  audit: AuditAuditStoreState,
  search: AppSearchStoreState;
  manage: ManageStoreState;
  digg: DiggStoreState;
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
    dashboard: dashboardStoreModule,
    audit: auditAuditStoreModule,
    search: appSearchStoreModule,
    manage: manageStoreModule,
    digg: diggStoreModule,
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
