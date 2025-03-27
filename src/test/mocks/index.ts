import { LIKE_IMAGE } from "../../services/mutations";
import { GET_IMAGES } from "../../services/queries";
import { ImagesResponseType } from "../../types";

const getImaagesMock = {
  request: {
    query: GET_IMAGES,
    variables: { first: 10, title: "" }, // Default case
  },
  result: {
    data: {
      images: {
        edges: [
          {
            node: {
              id: "1",
              title: "Sample Image",
              price: 100,
              picture: "https://example.com/image.jpg",
              liked: false,
              likesCount: 10,
              author: "John Doe",
            },
          },
          {
            node: {
              id: "2",
              title: "Sample Image 2",
              price: 100,
              picture: "https://example.com/image.jpg",
              liked: false,
              likesCount: 0,
              author: "Lob Bed",
            },
          },
        ],
        pageInfo: {
          endCursor: "2",
          hasNextPage: true,
          hasPreviousPage: false,
          startCursor: "1",
        },
      },
    } as ImagesResponseType,
  },
};

const likeImageMock = {
  request: {
    query: LIKE_IMAGE,
    variables: {
      input: {
        imageId: "1",
        clientMutationId: "mockedId",
      },
    },
  },
  result: {
    data: {
      likeImage: {
        clientMutationId: "mockedId",
        image: {
          id: "1",
          liked: true,
          likesCount: 11, // Incremented like count
        },
      },
    },
  },
};

export const mocks = [getImaagesMock, likeImageMock];
