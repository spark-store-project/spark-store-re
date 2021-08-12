export default function () {
  return {
    socket: {
      isConnected: false,
      reconnectError: false,
      reconnectCount: 0,
      heartBeatInterval: 1000,
      heartBeatTimer: 0,
      $socket: null,
    },
    tasks: {},
    status: {},
    activeTasks: {},
    stoppedTasks: {},
    waitingTasks: {},
  }
}
