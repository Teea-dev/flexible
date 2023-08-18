import { GraphQLClient } from "graphql-request";
import { createUserMutation, getUserQuery } from "../graphql";

const makeGraphQLRequest = async (query: string, variables = {}) => {
  const isProduction = process.env.NODE_ENV === "production";
  const apiUrl = isProduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
    : "http://127.0.0.1:4000/graphql";

  const apiKey = isProduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
    : "secret";

  const client = new GraphQLClient(apiUrl);

  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

export const getUser = (email: string) => {
  const isProduction = process.env.NODE_ENV === "production";
  const apiKey = isProduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
    : "secret";
    const apiUrl = isProduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
    : "http://127.0.0.1:4000/graphql";

  const client = new GraphQLClient(apiUrl); // apiUrl should also be defined here

  client.setHeaders({'x-api-key': apiKey });
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  const isProduction = process.env.NODE_ENV === "production";
  const apiKey = isProduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
    : "secret";
    const apiUrl = isProduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
    : "http://127.0.0.1:4000/graphql";

  const client = new GraphQLClient(apiUrl); // apiUrl should also be defined here

  client.setHeaders({'x-api-key': apiKey });

  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };
  return makeGraphQLRequest(createUserMutation, variables);
};







// import { GraphQLClient } from "graphql-request";
// import { createUserMutation, getUserQuery } from "../graphql";

// const makeGraphQLRequest = async (query: string, variables = {}) => {
//   const isProduction = process.env.NODE_ENV === "production";
//   const apiUrl = isProduction
//     ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
//     : "http://127.0.0.1:4000/graphql";

//   const apiKey = isProduction
//     ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
//     : "secret";
//   const serverUrl = isProduction
//     ? process.env.NEXT_PUBLIC_GRAFBASE_SERVER_URL
//     : "http://localhost:3000";

//   const client = new GraphQLClient(apiUrl);

//   try {
//     return await client.request(query, variables);
//   } catch (error) {
//     throw error;
//   }
// };

// export const getUser = (email: string) => {
//   client.setHeaders('x-api-key', apiKey);
//     return makeGraphQLRequest(getUserQuery, { email });
// };

// export const createUser = (name: string, email: string, avatarUrl: string) => {
//   const variables = {
//     input: {
//       name,
//       email,
//       avatarUrl,
//     },
//   };
//   return makeGraphQLRequest(createUserMutation, variables);
// };

