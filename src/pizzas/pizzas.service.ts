import { Injectable, NotFoundException } from '@nestjs/common';
import { Pizza } from './interfaces/pizza.interface';

const ingredients = [
  { id: 1, name: 'Pepperoni' },
  { id: 2, name: 'Bell Peppers' },
  { id: 3, name: 'Mozzarella' },
  { id: 4, name: 'Cheddar' },
  { id: 5, name: 'Blue Cheese' },
  { id: 6, name: 'Tuna' },
  { id: 7, name: 'Tomato Sauce' },
  { id: 8, name: 'BBQ Sauce' },
  { id: 9, name: 'Chicken' },
  { id: 10, name: 'Bacon' },
  { id: 11, name: 'Pineapples' },
  { id: 12, name: 'Ham' },
  { id: 13, name: 'Mushrooms' },
  { id: 14, name: 'Red Onions' },
  { id: 15, name: 'Ranch Sauce' },
  { id: 16, name: 'Beef' },
  { id: 17, name: 'Tomatoes' },
  { id: 18, name: 'Parmesan' },
  { id: 19, name: 'Garlic' },
  { id: 20, name: 'Pickled Cucumber' },
];

function getRandom(n) {
  let len = ingredients.length;
  const result = new Array(n);
  const taken = new Array(len);

  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = ingredients[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

@Injectable()
export class PizzasService {
  data: Pizza[] = [
    { id: 1, name: 'Pepperoni', price: 16.5 },
    { id: 2, name: 'Meat Feast', price: 19.75 },
    { id: 3, name: 'Veggie Pepperoni', price: 25.25 },
    { id: 4, name: 'Hawaiian', price: 18.0 },
    { id: 5, name: 'Supreme', price: 16.0 },
    { id: 6, name: 'Chicken Supreme', price: 15.0 },
    { id: 7, name: 'BBQ', price: 19.25 },
    { id: 8, name: 'Margherita', price: 19.0 },
    { id: 9, name: 'Cheesy Cheddar', price: 14.5 },
    { id: 10, name: 'Caesar', price: 18.0 },
    { id: 11, name: 'Blue Cheese', price: 25.0 },
    { id: 12, name: 'Ham & Mushrooms', price: 17.75 },
    { id: 13, name: 'Cheeseburger', price: 21.25 },
    { id: 14, name: 'Carbonara', price: 20.5 },
    { id: 15, name: 'Chicken Ranch', price: 16.0 },
    { id: 16, name: 'Tuna', price: 18.0 },
  ];

  findAll(query) {
    const { start = 0, limit = this.data.length, search } = query;
    const filtered = search
      ? this.data.filter(({ name }) =>
          name.toLowerCase().includes(search.toLowerCase()),
        )
      : this.data;

    return {
      results: filtered.slice(start, start + limit).map((pizza) => ({
        id: pizza.id,
        name: pizza.name,
        price: pizza.price,
      })),
      total: filtered.length,
    };
  }

  findOne(id: number) {
    const pizza = this.data.find((pizza) => pizza.id === id);
    if (!pizza) {
      return new NotFoundException();
    }

    return { pizza, ingredients: getRandom(5) };
  }
}
