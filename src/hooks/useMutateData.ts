import { useMutation } from "@apollo/client";
import { nanoid } from "nanoid";
import { LIKE_IMAGE } from "../services/mutations";
import { ImageData } from "../types";

export const useMutateData = () => {
  const [__likeImage] = useMutation(LIKE_IMAGE, {
    update(cache, { data }) {
      if (!data?.likeImage) return;

      const likedImage = data.likeImage.image;

      cache.modify({
        fields: {
          images(existingImages = {}) {
            return {
              ...existingImages,
              edges: existingImages.edges.map((edge: { node: ImageData }) =>
                edge.node.id === likedImage.id
                  ? {
                      ...edge,
                      node: {
                        ...edge.node,
                        liked: likedImage.liked,
                        likesCount: likedImage.likesCount,
                      },
                    }
                  : edge
              ),
            };
          },
        },
      });
    },
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
