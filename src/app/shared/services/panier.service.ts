import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable()
export class PanierService {
  public panier: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>(null);

  addIngredients(ingredients: Ingredient[]): void{
    const currentValue = this.panier.value;
    if (currentValue && currentValue.length) {
      this.panier.next(currentValue.concat(ingredients))
    } else {
      this.panier.next(ingredients);
    }
  }

  constructor() { }
}
