export type Product = {
  imagePath: string | null
  name: string
  price: number
  itemNum: number
}

export type CartItems = {
  name: string
  price: number
  itemNum: number
  addEgg:  Boolean
  addBeef: Boolean
}