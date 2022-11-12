<template>
  <CategoryCreate :categories="categories" />

  <q-separator spaced="lg" />

  <div class="row q-col-gutter-md">

    <div class="col-12 col-md-2 col-sm-3">
      <q-card flat class="flex justify-around items-center category">
        <q-btn
          class="q-ml-md"
          @click="setParent(null)"
          round
          flat
          color="primary"
          icon="folder" />
        <q-separator vertical />
        <q-btn
          round
          @click="onBack"
          flat
          class="q-mr-lg"
          color="primary"
          icon="undo" />
      </q-card>
    </div>
    <div
      v-for="(fam, index) in children"
      :key="index"
      class="col-12 col-md-2 col-sm-3">
      <q-card class="category" flat>
        <q-card-section class="text-center cursor-pointer">
          {{ fam.category.label }}
        </q-card-section>
        <q-card-actions align="center" class="q-pa-sm">
          <template v-if="userId === fam.category.userId">
            <q-btn
              size="sm"
              flat
              round
              @click="openUpdate(fam)"
              color="primary"
              icon="edit" />
            <q-btn
              size="sm"
              @click="remove(fam.id)"
              :loading="loadingRemove && idToRemove === fam.id"
              round
              flat
              color="deep-orange"
              icon="delete" />
          </template>
          <q-btn
            size="sm"
            round
            @click="setParent(fam)"
            flat
            color="primary"
            icon="read_more" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import CategoryCreate from './CategoryCreate.vue';
  import {Category, Family} from 'src/graphql/types';
  import {useFamilies} from 'src/graphql/family/families';
  import {computed, defineAsyncComponent, ref} from 'vue';
  import {useQuasar} from 'quasar';
  import {useFamilyRemove} from 'src/graphql/family/family-remove';
  import {CONSTANTS} from "src/utils/utils";

  const { loading, families } = useFamilies();

  const categories = computed(() => {
    const set = new Set<Category>();
    families.value.forEach(fam => set.add(fam.category));
    return Array.from(set);
  });

  const parent = ref<Family>(null);
  function setParent(family: Family) {
    parent.value = family;
  }

  function onBack() {
    parent.value = families.value.find(fam => fam.category.id == parent.value?.parentId);
  }

  const children = computed(() => families.value.filter(fam => fam.parentId == parent.value?.category?.id));

  const { dialog } = useQuasar();

  function openUpdate(family: Family) {
    const cats = new Set<Category>();
    families.value.forEach(fam => {
      if(fam.category.id !== family.category.id) cats.add(fam.category);
    })
    dialog({
      component: defineAsyncComponent(() => import('components/category/CategoryUpdate.vue')),
      componentProps: {
        family,
        categories: Array.from(cats),
      }
    })
  }

  const { loadingRemove, remove, idToRemove } = useFamilyRemove();

  const userId = Number(localStorage.getItem(CONSTANTS.userId));
</script>

<style lang="scss" scoped>
  .category {
    min-height: 100px;
  }
</style>
