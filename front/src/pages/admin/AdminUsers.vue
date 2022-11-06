<template>
  <q-page padding class="row q-col-gutter-md reverse-wrap">
    <div class="col-12 col-md-8">
      <CommonFilters
        v-model:limit="input.limit"
        v-model:filter="input.keyword"
        v-model:from="input.from"
        v-model:to="input.to" />
      <q-table
        class="q-mt-md"
        title="Users list"
        :loading="loading"
        :rows="user.items"
        :columns="columns"
        row-key="id"
        flat>
        <template v-slot:body-cell-avatar="props">
          <q-td :props="props">
            <q-avatar rounded color="grey-3">
              <q-img v-if="props.value" :src="getImage(props.value)" />
              <q-icon color="primary" v-else name="person" />
            </q-avatar>
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              @click="openUpdate(props.row)"
              dense
              flat
              color="primary"
              icon="edit" />
            <q-btn
              dense
              flat
              color="deep-orange"
              icon="delete" />
          </q-td>
        </template>
      </q-table>
    </div>
    <div class="col-12 col-md-4">
      <UserCreate />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
  import CommonFilters from 'components/CommonFilters.vue';
  import UserCreate from 'components/user/UserCreate.vue';
  import {computed, defineAsyncComponent, reactive, ref} from 'vue';
  import {PaginationInput, QueryUsersPaginateArgs, User, UsersPagination} from 'src/graphql/types';
  import {gql} from '@apollo/client';
  import {InitialPagination, PAGINATION_META} from 'src/utils/pagination';
  import {USER_FIELDS} from 'src/graphql/users/user';
  import {useQuery} from '@vue/apollo-composable';
  import {useI18n} from 'vue-i18n';
  import {useQuasar} from 'quasar';
  import {getImage} from 'src/utils/utils';

  const range = ref({ from: '2020/07/08', to: '2020/07/17' });

  const { t, tm } = useI18n();

  const columns = [
    {
      name: 'avatar',
      label: t('user.avatar'),
      field: 'avatar',
      align: 'left',
      sortable: true
    },
    {
      name: 'lastName',
      label: t('user.lastName'),
      align: 'left',
      field: 'lastName',
      sortable: true
    },
    {
      name: 'firstName',
      label: t('user.firstName'),
      align: 'left',
      field: 'firstName',
      sortable: true
    },
    {
      name: 'status',
      label: t('user.status'),
      align: 'left',
      field: 'status',
      sortable: true
    },
    {
      name: 'role',
      label: t('user.role'),
      align: 'left',
      field: (user: User) => tm('user.roles')[user.role],
      sortable: true
    },
    {
      name: 'lastConnexion',
      label: t('user.lastConnexion'),
      align: 'lastConnexion',
      field: 'lastConnexion',
      sortable: true
    },
    {
      name: 'createdAt',
      label: t('user.createdAt'),
      align: 'left',
      field: 'createdAt',
      sortable: true
    },
    {
      name: 'action',
      label: t('actions'),
      align: 'right',
    }
  ];

  type Data = {
    usersPaginate: UsersPagination;
  }

  const QUERY = gql`
    query UsersPaginate($input: PaginationInput!) {
        usersPaginate(input: $input) {
            items {
                ${USER_FIELDS}
            }
            ${PAGINATION_META}
        }
    }
  `;

  const input = reactive<PaginationInput>({
    keyword: '',
    to: '',
    from: '',
    limit: 20,
    page: 1,
  })
  const { loading, result } = useQuery<Data, QueryUsersPaginateArgs>(QUERY, { input });

  const user = computed(() => result.value?.usersPaginate || InitialPagination);

  //update

  const { dialog } = useQuasar();

  function openUpdate(user: User) {
    dialog({
      componentProps: { user },
      component: defineAsyncComponent(() => import('components/user/UserUpdate.vue')),
    })
  }
</script>

<style lang="scss" scoped>


</style>
