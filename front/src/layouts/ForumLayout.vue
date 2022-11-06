<template>
  <HomeLayout>
    <template v-slot:middle>
      FORUM
    </template>

    <template v-if="$q.screen.lt.md" v-slot:button>
      <q-btn
        @click="rightMenu = !rightMenu"
        flat
        dense
        icon="menu" />
    </template>

    <q-page-container class="bg-grey-3">
      <q-page padding>
        <router-view></router-view>
      </q-page>
    </q-page-container>
    <q-drawer
      show-if-above
      v-model="rightMenu"
      :width="350"
      class="q-pa-sm q-card--bordered"
      style="border-bottom-width: 0; border-right-width: 0; border-left-width: 0"
      side="right">
      <MyTopics />
    </q-drawer>
  </HomeLayout>
</template>

<script lang="ts" setup>
  import HomeLayout from "layouts/HomeLayout.vue";
  import {ref} from "vue";
  import MyTopics from "components/forum/MyTopics.vue";

  const rightMenu = ref(false);
</script>

<style scoped>

</style>
