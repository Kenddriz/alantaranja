import {DocumentsPagination, QueryDocumentsPaginateArgs, Document, PaginationInput} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {DOCUMENT_FIELDS} from 'src/graphql/document/document';
import {InitialPagination, PAGINATION_META} from 'src/utils/pagination';
import {useQuery} from '@vue/apollo-composable';
import {computed, reactive} from 'vue';
import {useI18n} from 'vue-i18n';
import {getExt} from 'src/utils/utils';

type Data = {
  documentsPaginate: DocumentsPagination;
}

const QUERY = gql`
    query DocumentsPaginate($input: PaginationInput!){
      documentsPaginate(input: $input) {
        items {
          ${DOCUMENT_FIELDS}
        }
        ${PAGINATION_META}
      }
    }
`;

export const useDocumentsPaginate = () => {
  const { t } = useI18n();
  const columns = [
    {
      name: 'createdAt',
      label: t('date'),
      align: 'left',
      field: 'createdAt',
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
      name: 'types',
      align: 'center',
      label: t('document.types'),
      field: (doc: Document) => doc.files.reduce((cum: string[], cur) => {
        const ext = getExt(cur.name);
        if(!cum.find(v => v === ext)) cum.push(ext);
        return cum;
      }, []).join(', '),
      sortable: true
    },
    {
      name: 'price',
      label: t('document.price'),
      field: 'price',
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
      label: 'Action',
    },
  ];

  const input = reactive<PaginationInput>({
    limit: 50,
    page: 1,
    from: '',
    keyword: '',
    to: '',
  });
  const { loading, result } = useQuery<Data, QueryDocumentsPaginateArgs>(QUERY, { input });

  return {
    loading,
    input,
    doc: computed(() => result.value?.documentsPaginate || InitialPagination),
    columns,
  }
}