// import type { Handler } from "aws-lambda";

// export const handler: Handler = async (event, context) => {
//   // your function code goes here
//   return "Hello, World!";
// };

import type { Schema } from "../../data/resource";

export const handler: Schema["sayHello"]["functionHandler"] = async (event) => {
  // arguments typed from `.arguments()`
  const { name } = event.arguments;
  console.log(`name, ${name}!`);

  // return typed from `.returns()`
  return `Hello, ${name}!`;
};
