export interface Category {
  category: string;
  parentCategory: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryAncestors: string[];
  price: number;
  salePercent: number;
  imageUrl: string | null;
  sizes: ProductSize[];
  colors: string[];
  stock: number;
  featured: boolean;
}
type ProductSize = "XS" | "S" | "M" | "L" | "XL";
