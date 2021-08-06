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

        <q-tab-panels v-model="tab" animated class="bg-primary text-white">
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
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      </div>
    </div>
  </div>
</template>


<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Management',
    data() {
      return {
        tab: ref('downloads'),
      }
    },
    methods: {
    }
})
</script>
