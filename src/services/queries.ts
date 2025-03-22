import { gql } from "@apollo/client";

export const GET_IMAGES = gql`
  query GetImages($after: String, $first: Int = 10) {
    images(after: $after, first: $first) {
      edges {
        node {
          id
          title
          price
          picture
          liked
          likesCount
          author
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
