<template>
  <MainLayout>
    <q-page-container class="bg-grey-3">
      <q-page class="row">
        <q-img
          class="col-12 col-md-6"
          style="max-width: 100%; height: 100%"
          src="/login.svg" />

        <q-card flat class="col-12 col-md-6 no-border column justify-center items-center">
          <router-view></router-view>
        </q-card>
      </q-page>
    </q-page-container>

  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from './MainLayout.vue';

</script>

<style scoped>

</style>
