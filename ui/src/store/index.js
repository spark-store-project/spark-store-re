import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import settings from './module-settings'
import downloads from './module-downloads'
import appinfos from './module-appinfos'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    mutations: {
      //a bridge forced by library, pass event to modules
      SOCKET_ONOPEN(state, event) {
        this.commit('downloads/downloadTaskOnOpen', event);
      },
      SOCKET_ONCLOSE(state, event) {
        this.commit('downloads/downloadTaskOnClose', event);
      },
      SOCKET_ONERROR(state, event) {
        this.commit('downloads/downloadTaskError', event);
      },
      SOCKET_ONMESSAGE(state, message) {
        this.commit('downloads/downloadTaskUpdate', message);
      },
      SOCKET_RECONNECT(state, count) {
        this.commit('downloads/downloadTaskReconnect', count);
      },
      SOCKET_RECONNECT_ERROR(state) {
        this.commit('downloads/downloadTaskError');
      }
    },
    modules: {
      settings,
      downloads,
      appinfos,
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
