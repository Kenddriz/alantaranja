export const PAYMENT_FIELDS = `
  id
  createdAt
  status
  note
  proof
  link
  downloadAt
  documents{
    document{
      id
      title
      files{name size}
    }
    price
  }
`;
