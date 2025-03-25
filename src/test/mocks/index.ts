import { LIKE_IMAGE } from "../../services/mutations";
import { GET_IMAGES } from "../../services/queries";
import { ImagesResponseType } from "../../types";

const mockResponse: ImagesResponseType = {
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
    ],
    pageInfo: {
      endCursor: "2",
      hasNextPage: true,
      hasPreviousPage: false,
      startCursor: "1",
    },
  },
};

const likeImageMock = {
  request: {
    query: LIKE_IMAGE,
    variables: {
      input: {
        imageId: "1",
        clientMutationId: expect.any(String), // nanoid() generates a random string
      },
    },
  },
  result: {
    data: {
      likeImage: {
        __typename: "LikeImagePayload",
        clientMutationId: "random-id",
        image: {
          __typename: "Image",
          id: "1",
          liked: true,
          likesCount: 11, // Incremented like count
        },
      },
    },
  },
};

export const mocks = [
  {
    request: {
      query: GET_IMAGES,
      variables: { first: 10, title: "" }, // Default case
    },
    result: {
      data: mockResponse,
    },
  },
  likeImageMock,
];
