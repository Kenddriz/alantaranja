<template>
  <HomeLayout>
    <template v-slot:middle>
      FORUM
    </template>
    <q-page-container class="bg-grey-3">
      <q-page padding>
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </HomeLayout>
</template>

<script lang="ts" setup>
import HomeLayout from "layouts/HomeLayout.vue";

</script>

<style scoped>

</style>
