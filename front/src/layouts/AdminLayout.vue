<template>
  <q-layout view="hHh LpR fff">

    <q-header class="bg-white text-dark">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn
            flat
            to="/admin/"
            round
            dense
            icon="home" />
          <span class="q-mt-md text-body2 text-bold">
            {{ $t(`paths.${$route.name}`) }}
          </span>
        </q-toolbar-title>
        <q-space />
        <q-btn
          @click="logout"
          color="orange"
          flat
          no-caps
          :label="$t('logout')"
          dense
          icon-right="arrow_forward" />
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>

    <AppFooter />
  </q-layout>
</template>

<script lang="ts" setup>
  import AppFooter from 'layouts/AppFooter.vue';
  import {useSession} from 'src/graphql/users/session';

  const { logout } = useSession();
</script>

<style scoped>

</style>
