<template>

  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
      <q-img :src="details.icons"/>
  <h5>{{details.Name}} </h5>
  <p> {{details.Tags}} </p>
  <p> {{details.Filename}} </p>
    </q-card>
    <q-card class="my-card">
      <q-list>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="local_bar" />
          </q-item-section>
          <q-item-section>
            <q-item-label>PkgName</q-item-label>
            <q-item-label caption>{{details.Pkgname}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="local_bar" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Version</q-item-label>
            <q-item-label caption>{{details.Version}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="local_bar" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Author</q-item-label>
            <q-item-label caption>{{details.Author}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="local_bar" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Official Site</q-item-label>
            <q-item-label caption>{{details.Website}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="red" name="local_gas_station" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Contributor</q-item-label>
            <q-item-label caption>{{details.Contributor}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="red" name="local_gas_station" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Update Time</q-item-label>
            <q-item-label caption>{{details.Update}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="red" name="local_gas_station" />
          </q-item-section>
          <q-item-section>
            <q-item-label>File Size</q-item-label>
            <q-item-label caption>{{details.Size}}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-card>
  </div>


  <h5> Info </h5>
  <p> {{details.More}} </p>
  <h5> ScreenShot </h5>
  <div class="q-pa-md" style="max-width: 700px">
    <q-carousel
      swipeable
      animated
      v-model="slide"
      v-model:fullscreen="fullscreen"
      thumbnails
      infinite
    >
      <q-carousel-slide 
        v-for="(img,index) in images" 
        :key="index" 
        :name="index" 
        :img-src="img" 
      >
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

  <h5> Reviews </h5>
</template>

<script>
import axios from "axios";
import { ref } from 'vue';

export default {
    name: "AppList",
    data() {
        return {
          list: [],
          details: {},
          images: [],
          source: "https://json.jerrywang.top",
          imgSource: "https://cdn.jsdelivr.net/gh/Jerrywang959/jsonpng",
          slide: ref(0),
          fullscreen: ref(false),
        };
    },
    methods: {
        getInfo() {
          let detailsUri = window.atob(this.$route.params.app);
          console.log(detailsUri);
          //applist.json 软件详情
          axios.get(detailsUri)
            .then((res) => {
              // TODO 需要更多error handling
              this.details = res.data;
              if (!res.data.img_urls) {
                this.images = [ "https://cdn.quasar.dev/img/mountains.jpg" ];
              } else {
                this.images = JSON.parse(res.data.img_urls);
                if (!this.images) {
                  this.images = [ "https://cdn.quasar.dev/img/mountains.jpg" ];
                }
              }
              console.log(this.details);
              console.log(this.images, typeof(this.images), this.images.length);
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
