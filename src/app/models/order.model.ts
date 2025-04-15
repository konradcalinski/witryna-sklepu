export interface Order {
  id?: number;
  accepted: boolean;
  products: {
    productId: number;
    quantity: number;
    name?: string;
    cena?: number;
  }[];
}
