import { Module } from 'vuex';
import { RootState } from '../app/app.store';
import {
  postCreateStoreModule,
  PostCreateStoreState,
} from './create/post-create.store';
import {
  postIndexStoreModule,
  PostIndexStoreState,
} from './index/post-index.store';
import { postShowStoreModule } from './show/post-show.store';
import { PostEditStoreState, postEditStoreModule } from '@/post/edit/post-edit.store';

export interface PostStoreState {
  edit: PostEditStoreState,
  create: PostCreateStoreState;
  index: PostIndexStoreState;
}

export const postStoreModule: Module<PostStoreState, RootState> = {
  namespaced: true,

  modules: {
    edit: postEditStoreModule,
    create: postCreateStoreModule,
    index: postIndexStoreModule,
    show: postShowStoreModule,
  },
};
