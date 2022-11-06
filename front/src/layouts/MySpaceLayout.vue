<template>
  <HomeLayout>
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
              <q-btn flat dense round :icon="m.icon">
                <q-badge
                  v-if="index === 1"
                  :label="cart.length"
                  color="orange"
                  floating />
              </q-btn>
            </q-item-section>
            <q-item-section>
              {{ $t(m.title) }}
            </q-item-section>
          </q-item>
        </template>

        <q-separator />

        <q-item @click="logout" clickable>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            {{ $t("logout") }}
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>
  </HomeLayout>
</template>

<script lang="ts" setup>
  import HomeLayout from 'layouts/HomeLayout.vue';
  import {ref} from 'vue';
  import {ROUTES_DATA} from 'layouts/routes-data';
  import {useSession} from 'src/graphql/users/session';
  import {cart} from 'src/graphql/payment/cart';

  const rightMenu = ref(false);

  const menu = ROUTES_DATA.user;

  const { logout } = useSession();

</script>

<style scoped>

</style>
