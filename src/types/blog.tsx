type Author = {
  id?: number;
  name: string;
  image: string;
  designation: string;
};

export type BlogType = {
  id?: number;
  title: string;
  paragraph: string;
  content: string;
  image: string;
  author: Author;
  tags: string[];
  publishDate: string;
};