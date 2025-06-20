export interface Product {
  name: string;
  price: number;
  itemNum: number;
  imagePath: string;
  options: {
    AddBeefPrice: number;
    AddEggPrice: number;
  };
}

export interface CartItems {
  name: string;
  price: number;
  itemNum: number;
  addEgg: boolean;
  addBeef: boolean;
  addEggPrice?: number; // 卵追加の価格
  addBeefPrice?: number; // 肉追加の価格
}