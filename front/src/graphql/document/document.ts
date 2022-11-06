import {CATEGORY_FIELDS} from 'src/graphql/categories/categories';

export const DOCUMENT_FIELDS = `
  id
  title
  description
  files{name size}
  hidden
  price
  createdAt
  family{
    id
    category {
      ${CATEGORY_FIELDS}
    }
  }
`;
