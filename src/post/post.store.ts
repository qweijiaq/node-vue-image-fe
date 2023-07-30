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

export interface PostStoreState {
  create: PostCreateStoreState;
  index: PostIndexStoreState;
}

export const postStoreModule: Module<PostStoreState, RootState> = {
  namespaced: true,

  modules: {
    create: postCreateStoreModule,
    index: postIndexStoreModule,
    show: postShowStoreModule,
  },
};
