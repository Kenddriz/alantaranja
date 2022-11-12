<template>
  <div
    v-for="(overview, index) in overviews"
    :key="index"
    class="col-12 col-md-3">
    <q-card class="card fit rounded-borders">
      <q-card-section horizontal class="fit q-pa-md">
        <q-card-section class="col">
          <q-item>
            <q-item-section side>
              <q-icon size="sm" :name="overview.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6">
                {{ $t(overview.title) }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <div class="text-center text-body1">
            {{ overview.value }}
          </div>
        </q-card-section>
        <img
          class="q-mt-sm"
          :src="overview.image"
          :width="90"
          :height="90" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
  import {computed} from 'vue';
  import {Overview} from "src/graphql/types";
  import {gql} from "@apollo/client/core";
  import {useQuery} from "@vue/apollo-composable";

  type Data = {
    overviews: Overview;
  }

  const QUERY = gql`
    query Overviews {
        overviews {
            users
            topics
            documents
            revenue
        }
    }
 `;

  const { result } = useQuery<Data>(QUERY);

  const overviews = computed(() => ([
    {
      icon: 'person',
      title: 'paths.user',
      value: result.value?.overviews.users || 0,
      image: '/people.svg',
    },
    {
      icon: 'point_of_sale',
      title: 'payment.salesRevenue',
      value: `${result.value?.overviews.revenue || 0} Ar`,
      image: '/revenue.svg',
    },
    {
      icon: 'book',
      title: 'paths.document',
      value: result.value?.overviews.documents || 0,
      image: '/collecting.svg',
      to: 'kyc',
    },
    {
      icon: 'subject',
      title: 'paths.topic',
      value: result.value?.overviews.topics || 0,
      image: '/share_opinion.svg',
    }
  ]));
</script>

<style scoped>

</style>
