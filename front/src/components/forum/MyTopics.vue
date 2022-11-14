<template>
  <div class="bg-primary q-pa-sm flex justify-between text-white q-mb-md">
    <div class="q-my-sm q-gutter-x-sm">
      <q-btn
        dense
        to="/forum/create-topic"
        unelevated
        text-color="white"
        icon="add"
        flat/>

      <q-btn
        dense
        icon="filter_list"
        flat>
        <q-menu fit>
          <q-list>
            <q-item-label header>{{ $t('filterBy') }}</q-item-label>
            <q-item
              v-for="(fil, index) in filterOptions"
              :key="index"
              clickable
              @click="input.from = fil.value"
              :active="input.from === fil.value"
              active-class="bg-amber text-white"
              v-close-popup>
              <q-item-section avatar>
                <q-icon :name="fil.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{$t(fil.label)}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <q-btn
        dense
        icon="swap_vert"
        flat>
        <q-menu>
          <q-list>
            <q-item-label header>{{ $t('direction') }}</q-item-label>
            <q-item
              v-for="(fil, index) in orderOptions"
              :key="index"
              clickable
              @click="input.to = fil.value"
              :active="input.to === fil.value"
              active-class="bg-amber text-white"
              v-close-popup>
              <q-item-section avatar>
                <q-icon :name="fil.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{$t(fil.label)}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <q-input
      v-model="keyword"
      :model-value="keyword"
      @keyup.enter="input.keyword = keyword"
      color="white"
      dark
      dense>
      <template v-slot:append>
        <q-btn
          @click="input.keyword = keyword"
          color="white"
          :loading="loading"
          flat
          dense
          icon="search" />
      </template>
    </q-input>

    <q-pagination
      v-model="input.page"
      :max="15"
      :max-pages="6"
      boundary-numbers
      outline
      color="white"
      active-design="unelevated"
      active-color="orange"
      active-text-color="orange"
    />
  </div>

  <q-list
    separator
    class="rounded-borders bg-white">
    <q-item>
      <q-item-section>
        <q-item-label header>
          {{ $t('topic.all') }}
        </q-item-label>
      </q-item-section>

      <q-item-section class="q-gutter-y-sm" avatar>
        <q-icon color="positive" size="xs" name="comment" />
        <q-icon color="primary" size="xs" name="visibility" />
      </q-item-section>
    </q-item>

    <q-item
      exact
      exact-active-class="bg-brown-2"
      :to="`/forum/topic-details/${sub.id}`"
      v-for="(sub, index) in topic.items"
      :key="index">
      <q-item-section avatar top>
        <q-avatar color="grey-3">
          <q-img v-if="sub.user.avatar" :src="getImage(sub.user.avatar)" />
          <q-icon v-else name="person" color="black" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">
          {{ sub.title }}
        </q-item-label>
        <q-item-label caption lines="1">
          {{ sub.createdAt }}
        </q-item-label>
      </q-item-section>

      <q-item-section avatar>
        <q-item-label class="text-positive" lines="1">
          {{ sub.statistics[0] }}
        </q-item-label>
        <q-item-label caption class="text-primary" lines="1">
          {{ sub.statistics[1] }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import {computed, reactive, ref} from "vue";
  import {PaginationInput, QueryTopicsPaginateArgs, TopicsPagination} from "src/graphql/types";
  import {gql} from "@apollo/client/core";
  import {SUBJECT_FIELDS} from "src/graphql/topic/topic";
  import {InitialPagination, PAGINATION_META} from "src/utils/pagination";
  import {useQuery} from "@vue/apollo-composable";
  import {getImage} from "src/utils/utils";

  const filterOptions = [
    { label: 'date', value: 'created_at', icon: 'event' },
    { label: 'topic.subject', value: 'title', icon: 'topic' }
  ];

  const orderOptions = [
    { label: 'asc', value: 'ASC', icon: 'arrow_upward' },
    { label: 'desc', value: 'DESC', icon: 'arrow_downward' }
  ];

  const input = reactive<PaginationInput>({
    page: 1,
    limit: 15,
    to: 'DESC',
    from: 'created_at',
    keyword: '',
  });

  const keyword = ref<string>('');

  type Data = {
    topicsPaginate: TopicsPagination;
  }

  const QUERY = gql`
    query TopicsPaginate($input: PaginationInput!) {
        topicsPaginate(input: $input) {
            items {
                ${SUBJECT_FIELDS}
                statistics
                user{id lastName firstName avatar}
            }
            ${PAGINATION_META}
        }
    }
   `;

  const { loading, result } = useQuery<Data, QueryTopicsPaginateArgs>(QUERY, { input });

  const topic = computed(() => result.value?.topicsPaginate || InitialPagination);

</script>
