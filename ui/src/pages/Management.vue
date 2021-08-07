<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" >
      <div class="row justify-center">
      <q-card style="max-width: 720px" class="col">
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-3 text-grey-7"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="downloads" :label="$t('Downloads')" />
          <q-tab name="uploads" :label="$t('Uploads')" />
          <q-tab name="packaging" :label="$t('Packaging')" />
          <q-tab name="settings" :label="$t('Settings')" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="bg-grey-1">
          <q-tab-panel name="downloads">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="uploads">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="packaging">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="settings">
                <q-list>
      <q-item-label header>User Controls</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Content filtering</q-item-label>
          <q-item-label caption>
            Set the content filtering level to restrict
            apps that can be downloaded
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Password</q-item-label>
          <q-item-label caption>
            Require password for purchase or use
            password to restrict purchase
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
        <q-item-label header>{{$t('General')}}</q-item-label>

          <template
            v-for="(option, index) in booleanOptions"
            :key="option.title"
          >
          <q-item tag="label" v-ripple>
            <q-item-section side top>
              <q-checkbox v-model="booleanValue[index]" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t(option.title)}}</q-item-label>
              <q-item-label caption>
                {{$t(option.subtitle)}}
              </q-item-label>
            </q-item-section>
          </q-item>
          </template>

          <q-separator spaced />
          <q-item-label header>Notifications</q-item-label>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Battery too low</q-item-label>
            </q-item-section>
            <q-item-section side >
              <q-toggle color="blue" v-model="notif1" val="battery" />
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Friend request</q-item-label>
              <q-item-label caption>Allow notification</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-toggle color="green" v-model="notif2" val="friend" />
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Picture uploaded</q-item-label>
              <q-item-label caption>Allow notification when uploading images</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-toggle color="red" v-model="notif3" val="picture" />
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item-label header>Other settings</q-item-label>

          <q-item>
            <q-item-section side>
              <q-icon color="teal" name="volume_down" />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="volume"
                :min="0"
                :max="10"
                label
                color="teal"
              />
            </q-item-section>
            <q-item-section side>
              <q-icon color="teal" name="volume_up" />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <q-icon color="deep-orange" name="brightness_medium" />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="brightness"
                :min="0"
                :max="10"
                label
                color="deep-orange"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="mic"
                :min="0"
                :max="50"
                label
              />
            </q-item-section>
          </q-item>
    </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      </div>
    </div>
  </div>
</template>


<script>
import { defineComponent, ref } from 'vue';

const booleanOptions = [
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
];
const booleanValue = [
      false,
      false,
      false,
      false,
];

export default defineComponent({
    name: 'Management',
    setup() {
      return {
        notif1: ref(true),
        notif2: ref(true),
        notif3: ref(false),
        volume: ref(6),
        brightness: ref(3),
        mic: ref(8),
        booleanOptions,
        booleanValue,
     }
    },
    data() {
      return {
        tab: this.$route.params.tab,
      }
    },
    methods: {
    },
    mounted() {
    }
})
</script>
