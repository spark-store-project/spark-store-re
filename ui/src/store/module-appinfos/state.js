export default function () {
  let top_url = "";  /* have not decided */
  let src_url = "https://d.store.deepinos.org.cn";
  return {
    top_url: top_url,
    src_url: src_url,
    appCategories: [
      {
        title: 'Games',
        icon: 'games',
        category: "games",
        json_apps: [],
        link: '/list/games',
      },
      {
        title: 'Network',
        icon: 'wifi',
        category: "",
        json_apps: [],
        link: '/list/network'
      },
      {
        title: 'Chat',
        icon: 'message',
        category: "",
        json_apps: [],
        link: '/list/chat'
      },
      {
        title: 'Music',
        icon: 'headphones',
        category: "",
        json_apps: [],
        link: '/list/music'
      },
      {
        title: 'Video',
        icon: 'movie',
        category: "",
        json_apps: [],
        link: '/list/video'
      },
      {
        title: 'Graphics',
        icon: 'image',
        category: "",
        json_apps: [],
        link: '/list/image_graphics'
      },
      {
        title: 'Office',
        category: "",
        icon: 'work',
        json_apps: [],
        link: '/list/office'
      },
      {
        title: 'Reading',
        category: "",
        icon: 'book',
        json_apps: [],
        link: '/list/reading'
      },
      {
        title: 'Development',
        category: "",
        icon: 'coffee_maker',
        json_apps: [],
        link: '/list/development'
      },
      {
        title: 'Tools',
        category: "",
        icon: 'handyman',
        json_apps: [],
        link: '/list/tools'
      },
      {
        title: 'Beautify',
        category: "",
        icon: 'mood',
        json_apps: [],
        link: '/list/themes'
      },
      {
        title: 'Others',
        category: "",
        icon: 'alt_route',
        json_apps: [],
        link: '/list/others'
      },
    ],
    managementLinks: [
      {
        title: 'Settings',
        icon: 'settings',
        link: '/management/settings'
      },
    ],
  }
}
