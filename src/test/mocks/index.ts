import { GET_IMAGES } from "../../services/queries";
import { ImagesResponseType } from "../../types";

export const mockResponse: ImagesResponseType = {
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
];
