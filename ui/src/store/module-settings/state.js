export default function () {
  return {
    generalSetting: [
      {
        title: "Foss Only",
        subtitle: "Install only the free and open source software",
        enabled: false,
      },
      {
        title: "Auto Update",
        subtitle: "Enable the auto update once the store is started",
        enabled: false,
      },
      {
        title: "Enable Notification",
        subtitle: "Allow Notification for various events",
        enabled: false,
      },
      {
        title: "Become Our Peers",
        subtitle: "Enable Peer to Peer (P2P) Download/Upload",
        enabled: false,
      },
      {
        title: "Enable the background process",
        subtitle: "With background process alive, you can continue to download even when window is closed",
        enabled: false,
      },
    ],
    privacySetting: [
      {
        title: "App Can See the Home Folder",
        subtitle: "Home folder contains desktop files, personal settings",
        enabled: true,
      },
      {
        title: "App Uses the same graphic context",
        subtitle:"In the same X graphic context, app can see all your inputs, screens etc",
        enabled: true,
      },
      {
        title: "App Uses the same default sandbox",
        subtitle: "use same sanbox makes backup easier",
        enabled: true,
      },
    ],
  }
}
