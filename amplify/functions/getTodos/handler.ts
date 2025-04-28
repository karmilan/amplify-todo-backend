import { env } from "$amplify/env/getTodos";
import { generateClient } from "aws-amplify/api";
import { DynamoDB } from "aws-sdk";
import type { Schema } from "../../data/resource";

type Todo = {
  content?: string | null;
  isDone?: boolean | null;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export const handler: Schema["getTodos"]["functionHandler"] = async (
  event: any,
  context: any
) => {
  // export const handler = async (event: any, context: any) => {
  const dynamoDb = new DynamoDB.DocumentClient();

  const client = generateClient<Schema>();
  const { data: todos, errors } = await client.models.Todo.list();
  console.log("kar>>>>");
  console.log("todos", todos);
  console.log("errors", errors);
  //   return todos;

  const params = {
    TableName: env.TODO_TABLE_NAME,
  };

  try {
    const data = await dynamoDb.scan(params).promise();

    // Map DynamoDB items to the expected schema
    const todos =
      data.Items?.map((item: any) => ({
        id: item.id, // Ensure these fields exist
        content: item.content || null, // Default to null if content is missing
        isDone: item.isDone || false, // Default to false if isDone is missing
        createdAt: item.createdAt, // Ensure this field exists
        updatedAt: item.updatedAt, // Ensure this field exists
      })) || [];

    return todos; // Return the transformed todos list

    // return data.Items; // Returns the list of todos
  } catch (error) {
    console.log("Kar__error");
    console.error("Error fetching todos:", error);
    throw new Error("Could not retrieve todos");
  }
};
