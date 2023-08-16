import { GraphQLClient } from "graphql-request";

const makeGraphQLRequest = async (query: string, variables = {}) => {
  const isProduction = process.env.NODE_ENV === "production";
  const apiUrl = isProduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
    : "http://localhost:3000/graphql";
  const apiKey = isProduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
    : "secret";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_SERVER_URL
    : "http://localhost:3000";
  const client = new GraphQLClient(apiUrl);

  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

export const getUser = async (email: string) => {
    // return await makeGraphQLRequest()
}
