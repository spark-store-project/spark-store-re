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
          <template v-for="item in essentialLinks" :key="item.order">
            <q-item clickable v-ripple>
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
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Network',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Chat',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Music',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Video',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Graphics',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Games',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Office',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Reading',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Development',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Tools',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Beautify',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Others',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Downloads',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
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
