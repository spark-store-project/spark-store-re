<template>
  <div class="">
    <q-list>
        <template
            v-for="item in list"
            :key="item.tip"
        >
        <!--        单个应用模块-->
          <q-item class="item">
            <q-item-section side top>
              <q-img
                  class="q-mt-sm"
                  no-spinner
                  width="56px"
                  height="56px"
                  :src="`${imgSource}/store/${category}/${item.Pkgname}/icon.png`"
                  alt="icon"
                  @click="GotoJson(item.Pkgname)"
              />
            </q-item-section>
            <q-item-section
              @click="GotoJson(item.Pkgname)"
            >
              <q-item-label class="text-bold text-black">{{item.Name}}</q-item-label>
              <q-item-label caption lines="3">{{item.More}}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
    </q-list>
  </div>
</template>

<script>
import axios from "axios";

export default {
    name: "AppList",
    data() {
        return {
            list: [],
            category: this.$route.params.category,
            downloadContent: "DOWNLOAD",
            source: "https://json.jerrywang.top",
            imgSource: "https://cdn.jsdelivr.net/gh/Jerrywang959/jsonpng",
        };
    },
    methods: {
        getInfo() {
            axios
                //39.106.2.2:38324
                .get(
                    `${this.source}/store/${this.category}/applist.json`
                )
                //applist.json 软件列表
                .then((res) => {
                    this.list = res.data;
                });
        },
        GotoJson(pkgn) {
          let detailsUri=`${this.source}/store/${this.category}/${pkgn}/app.json`;
          let base64encode= window.btoa(detailsUri);
          console.log(detailsUri, base64encode);
          this.$router.push({path: `/details/${base64encode}`})
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
  width: 280px;
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
