import { boot } from 'quasar/wrappers'
import VueNativeSock from 'vue-native-websocket-vue3'

export default boot(({app,store}) => {
  app.use(VueNativeSock, 'ws://localhost:6800/jsonrpc', {
    store: store,
    format: 'json',
    reconnection: true,
    reconnectionAttemtps: 5,
    reconnectionDelay: 1000,
  })
})
