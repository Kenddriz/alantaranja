import {gql} from '@apollo/client';
import {useQuery} from '@vue/apollo-composable';
import {Family} from 'src/graphql/types';
import {computed} from 'vue';
import {CATEGORY_FIELDS} from 'src/graphql/categories/categories';

type FamiliesData = {
  families: Family[];
};

export const FAMILY_FIELDS = `
    id
    category {
      ${CATEGORY_FIELDS}
    }
    parentId
    description
`;

export const FAMILIES_QUERY = gql`
  query Families{
    families {${FAMILY_FIELDS}}
  }
`;
export const useFamilies = () => {
  const { loading, result } = useQuery<
    FamiliesData
    >(FAMILIES_QUERY);
  const families = computed(() => result.value?.families || []);
  return { loading, families, result };
};
