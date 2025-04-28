import { defineFunction } from "@aws-amplify/backend";

export const getTodos = defineFunction({
  environment: {
    TODO_TABLE_NAME: "Todo-5olcjfy4ynaexovoaqbqk7mzku-NONE", // Replace with actual values
  },
  permissions: [
    {
      actions: ["dynamodb:Scan"],
      resources: [
        `arn:aws:dynamodb:ap-southeast-1:542353478124:table/${process.env.TODO_TABLE_NAME}`,
      ],
    },
  ],
});
