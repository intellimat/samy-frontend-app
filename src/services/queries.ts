import { gql } from "@apollo/client";

export const GET_IMAGES = gql`
  query GetImages {
    images {
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
    }
  }
`;
