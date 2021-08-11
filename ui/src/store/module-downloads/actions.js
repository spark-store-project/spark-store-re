export function downloadTaskAdd({state, commit}, app_detail_json) {
  let {file_url, icon_url} = app_detail_json;
  //add the download task to aria2 and report the status back to fill tasks array
  let task = {
    details: app_detail_json,
    name: "App-" + Date.now(),
    subtitle: "Install only the free and open source software",
    type: "http",  /* HTTP, HTTPS, BT, SFTP, FTP */
    path: "~/Downloads/ABC",
    controlFile: "~/Downloads/ABC.aria2",
    size: 100,
    speed: 100,  /* KB unit */
    paused: false,
    completed: false,
    pending: false,
    addedTime: Date.now(), /* UTC GMT */
    finishedTime: Date.now(), /* UTC GMT */
    progress: 80,
    progressLabel: "80%",
    gid: "",
    status: "",
    totalLength: "",
    completedLength: "",
    uploadLength: "",
    bitfield: "",
    downloadSpeed: "",
    uploadSpeed: "",
    infoHash: "",
    numSeeders: "",
    seeder: "",
    pieceLength: "",
    numPieces: "",
    connections: "",
    dir: "",
    files: "",
  };
  commit('downloadTaskAdd',task);
}
