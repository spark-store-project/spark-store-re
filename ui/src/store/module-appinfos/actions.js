import axios from "axios";
export function initAppInfos({state, dispatch}, message) {
  state.appCategories.forEach(item => {
    let applist_url = `${state.src_url}/store/${category}/applist.json`;
    axios.get(applist_url).then((res) => {
      let appList = res.data;
      commit('addAppList', {
        category: category,
        appList: appList
      });
    });
  });
}
