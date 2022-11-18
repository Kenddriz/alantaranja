<template>
  <MainLayout>
    <template v-if="$q.screen.lt.md" v-slot:button>
      <q-btn
        @click="rightMenu = !rightMenu"
        flat
        dense
        icon="menu" />
    </template>

    <template v-slot:middle>
      <q-btn
        @click="logout"
        color="deep-orange"
        flat
        no-caps
        :label="$t('logout')"
        dense
        icon-right="arrow_forward" />
    </template>

    <q-page-container class="bg-grey-3">
      <q-page padding>
        <router-view></router-view>
      </q-page>
    </q-page-container>

    <q-drawer
      show-if-above
      v-model="rightMenu"
      :width="250"
      class="q-pa-sm q-card--bordered"
      style="border-bottom-width: 0; border-right-width: 0; border-left-width: 0"
      side="right">
      <q-list padding>
        <template
          v-for="(m, index) in menu"
          :key="index">
          <q-separator v-if="m.separator" />

          <q-item-label v-else-if="!m.to" header>
            {{  $t(m.title) }}
          </q-item-label>

          <q-item
            v-else
            exact
            exact-active-class="text-positive"
            :to="m.to">
            <q-item-section avatar>
              <q-icon :name="m.icon" />
            </q-item-section>
            <q-item-section>
              {{ $t(m.title) }}
            </q-item-section>
          </q-item>
        </template>

      </q-list>
    </q-drawer>
  </MainLayout>
</template>

<script lang="ts" setup>
  import MainLayout from 'layouts/MainLayout.vue';
  import {ref} from 'vue';
  import {ROUTES_DATA} from 'layouts/routes-data';
  import {useSession} from 'src/graphql/users/session';

  const rightMenu = ref(false);

  const menu = ROUTES_DATA.admin

  const { logout } = useSession();

</script>

<style scoped>

</style>
