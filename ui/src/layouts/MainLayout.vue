<template>
  <q-layout view="lHh Lpr lff">
    <q-header class="native-window-draggable bg-white" elevated>
        <q-toolbar style="height: 80px;">
          <div class="q-pa-md" style="max-width: 350px;">
            <q-input style="-webkit-app-region: no-drag;"
              v-model="search"
              debounce="500"
              filled
              placeholder="Search"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <q-btn style="-webkit-app-region: drag" flat @click="drawer = !drawer" round dense icon="menu" />
          <q-btn style="-webkit-app-region: drag" flat @click="drawer = !drawer" round dense icon="minimize" />
          <q-btn style="-webkit-app-region: drag" flat @click="drawer = !drawer" round dense icon="maximize" />
          <q-btn style="-webkit-app-region: drag" flat @click="drawer = !drawer" round dense icon="close" />
        </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="400"
    >
      <q-scroll-area style="height: calc(100% - 80px); margin-top: 80px; border-right: 1px solid #ddd">
        <q-list padding>
          <template v-for="item in essentialLinks" :key="item.title">
            <q-item clickable
                    v-ripple
                    :to="item.link"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                {{item.title}}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top"
        src="https://www.bing.com/th?id=OHR.PrathameshJaju_ZH-CN2207606082_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp"
        style="height: 80px">
        <div class="absolute-bottom bg-transparent">

          <q-toolbar-title>
            <q-avatar size="28px" class="q-mb-sm">
              <img src="https://www.spark-app.store/res/static/img/slogo.png">
            </q-avatar>
            Spark Store
          </q-toolbar-title>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: 'Home',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Network',
    caption: 'network application',
    icon: 'wifi',
    link: '/list/network'
  },
  {
    title: 'Chat',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: '/list/relation'
  },
  {
    title: 'Music',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: '/list/music'
  },
  {
    title: 'Video',
    caption: '@quasarframework',
    icon: 'movie',
    link: '/list/video'
  },
  {
    title: 'Graphics',
    caption: '@QuasarFramework',
    icon: 'image',
    link: '/list/graphic'
  },
  {
    title: 'Games',
    caption: 'Community Quasar projects',
    icon: 'games',
    link: '/list/game'
  },
  {
    title: 'Office',
    caption: 'Community Quasar projects',
    icon: 'work',
    link: '/list/office'
  },
  {
    title: 'Reading',
    caption: 'Community Quasar projects',
    icon: 'book',
    link: '/list/reading'
  },
  {
    title: 'Development',
    caption: 'Community Quasar projects',
    icon: 'code',
    link: '/list/development'
  },
  {
    title: 'Tools',
    caption: 'Community Quasar projects',
    icon: 'code',
    link: '/list/tool'
  },
  {
    title: 'Beautify',
    caption: 'Community Quasar projects',
    icon: 'code',
    link: '/list/beautify'
  },
  {
    title: 'Others',
    caption: 'Community Quasar projects',
    icon: 'code',
    link: '/list/other'
  },
  {
    title: 'Downloads',
    caption: 'Community Quasar projects',
    icon: 'download',
    link: '/download'
  },
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
