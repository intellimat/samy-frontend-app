import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://sandbox-api-test.samyroad.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          images: {
            keyArgs: false, // Treat all pages as a single list
            merge(existing = {}, incoming) {
              return {
                ...incoming,
                edges: [...(existing.edges || []), ...incoming.edges], // Append new data
              };
            },
          },
        },
      },
    },
  }),
});

export default client;
