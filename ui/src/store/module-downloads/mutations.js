export function downloadTaskAdd(state, task) {
  state.tasks.splice(0, 0, task);
}
export function downloadTaskRemove(state, index) {
  state.tasks.splice(index, 1);
}
