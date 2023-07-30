import { Plugin } from 'vuex';
import { RootState } from './app.store';
import { setStorages } from './app.service';
/**
 * 本地存储
 */
export const localStorageStorePlugin: Plugin<RootState> = (store) => {
  store.subscribe((mutation) => {
    switch (mutation.type) {
      case 'layout/setTheme':
        setStorages('theme', mutation.payload);
        break;
      case 'auth/login/setLoginResponseData':
        if (!mutation.payload) {
          setStorages('nid', '');
          setStorages('uid', '');
        } else {
          setStorages('nid', mutation.payload.token);
          setStorages('uid', mutation.payload.id);
        }
        break;
      case 'post/index/setLayout':
        setStorages('post-list-layout', mutation.payload);
        break;
      case 'post/show/setLayout':
        setStorages('post-show-layout', mutation.payload);
        break;
    }
  });
};
