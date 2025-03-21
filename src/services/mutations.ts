import { gql } from "@apollo/client";

export const LIKE_IMAGE = gql`
  mutation LikeImage($input: LikeImageInput!) {
    likeImage(input: $input) {
      clientMutationId
      image {
        id
        liked
        likesCount
      }
    }
  }
`;
