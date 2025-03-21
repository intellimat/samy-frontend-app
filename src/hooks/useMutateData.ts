import { useMutation } from "@apollo/client";
import { nanoid } from "nanoid";
import { LIKE_IMAGE } from "../services/mutations";
import { GET_IMAGES } from "../services/queries";

export const useMutateData = () => {
  const [__likeImage] = useMutation(LIKE_IMAGE, {
    refetchQueries: [GET_IMAGES, "GetImages"],
  });

  const sendImageLikeRequest = (imageId: string) => {
    try {
      __likeImage({
        variables: {
          input: {
            imageId,
            clientMutationId: nanoid(),
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return {
    sendImageLikeRequest,
  };
};
