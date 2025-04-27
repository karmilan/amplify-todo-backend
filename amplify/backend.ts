import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { getTodos } from "./functions/getTodos/resource";
import { sayHello } from "./functions/say-hello/resource";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
export const backend = defineBackend({
  auth,
  data,
  sayHello,
  getTodos,

  // Define your DynamoDB Table
  // todoTable: data.dynamodbTable({
  //   partitionKey: { name: 'id', type: 'string' },
  // }),

  // Define your Lambda function
  // getTodosLambda: amplifyFunction({
  //   entry: './path-to-getTodos.handler', // path to your function file
  //   environment: {
  //     TABLE_NAME: data.,
  //   },
  // }),
});
