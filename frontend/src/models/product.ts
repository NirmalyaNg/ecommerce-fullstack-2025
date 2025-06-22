export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  inStock: boolean;
  image: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    description?: string;
  };
  slug: string;
  createdAt: string;
  updatedAt: string;
};
