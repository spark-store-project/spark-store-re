<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
})
</script>

<style>
.native-window-draggable {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
</style>
