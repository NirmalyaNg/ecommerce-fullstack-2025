export type OrderItem = {
  product: string; // product ID
  title: string;
  image: string;
  price: number;
  quantity: number;
};

export type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
  email?: string;
};

export type Order = {
  _id: string;
  user:
    | {
        _id: string;
        name?: string;
        email?: string;
      }
    | string; // In some cases, you may just receive a userId string
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
};
