export interface ProductInfo {
  imageUrl: string;
  name: string;
  price: number;
  salePercent: number;
  stock: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: ProductInfo;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
}

export interface MutationResponse {
  message: string;
  items: CartItem[];
}

export interface AddCartItemDto {
  productId: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export type AddCartItemInput = Omit<
  AddCartItemDto,
  "selectedColor" | "selectedSize"
> &
  Partial<Pick<AddCartItemDto, "selectedColor" | "selectedSize">>;

export interface UpdateQuantityDto {
  quantity: number;
}
