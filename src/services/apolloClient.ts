import { ApolloClient, InMemoryCache } from "@apollo/client";

export const inMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        images: {
          keyArgs: false, // Treat all pages as a single list
          merge(existing = {}, incoming, { args }) {
            // If it's a new search (title changed), reset the list
            if (!existing || existing.title !== args?.title) {
              return { ...incoming, title: args?.title };
            }

            // Otherwise, append results for pagination
            return {
              ...incoming,
              title: args?.title,
              edges: [...(existing.edges || []), ...incoming.edges], // Append new pages
            };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "https://sandbox-api-test.samyroad.com/graphql",
  cache: inMemoryCache,
});

export default client;
