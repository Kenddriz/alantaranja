<template>
  <q-dialog ref="dialogRef">
    <CategoryForm
      style="max-width: 400px"
      v-model:label="input.label"
      v-model:parentId="input.parentId"
      :isUpdate="true"
      v-model:description="input.description"
      @save="submit"
      :categories="categories">
      <div class="text-h6 col-12 flex justify-between">
        Mise à jour de la catégorie
        <q-btn
          dense
          flat
          v-close-popup
          icon="close"
          round
          color="deep-orange" />
      </div>
      <template v-slot:button>
        <q-btn
          type="submit"
          :loading="loading"
          dense
          color="primary"
          icon-right="save"
          class="full-width"
          outline
          :label="$t('save')" />
      </template>
    </CategoryForm>
  </q-dialog>
</template>

<script lang="ts" setup>
  import CategoryForm from './CategoryForm.vue';
  import {
    Category,
    Family,
    MutationFamilyUpdateArgs
  } from 'src/graphql/types';
  import {gql} from '@apollo/client';
  import {useMutation} from '@vue/apollo-composable';
  import { reactive } from 'vue';
  import {FAMILY_FIELDS} from 'src/graphql/family/families';
  import {useDialogPluginComponent, useQuasar} from 'quasar';
  import {useI18n} from 'vue-i18n';
  import {FamilyUpdateInput} from '../../../../back/src/family/resolvers/family-update-resolver';

  const { dialogRef, onDialogCancel } = useDialogPluginComponent();

  const props = defineProps<{
    categories: Category[],
    family: Family,
  }>();

  type Data = {
    familyUpdate: Family;
  }

  const MUTATION = gql`
    mutation FamilyUpdate($input: FamilyUpdateInput!){
      familyUpdate(input: $input) {
            ${FAMILY_FIELDS}
        }
    }
`;

  const input = reactive<FamilyUpdateInput>({
    id: props.family.id,
    parentId: props.family.parentId,
    label: props.family.category.label,
    description: props.family.description,
  });

  const { loading, mutate, onDone } = useMutation<Data, MutationFamilyUpdateArgs>(MUTATION);

  const { notify } = useQuasar();
  const { t } = useI18n();
  onDone(({ data, errors }) => {
    console.log(data, errors);
    if(data?.familyUpdate) {
      onDialogCancel();
      notify({
        color: 'positive',
        message: t('updateSuccess'),
      });
    } else {
      const message = errors[0]?.extensions?.exception?.thrownValue;
      notify({
        color: 'negative',
        message: t(message ? `category.${message}` : 'updateFailed'),
      });
    }
  });

  function submit() {
    console.log(input);
    void mutate({ input });
  }

</script>

<style scoped>

</style>
