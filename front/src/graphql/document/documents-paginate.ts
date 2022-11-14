import {
  DocumentsPagination,
  QueryDocumentsPaginateArgs,
  Document,
  DocumentsPaginationInput
} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {DOCUMENT_FIELDS} from 'src/graphql/document/document';
import {InitialPagination, PAGINATION_META} from 'src/utils/pagination';
import {useQuery} from '@vue/apollo-composable';
import {computed, reactive} from 'vue';
import {useI18n} from 'vue-i18n';
import {CONSTANTS, getExt} from 'src/utils/utils';
import {useRoute} from "vue-router";
import {date} from "quasar";
import formatDate = date.formatDate;

type Data = {
  documentsPaginate: DocumentsPagination;
}

const QUERY = gql`
    query DocumentsPaginate($input: DocumentsPaginationInput!){
      documentsPaginate(input: $input) {
        items {
          ${DOCUMENT_FIELDS}
          user{id lastName firstName}
        }
        ${PAGINATION_META}
      }
    }
`;

export const useDocumentsPaginate = () => {
  const { path } = useRoute();
  const { t } = useI18n();
  const columns = [
    {
      name: 'createdAt',
      label: t('date'),
      align: 'center',
      field: (doc: Document) => formatDate(doc.createdAt, t('localDate.long')),
      sortable: true
    },
    {
      name: 'title',
      label: t('document.title'),
      align: 'center',
      field: 'title',
      sortable: true
    },
    {
      name: 'category',
      align: 'center',
      label: t('category.title'),
      field: (row: Document) => row.family?.category?.label,
      sortable: true
    },
    {
      name: 'fileCount',
      align: 'center',
      label: t('document.fileCount'),
      field: (row: Document) => row.files.length,
      sortable: true
    },
    {
      name: 'sizes',
      align: 'center',
      label: t('document.size'),
      field: (doc: Document) => doc.files.reduce((cum, cur) => cum + cur.size,0),
      sortable: true
    },
    {
      name: 'user',
      align: 'center',
      label: t('by'),
      field: (doc: Document) => `${doc.user.lastName} ${doc.user.firstName}`,
      /*field: (doc: Document) => doc.files.reduce((cum: string[], cur) => {
        const ext = getExt(cur.name);
        if(!cum.find(v => v === ext)) cum.push(ext);
        return cum;
      }, []).join(', '),*/
      sortable: true
    },
    {
      name: 'price',
      align: 'center',
      label: t('document.price'),
      field: (doc: Document) => doc.price ? `${doc.price} Ar` : t('free'),
      sortable: true
    },
    {
      name: 'hidden',
      label: t('document.isHidden'),
      field: (row: Document) => t(row.hidden ? 'yes' : 'no'),
      sortable: true
    },
    {
      name: 'action',
      align: 'center',
      label: t('actions'),
    },
  ];

  const input = reactive<DocumentsPaginationInput>({
    limit: 15,
    page: 1,
    from: '',
    keyword: '',
    to: '',
    hidden: [true, false],
    categories: [],
    userId: path.includes('teacher') ? Number(localStorage.getItem(CONSTANTS.userId)) : null,
  });
  const { loading, result } = useQuery<Data, QueryDocumentsPaginateArgs>(QUERY, { input });

  return {
    loading,
    input,
    doc: computed(() => result.value?.documentsPaginate || InitialPagination),
    columns,
  }
}
