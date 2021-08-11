export default function () {
  return {
    tasks: [
      {
        details: {
          Name: "AppName",
          icon_url: "https://json.jerrywang.top/store/games/com.sugarcane.cemu/icon.png",
        },
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
      },
    ],
  }
}
