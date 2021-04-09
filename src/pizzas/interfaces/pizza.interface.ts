export interface Ingredient {
  id: number;
  name: string;
}

export interface Pizza {
  id: number;
  name: string;
  price: number;
  ingredients?: Ingredient[];
}
