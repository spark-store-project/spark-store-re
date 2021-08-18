export function addAppList(state, data) {
  state.appCategories.forEach(item => {
    if ( item.link == `/list/${data.category}` ) {
      item.category = data.category;
      item.json_apps = data.appList;
      item.json_apps.forEach(i => {
        i.category = data.category;
      });
    }
  });
  console.log(state.appCategories);
}
