import { gql } from "@apollo/client";

export const GET_IMAGES = gql`
  query GetImages($after: String, $first: Int = 10, $title: String) {
    images(after: $after, first: $first, title: $title) {
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
