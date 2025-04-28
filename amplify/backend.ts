import { defineBackend } from "@aws-amplify/backend";
import { aws_iam as iam } from "aws-cdk-lib";
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
});

// Grant specific table access from data API
backend.getTodos.resources.lambda.addToRolePolicy(
  new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: ["dynamodb:Scan"],
    resources: [
      "arn:aws:dynamodb:ap-southeast-1:542353478124:table/Todo-5olcjfy4ynaexovoaqbqk7mzku-NONE",
    ],
  })
);
