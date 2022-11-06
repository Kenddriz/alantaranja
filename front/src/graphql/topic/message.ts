import {Topic} from "src/graphql/types";

export const MESSAGE_FIELDS = `
  id
  body
  messageId
  createdAt
  user{id lastName firstName avatar}
  reactions {
    label
    value
  }
`;

export const defaultTopic: Topic = {
  body: "",
  createdAt: undefined,
  id: "",
  statistics: [0, 0],
  title: ""
}
