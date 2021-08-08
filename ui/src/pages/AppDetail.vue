<template>
  <div class="q-pa-md">
  <div class="q-gutter-md fit row wrap justify-start items-start content-start">

    <q-card class="col-md-4" style="width: 320px;" >
      <q-card-section>
        <q-img :src="icon_png" width="120px" round />
      </q-card-section>
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{details.Name}}
          </div>
        </div>
        <q-rating v-model="stars" :max="5" size="32px" />
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>{{$t("Official Site")}}</q-item-label>
            <q-item-label caption>{{details.Website}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>{{$t("Author")}}</q-item-label>
            <q-item-label caption>{{details.Author}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>{{$t("Contributor")}}</q-item-label>
            <q-item-label caption>{{details.Contributor}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator />
      <q-card-actions align="left">
        <q-btn push color="white" style="min-width: 100px;" text-color="primary" :label='$t("Download")' />
        <q-btn flat text-color="red-4" :label='$t("Report")' />
      </q-card-actions>
    </q-card>

    <q-card class="col-md-6" style="width: 425px; overflow: hidden; ">
      <q-card-section>
        <div class="text-h6">{{$t("Info")}}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle2">{{details.More}}</div>
      </q-card-section>
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section>
            <p> {{details.Tags}} </p>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="label" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t("Version")}}</q-item-label>
            <q-item-label caption>{{details.Version}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="collections_bookmark" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t("Filename")}}</q-item-label>
            <q-item-label caption>{{details.Filename}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="inventory_2" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t("PkgName")}}</q-item-label>
            <q-item-label caption>{{details.Pkgname}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="red" name="pending_actions" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t("Update Time")}}</q-item-label>
            <q-item-label caption>{{details.Update}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="red" name="attach_file" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t("File Size")}}</q-item-label>
            <q-item-label caption>{{details.Size}}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-card>
  </div>
  </div>

  <div class="q-pa-md">
  <div class="q-gutter-md fit row wrap justify-start items-start content-start" >
  <q-card class="col" style="min-width: 320px; max-width: 760px; ">
    <q-card-section>
      <div class="text-h6">{{$t("ScreenShot & Video")}}</div>
    </q-card-section>
    <div class="q-pb-md" style="max-width: 800px">
      <q-carousel
        v-model="slide"
        v-model:fullscreen="fullscreen"
        infinite
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="blue"
        navigation
        padding
        arrows
        height="400px"
      >
        <q-carousel-slide
          v-for="(img,index) in images"
          :key="index"
          :name="index"
        >
          <q-img :src="img"/>
        </q-carousel-slide>
        <template v-slot:control>
          <q-carousel-control
            position="bottom-right"
            :offset="[18, 18]"
          >
            <q-btn
              push round dense color="white" text-color="primary"
              :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="fullscreen = !fullscreen"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>
  </q-card>
  </div>
  </div>
  <div class="q-pa-md">
  <div class="q-gutter-md fit row wrap justify-start items-start content-start" >
  <q-card class="col" style="min-width: 320px; max-width: 760px;">
    <q-card-section>
      <div class="text-h6">{{$t("Reviews")}}</div>
    </q-card-section>
  </q-card>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from 'vue';

export default {
    name: "AppList",
    data() {
        return {
          list: [],
          icon_png: window.atob(this.$route.params.app) + 'icon.png',
          details: {},
          images: [],
          stars: ref(3),
          source: "https://json.jerrywang.top",
          imgSource: "https://cdn.jsdelivr.net/gh/Jerrywang959/jsonpng",
          slide: ref(0),
          fullscreen: ref(false),
        };
    },
    methods: {
        getInfo() {
          let base_url = window.atob(this.$route.params.app);
          let app_json =  window.atob(this.$route.params.app) + 'app.json';
          let screen_1_png = window.atob(this.$route.params.app) + 'screen_1.png';
          // console.log(base_url);
          // console.log(app_json);
          // applist.json 软件详情
          axios.get(app_json)
            .then((res) => {
              // TODO 需要更多error handling
              this.details = res.data;
              if (!res.data.img_urls) {
                this.images = [ screen_1_png ];
              } else {
                this.images = JSON.parse(res.data.img_urls);
                if (!this.images) {
                  this.images = [ screen_1_png ];
                } else  {
                  let list = [...Array(this.images.length).keys()];
                  this.images = [];
                  list.forEach(n => {
                    this.images.push( base_url + 'screen_'+(n+1)+'.png' );
                  });
                }
              }
              console.log("details", this.details);
              console.log("images", this.images, typeof(this.images), this.images.length);
            });
        },
    },
    mounted() {
        this.getInfo();
    },
    beforeCreate: function() {
        document.body.className = 'light-body';
    },
};
</script>
<style scoped>
/*单个应用模块*/
.item {
  width: 300px;
  height: 100px;
  float: left;
  transition: all 0.25s;
  margin: 15px;
  color: #6d6d6d;
  border-radius: 18px;
  background-color: #F4F4F6;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.item:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  -webkit-transform: scale(1.07, 1.07);
  transform: scale(1.07, 1.07);
}
</style>
