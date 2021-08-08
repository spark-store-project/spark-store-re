<template>
  <q-layout view="lHh Lpr lff">
    <q-header class="native-window-draggable bg-white" elevated>
        <q-toolbar style="height: 80px;">
          <!-- TODO handle back/forward with disabled button state in app -->
          <q-btn flat round color="primary" icon="arrow_back"
            @click="linkNavFn(-1)"
            class="native-window-no-drag"
          />
          <q-btn flat round color="primary" icon="arrow_forward"
            @click="linkNavFn(1)"
            class="native-window-no-drag"
          />
          <q-btn flat round color="primary" icon="refresh" @click="pageReloadFn" class="native-window-no-drag" />
          <q-btn flat round color="primary" icon="home" to="/" class="native-window-no-drag" />

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
                 to="/management/uploads"
          >
          </q-btn>


          <q-btn class="native-window-no-drag"
                 color="primary" flat round
                 icon="download"
                 to="/management/downloads"
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
          <template v-for="item in linksList" :key="item.title">
            <q-item clickable
                    v-ripple
                    :to="item.link"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                {{$t(item.title)}}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top native-window-draggable"
        src="https://unsplash.com/photos/pZ-XFIrJMtE/download?force=true&w=640"
        style="height: 80px; width: 200px;"
      >
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
    title: 'Games',
    caption: 'Community Quasar projects',
    icon: 'games',
    link: '/list/games'
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
    const linkNavFn = function(steps) {
      this.$router.go(steps);
    }
    const pageReloadFn = function() {
      window.location.reload();
      // this.$router.go(this.$router.currentRoute);
    }
    const search = ref("");
    return {
      linksList,
      linkNavFn,
      pageReloadFn,
      search,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },
  computed: {
  },
  mounted() {
  },
})
</script>
