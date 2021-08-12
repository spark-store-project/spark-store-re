export function downloadTaskAdd(state, task) {
  state.tasks[task.aria2.gid] = task;
}
export function downloadTaskRemove(state, gid) {
  delete state.tasks[gid];
}
export function downloadTaskUpdate(state, message) {
  this.dispatch('downloads/downloadTaskUpdate', message);
}
export function downloadTaskError(state, event) {
  console.info("下载系统返回错误...", state, event);
}
export function downloadTaskReconnect(state, count) {
  console.info("下载系统重连中...", state, count);
}
export function downloadTaskReconnectError(state) {
  state.socket.reconnectError = true;
  console.info("下载系统重连错误", state);
}
export function downloadTaskOnOpen(state, event) {
  state.socket.$socket = event.currentTarget;
  state.socket.isConnected = true;
  state.socket.heartBeatTimer = setInterval(() => {
    const globalStatus = {
      'jsonrpc':'2.0',
      'id':'aria2.getGlobalStat',
      'method':'aria2.getGlobalStat',
      'params':[],
    };
    state.socket.isConnected &&
      state.socket.$socket.sendObj(globalStatus);
  }, state.socket.heartBeatInterval);
  console.info("连接已建立: " + new Date());
  console.info(event);
}
export function downloadTaskOnClose(state, event) {
  state.socket.isConnected = false;
  // 连接关闭时停掉心跳下载
  clearInterval(state.socket.heartBeatTimer);
  state.socket.heartBeatTimer = 0;
  console.info("连接已断开: " + new Date());
  console.info(event);
}
