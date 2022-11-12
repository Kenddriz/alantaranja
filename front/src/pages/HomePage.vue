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

        <BuyDocument :categories="categories">
          <CartAuthDialog :user="currentUser.id" :cart="cart.length" />
        </BuyDocument>

      </q-page>
    </q-page-container>

    <q-drawer
      show-if-above
      v-model="rightMenu"
      :mini-width="350"
      class="q-pa-sm q-card--bordered"
      style="border-bottom-width: 0; border-right-width: 0; border-left-width: 0"
      side="right">

      <q-list padding>
        <q-item v-if="currentUser.id" class="column items-center">
          <q-avatar size="72px">
            <img :src="currentUser.avatar ? getImage(currentUser.avatar) : '/login.svg'">
          </q-avatar>
          <q-btn
            :to="CONSTANTS.baseRoutes[currentUser.role]"
            color="positive"
            icon-right="arrow_forward"
            label="Espace personnel"
            dense
            flat
            size="md"
            no-caps/>
        </q-item>
        <template v-else>
          <q-item
            class="text-grey-8"
            clickable
            v-for="(m, index) in authMenu"
            :to="`/auth/${m.label}`"
            :key="index">
            <q-item-section avatar>
              <q-icon color="grey-8" :name="m.icon" />
            </q-item-section>
            <q-item-section>
              {{ $t(`paths.${m.label}`) }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>

      <q-separator class="q-mb-lg" />

      <q-input
        dense
        outlined
        :model-value="filterCategories"
        v-model="filterCategories"
        label="Filter categories"/>

      <div class="text-subtitle1 q-py-md">Filter by categories</div>

      <q-tree
        :nodes="makeTree(families, null)"
        default-expand-all
        node-key="key"
        :filter="filterCategories"
        control-color="grey-6"
        tick-strategy="leaf"
        v-model:ticked="categories"
      />
    </q-drawer>
  </HomeLayout>
</template>

<script lang="ts" setup>
  import {ref} from 'vue';
  import {useFamilies} from 'src/graphql/family/families';
  import {CONSTANTS, getImage, makeTree} from 'src/utils/utils';
  import HomeLayout from 'layouts/HomeLayout.vue';
  import {useWHoAmI} from 'src/graphql/users/whoAmi';
  import { cart } from 'src/graphql/payment/cart';
  import CartAuthDialog from 'components/payment/CartAuthDialog.vue';
  import BuyDocument from 'components/payment/BuyDocument.vue';

  const authMenu = [
    { icon: 'login', label: 'login'  },
    { icon: 'person_add', label: 'register' },
  ]
  const rightMenu = ref(false);

  const { families, loading } = useFamilies();

  const categories = ref<string[]>([]);
  const filterCategories = ref<string>('');

  const { currentUser } = useWHoAmI();

</script>

<style scoped>

</style>
