export function downloadTaskAdd(state, task) {
  state.tasks[task.aria2.gid] = task;
}
export function downloadTaskRemove(state, task) {
  delete state.tasks[task.aria2.gid];
}
export function downloadTaskUpdate(state, message) {
  this.dispatch('downloads/downloadTaskUpdate', message);
}
export function downloadTaskError(state, event) {
  console.log(event);
}
export function downloadTaskReconnect(state, count) {
  console.info("消息系统重连中...", state, count);
}
export function downloadTaskReconnectError(state) {
  state.socket.reconnectError = true;
  console.log(message);
}
export function downloadTaskOnOpen(state, event) {
  state.socket.$socket = event.currentTarget;
  state.socket.isConnected = true;
  // 连接成功时启动定时发送心跳消息，避免被服务器断开连接
  state.socket.heartBeatTimer = setInterval(() => {
    const message = "心跳消息";
    state.socket.isConnected &&
      state.socket.$socket.sendObj({
        code: 200,
        msg: message
      });
  }, state.socket.heartBeatInterval);
  console.log(event);
}
export function downloadTaskOnClose(state, event) {
  state.socket.isConnected = false;
  // 连接关闭时停掉心跳消息
  clearInterval(state.socket.heartBeatTimer);
  state.socket.heartBeatTimer = 0;
  console.log("连接已断开: " + new Date());
  console.log(event);
}
