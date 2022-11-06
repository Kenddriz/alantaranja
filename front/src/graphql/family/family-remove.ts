import {gql} from '@apollo/client';
import {useMutation} from '@vue/apollo-composable';
import {MutationFamilyRemoveArgs} from 'src/graphql/types';
import {useI18n} from 'vue-i18n';
import {Dialog, Notify} from 'quasar';
import {ref} from 'vue';

type Data = {
    familyRemove: string;
  }

  const MUTATION = gql`
    mutation FamilyRemove($id: String!) {
      familyRemove(id: $id)
    }
  `;

  export const useFamilyRemove = () => {

    const { t } = useI18n();

    const idToRemove = ref<string>('');

    const { loading: loadingRemove, mutate, onDone } = useMutation<
      Data,
      MutationFamilyRemoveArgs>(MUTATION,    {
        update(cache, { data }) {
          if (data?.familyRemove) {
            cache.modify({
              fields: {
                families(existingRef: any[], { readField }) {
                  return existingRef.filter(
                    (eRef) => readField('id', eRef) !== data.familyRemove
                  );
                },
              },
            });
          }
        },
    });

    onDone(({ data }) => {
      if(data?.familyRemove) {
        Notify.create({
          color: 'positive',
          message: t('removeSuccess')
        });
      } else {
        Notify.create({
          color: 'negative',
          message: t('unknownError'),
        })
      }
      idToRemove.value = '';
    });

    function remove(id: string) {
      Dialog.create({
        title: t('removeTitle'),
        message: t('category.removeConfirmation'),
        ok: t('yes'),
      }).onOk(() => {
        idToRemove.value = id;
        void mutate({ id });
      });
    }

    return { remove, loadingRemove, idToRemove }
  }
