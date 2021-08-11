function gidGenerate() {
    const hex = '0123456789abcdef';
    let output = '';
    for (let i = 0; i < 16; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
}
function uniqueGidGenerate(state) {
  let gid = gidGenerate();
  while (state.tasks[gid] !== undefined) {
    gid = gidGenerate();
  }
  return gid;
}

export function downloadTaskUpdate({state, commit}, message) {
  // if it is notification received
  if (message.method == "aria2.onDownloadStart") {
    let aria2_tellStatus_msg = {
      'jsonrpc':'2.0',
      'id':'onDownloadStart',
      'method':'aria2.tellStatus',
      'params':[ message.params[0].gid ],
    }
    state.socket.$socket.sendObj(aria2_tellStatus_msg);
  } // if it is response received
  else if (message.id == "addUri") {
    let aria2_tellStatus_msg = {
      'jsonrpc':'2.0',
      'id':'tellStatus',
      'method':'aria2.tellStatus',
      'params':[ message.result ],
    }
    state.socket.$socket.sendObj(aria2_tellStatus_msg);
  } else if (message.id == "tellStatus") {
    let gid = message.result.gid;
    let aria2_tellStatus_msg = {
      'jsonrpc':'2.0',
      'id':'tellStatus',
      'method':'aria2.tellStatus',
      'params':[ gid ],
    }
    state.tasks[gid].aria2 = message.result;
    setInterval(() => {
        state.socket.isConnected &&
          state.socket.$socket.sendObj(aria2_tellStatus_msg);
      }, 1000);
    // console.log(state.tasks);
  } else {
    console.log("on commit downloadTaskUpdate", message);
  }
}
export function downloadTaskAdd({state, commit, getters}, app_detail_json) {
  let {file_url, icon_url} = app_detail_json;
  //add the download task to aria2 and report the status back to fill tasks array
  let gid = uniqueGidGenerate(state);
  console.log(gid);
  let aria2_addUri_msg = {
    'jsonrpc':'2.0',
    'id':'addUri',
    'method':'aria2.addUri',
    'params':[[file_url], { gid: gid }],
  };
  state.socket.$socket.sendObj(aria2_addUri_msg);
  let task = {
    details: app_detail_json,
    aria2: {
      gid: gid,
      status: "",
      dir: "",
      files: "",
      downloadSpeed: 0,
      uploadSpeed: 0,
      totalLength: 0,
      completedLength: 0,
      uploadLength: 0,
      bitfield: "",
      infoHash: "",
      numSeeders: "",
      seeder: "",
      pieceLength: "",
      numPieces: "",
      connections: 0,
    },
    paused: false,
    completed: false,
    pending: false,
    addedTime: Date.now(), /* UTC GMT */
    finishedTime: Date.now(), /* UTC GMT */
    progress: 80,
    progressLabel: "80%",
  };
  commit('downloadTaskAdd',task);
}
