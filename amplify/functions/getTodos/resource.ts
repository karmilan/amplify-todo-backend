import { defineFunction } from "@aws-amplify/backend";

export const getTodos = defineFunction({
  name: "getTodos",
  environment: {
    TODO_TABLE_NAME: "Todo-5olcjfy4ynaexovoaqbqk7mzku-NONE", // Replace with actual values
  },
});
