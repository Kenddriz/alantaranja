<template>
  <h3 class="q-mb-none">Our collaborators</h3>
  <span>Les gens diplômés et experimentés qui offrent des documents</span>

  <div class="flex justify-center items-center q-my-xl">
    <div class="flex justify-around q-gutter-md">

      <q-card
        bordered
        flat
        v-for="index in 8"
        :key="index"
        class="my-card card">
        <img src="/collecting.svg">

        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ lorem }}
        </q-card-section>
      </q-card>

    </div>
  </div>

</template>

<script lang="ts" setup>

  import {ROUTES_DATA} from "layouts/routes-data";

  const collaborators = ROUTES_DATA.admin;
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 300px
}

</style>
