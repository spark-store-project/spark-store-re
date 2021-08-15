<template>
  <q-layout view="lHh Lpr lff">
    <q-header class="native-window-draggable bg-white" elevated>
        <q-toolbar style="height: 80px;">
          <q-btn class="native-window-no-drag"
                 color="primary"
                 round flat
                 @click="leftDrawerOpen = !leftDrawerOpen" icon="menu"
          />
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
          <q-btn class="native-window-no-drag"
                 color="primary" flat round
                 icon="download"
                 to="/management/downloads"
          >
            <template v-if="taskLength()!=0">
              <q-badge floating color="red">
                {{taskLength()}}
              </q-badge>
            </template>
          </q-btn>

          <q-toolbar-title>
            <div class="q-px-lg">
                <q-input class="native-window-no-drag text-center justify-center centers"
                  v-model="search"
                  debounce="200"
                  filled
                  :placeholder="$t('Search')"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                  <q-menu fit :target="true" no-focus>
                    <q-list
                      style="min-width: 100px"
                      v-for="result in searchApps(search)" :key="result.Pkgname"
                    >
                      <q-item clickable :to="getAppUrl(result)" >
                        <q-item-section> {{ result.Name }} </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-input>
              </div>
          </q-toolbar-title>

          <q-btn class="native-window-no-drag q-px-lg"
                 color="red-5" push
                 icon="upload"
                 to="/management/packaging"
          >
          </q-btn>
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
          <template v-for="item in linksList()" :key="item.title">
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


import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
  },
  mounted() {
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
    const taskLength = function() {
      return Object.keys(this.$store.state.downloads.tasks).length;
    }
    const linksList = function() {
      return this.$store.state.appinfos.appCategories;
    }
    const toggleLeftDrawer = function() {
        leftDrawerOpen.value = !leftDrawerOpen.value
    }
    const search = ref("");
    const searchApps = function(input) {
      let search = input.toLowerCase();
      let searchList = [];
      this.$store.state.appinfos.appCategories.forEach(item => {
        item.json_apps.forEach(app => {
          console.log(app);
          if( app.Author.toLowerCase().includes(search)
           || app.Name.toLowerCase().includes(search)
           || app.More.toLowerCase().includes(search)
           || app.Website.toLowerCase().includes(search)
           || app.Pkgname.toLowerCase().includes(search)
           || app.Contributor.toLowerCase().includes(search)
          ) {
            searchList.splice(0,0,app);
          }
        });
      });
      return searchList;
    };
    const getAppUrl = function(app)  {
      let detailsUri=`${this.$store.state.appinfos.src_url}/store/${app.category}/${app.Pkgname}/`;
      let base64encode= window.btoa(detailsUri);
      return `/details/${base64encode}`;
    };
    return {
      linkNavFn,
      linksList,
      pageReloadFn,
      search,
      searchApps,
      getAppUrl,
      leftDrawerOpen,
      taskLength,
      toggleLeftDrawer,
    }
  },
})
</script>
