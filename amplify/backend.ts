import { defineBackend } from "@aws-amplify/backend";
import "@dotenvx/dotenvx/config";
import { aws_iam as iam } from "aws-cdk-lib";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { getTodos } from "./functions/getTodos/resource";
import { sayHello } from "./functions/say-hello/resource";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */

const dbArn = process.env.TODO_TABLE_ARN;

if (!dbArn) {
  throw new Error("TODO_TABLE_ARN environment variable is not set!");
}

export const backend = defineBackend({
  auth,
  data,
  sayHello,
  getTodos,
});

// Grant specific table access from data API
backend.getTodos.resources.lambda.addToRolePolicy(
  new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: ["dynamodb:Scan"],
    resources: [dbArn],
  })
);
