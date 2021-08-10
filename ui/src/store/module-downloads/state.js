export default function () {
  return {
    tasks: [
      {
        title: "Foss Only",
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
      },
    ],
  }
}
