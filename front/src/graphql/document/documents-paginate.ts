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
import {formatFilesSize} from "src/utils/file";

type Data = {
  documentsPaginate: DocumentsPagination;
}

const QUERY = (teacher = false) => gql`
    query DocumentsPaginate($input: DocumentsPaginationInput!){
      documentsPaginate(input: $input) {
        items {
          ${DOCUMENT_FIELDS}
          ${ teacher ? '' : 'user{id lastName firstName}'}
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
      field: (doc: Document) => formatFilesSize(doc.files),
      sortable: true
    },
    {
      name: 'user',
      align: 'center',
      label: t('by'),
      field: (doc: Document) => `${doc.user.lastName} ${doc.user.firstName}`,
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
    userId: null,
  });

  if(path.includes('teacher')) {
    columns.splice(5, 2);
    input.userId = Number(localStorage.getItem(CONSTANTS.userId));
  }

  const { loading, result } = useQuery<Data, QueryDocumentsPaginateArgs>(QUERY(path.includes('teacher')), { input });

  return {
    loading,
    input,
    doc: computed(() => result.value?.documentsPaginate || InitialPagination),
    columns,
  }
}
