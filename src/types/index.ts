export interface ImageData {
  id: string;
  title: string;
  price: number;
  picture: string;
  liked: boolean;
  likesCount: number;
  author: string;
}

export interface ImagesResponseType {
  images: {
    edges: { node: ImageData }[];
  };
}
