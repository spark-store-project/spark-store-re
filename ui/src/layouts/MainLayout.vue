<template>
  <q-layout view="lHh Lpr lff">
    <q-header class="native-window-draggable bg-white" elevated>
        <q-toolbar style="height: 80px;">

          <q-btn flat round color="primary" icon="arrow_back" class="native-window-no-drag" />
          <q-btn flat round color="primary" icon="arrow_forward" class="native-window-no-drag" />
          <q-btn flat round color="primary" icon="refresh" class="native-window-no-drag" />

        <q-toolbar-title>
            <div class="q-px-lg" >
              <q-input class="native-window-no-drag text-center justify-center centers"
                v-model="search"
                debounce="500"
                filled
                :placeholder="$t('Search')"
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
        </q-toolbar-title>

          <q-btn class="native-window-no-drag q-px-lg"
                 color="red-5" push
                 icon="upload"
          >
          </q-btn>


          <q-btn class="native-window-no-drag"
                 color="primary" 
                 flat round
                 icon="download"
          >
            <q-badge floating color="red">2</q-badge>
          </q-btn>

          <q-btn class="native-window-no-drag"
                 color="primary"
                 round
            flat @click="leftDrawerOpen = !leftDrawerOpen" icon="close" />
        </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
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
            {{$t("Spark Store")}}
          </q-toolbar-title>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view :key="$route.path" />
    </q-page-container>
  </q-layout>
</template>

<script>
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
    icon: 'message',
    link: '/list/chat'
  },
  {
    title: 'Music',
    caption: 'forum.quasar.dev',
    icon: 'headphones',
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
    link: '/list/image_graphics'
  },
  {
    title: 'Games',
    caption: 'Community Quasar projects',
    icon: 'games',
    link: '/list/games'
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
    icon: 'coffee_maker',
    link: '/list/development'
  },
  {
    title: 'Tools',
    caption: 'Community Quasar projects',
    icon: 'handyman',
    link: '/list/tools'
  },
  {
    title: 'Beautify',
    caption: 'Community Quasar projects',
    icon: 'mood',
    link: '/list/themes'
  },
  {
    title: 'Others',
    caption: 'Community Quasar projects',
    icon: 'alt_route',
    link: '/list/others'
  },
  {
    title: 'Downloads',
    caption: 'Community Quasar projects',
    icon: 'download',
    link: '/management/download'
  },
  {
    title: 'Settings',
    caption: 'Community Quasar projects',
    icon: 'settings',
    link: '/management/settings'
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
      },
    }
  },
  mounted() {
    linksList[0].title = this.$t('Home');
    linksList[1].title = this.$t('Network');
    linksList[2].title = this.$t('Chat');
    linksList[3].title = this.$t('Music');
    linksList[4].title = this.$t('Video');
    linksList[5].title = this.$t('Graphics');
    linksList[6].title = this.$t('Games');
    linksList[7].title = this.$t('Office');
    linksList[8].title = this.$t('Reading');
    linksList[9].title = this.$t('Development');
    linksList[10].title = this.$t('Tools');
    linksList[11].title = this.$t('Beautify');
    linksList[12].title = this.$t('Others');
    linksList[13].title = this.$t('Downloads');
    linksList[14].title = this.$t('Settings');
  },
})
</script>
