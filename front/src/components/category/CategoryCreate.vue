<template>
  <CategoryForm
    v-model:label="input.label"
    v-model:parentId="input.parentId"
    v-model:description="input.description"
    @save="submit"
    :categories="categories">
    <div class="text-h6 col-12">
      Nouvelle catégorie
    </div>
    <template v-slot:button>
      <q-btn
        type="submit"
        dense
        color="primary"
        icon-right="add"
        class="full-width"
        outline
        label="Add" />
    </template>
  </CategoryForm>
</template>

<script lang="ts" setup>
  import CategoryForm from './CategoryForm.vue';
  import {Category, CategoryCreateInput, Family, MutationCategoryCreateArgs} from 'src/graphql/types';
  import {gql} from '@apollo/client';
  import {useMutation} from '@vue/apollo-composable';
  import { reactive } from 'vue';
  import {FAMILY_FIELDS} from 'src/graphql/family/families';
  import {useQuasar} from 'quasar';
  import {useI18n} from 'vue-i18n';

  const props = defineProps<{
    categories: Category[]
  }>();

  type Data = {
    categoryCreate: Family;
  }

  const MUTATION = gql`
    mutation CategoryCreate($input: CategoryCreateInput!) {
        categoryCreate(input: $input) {
            ${FAMILY_FIELDS}
        }
    }
  `;
  const defaultInput: CategoryCreateInput = {
    parentId: null,
    label: '',
    description: '',
  }
  const input = reactive<CategoryCreateInput>({ ...defaultInput });

  const { loading, mutate, onDone} = useMutation<
    Data,
    MutationCategoryCreateArgs>(MUTATION, {
      update: (cache, { data }) => {
        if(data?.categoryCreate) {
          cache.modify({
            fields: {
              families(existingRef: any[], { toReference }) {
                return [toReference(data.categoryCreate), ...existingRef];
              }
            }
          });
        }
      }
  });

  const { notify } = useQuasar();
  const { t } = useI18n();
  onDone(({ data, errors }) => {
    console.log(data, errors);
    if(data?.categoryCreate) {
      notify({
        color: 'positive',
        message: t('creationSuccess'),
      });
      Object.assign(input, defaultInput);
    } else {
      const message = errors[0]?.extensions?.exception?.thrownValue;
      notify({
        color: 'negative',
        message: t(message ? `category.${message}` : 'creationFailed'),
      });
    }
  });

  function submit() {
    void mutate({ input });
  }

</script>

<style scoped>

</style>
