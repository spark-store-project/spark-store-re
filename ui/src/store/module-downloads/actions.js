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
      'id':'aria2.tellStatus',
      'method':'aria2.tellStatus',
      'params':[ message.params[0].gid ],
    }
    state.socket.$socket.sendObj(aria2_tellStatus_msg);
  }
  else if (message.method == "aria2.onDownloadCompleted") {
    console.log(message);
  }
  // if it is response received from method calls
  else if (message.id == "aria2.getGlobalStat") {
    state.status.downloadSpeed = parseInt(message.result.downloadSpeed,10);
    state.status.numActive = parseInt(message.result.numActive,10);
    state.status.numStopped = parseInt(message.result.numStopped,10);
    state.status.numStoppedTotal = parseInt(message.result.numStoppedTotal,10);
    state.status.numWaiting = parseInt(message.result.numWaiting,10);
    state.status.uploadSpeed = parseInt(message.result.uploadSpeed,10);
    let aria2_tellActive_mgs = {
      'jsonrpc':'2.0',
      'id':'aria2.tellActive',
      'method':'aria2.tellActive',
      'params':[],
    }
    state.socket.$socket.sendObj(aria2_tellActive_mgs);
    let aria2_tellStopped_mgs = {
      'jsonrpc':'2.0',
      'id':'aria2.tellStopped',
      'method':'aria2.tellStopped',
      'params':[0, state.status.numStopped],
    }
    state.socket.$socket.sendObj(aria2_tellStopped_mgs);
    let aria2_tellWaitting_mgs = {
      'jsonrpc':'2.0',
      'id':'aria2.tellWaiting',
      'method':'aria2.tellWaiting',
      'params':[0,state.status.numWaiting],
    }
    state.socket.$socket.sendObj(aria2_tellWaitting_mgs);
  }
  else if (message.id == "aria2.addUri") {
    let aria2_tellStatus_msg = {
      'jsonrpc':'2.0',
      'id':'aria2.tellStatus',
      'method':'aria2.tellStatus',
      'params':[ message.result ],
    }
    state.socket.$socket.sendObj(aria2_tellStatus_msg);
  } else if (message.id == "aria2.tellStatus") {
    let gid = message.result.gid;
    let aria2_tellStatus_msg = {
      'jsonrpc':'2.0',
      'id':'aria2.tellStatus',
      'method':'aria2.tellStatus',
      'params':[ gid ],
    }
    state.tasks[gid].aria2 = message.result;
    setInterval(() => {
        state.socket.isConnected &&
          state.socket.$socket.sendObj(aria2_tellStatus_msg);
      }, 1000);
  } else if (   message.id == "aria2.tellActive"
             || message.id == "aria2.tellStopped"
             || message.id == "aria2.tellWaiting"
            ) {
      message.result.forEach(msg => {
      if (state.tasks[msg.gid] === undefined) {
        let task = window.localStorage.getItem(msg.gid);
        if (task != undefined) {
          task = JSON.parse(task);
          task.aria2 = msg;
          commit('downloadTaskAdd',task);
        } else {
          console.log("Stale State", msg);
        }
      } else {
        state.tasks[msg.gid].aria2 = msg;
      }
    });
  } else if (message.id == "aria2.onDownloadStart") {
  } else {
    console.log("on commit downloadTaskUpdate", message);
  }
}
export function downloadTaskAdd({state, commit, getters}, app_detail_json) {
  let {file_url, icon_url} = app_detail_json;
  //add the download task to aria2 and report the status back to fill tasks array
  let gid = uniqueGidGenerate(state);
  let aria2_addUri_msg = {
    'jsonrpc':'2.0',
    'id':'aria2.addUri',
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
    addedTime: Date.now(), /* UTC GMT */
    finishedTime: Date.now(), /* UTC GMT */
  };
  commit('downloadTaskAdd',task);
  window.localStorage.setItem(gid, JSON.stringify(task));
}
export function downloadTaskRemove({state, commit}, gid) {
  console.log('downloadTaskRemove', gid);
  let aria2_tellStatus_msg = {
    'jsonrpc':'2.0',
    'id':'aria2.remove',
    'method':'aria2.remove',
    'params':[ gid ],
  }
  state.socket.$socket.sendObj(aria2_tellStatus_msg);
  window.localStorage.removeItem(gid);
  commit('downloadTaskRemove', gid);
}
