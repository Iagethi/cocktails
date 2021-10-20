import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cocktail } from '../models/cocktail.model';
import { Ingredient } from '../models/ingredient.model';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
@Injectable()
export class CocktailService {
  public cocktails: BehaviorSubject<Cocktail[]> = new BehaviorSubject(null);

  iniCocktails(): void{
    this.http.get<Cocktail[]>('https://cocktails-57f60.firebaseio.com/cocktails.json').subscribe( (cocktails: Cocktail[]) => { this.cocktails.next(cocktails);
   })
  }

  getCocktail(index: number): Observable<Cocktail>{
    return this.cocktails.pipe(
      filter((cocktails: Cocktail[]) => cocktails != null ),
      map((cocktails: Cocktail[]) =>  cocktails[index])
    );
  }

  constructor(private http: HttpClient) {
    // this.http.put('https://cocktails-57f60.firebaseio.com/cocktails.json', this.cocktails.value)
    // .subscribe( res => console.log(res));
    this.iniCocktails();
   }

  addCocktail(cocktail: Cocktail): void {
    const cocktails = this.cocktails.value.slice();
    cocktails.push(new Cocktail(cocktail.name, cocktail.img, cocktail.desc, cocktail.ingredients.map( ingredient => new Ingredient(ingredient.name, ingredient.quantity))))
    this.cocktails.next(cocktails);
  }

  editCocktail(editCocktail: Cocktail): void {
    const cocktails = this.cocktails.value.slice();
    const index = cocktails.map( c => c.name ).indexOf(editCocktail.name);
    cocktails[index] = editCocktail;
    this.cocktails.next(cocktails);
    this.save();
  }

  save(): void {
    this.http.put('https://cocktails-57f60.firebaseio.com/cocktails.json/cocktails.json', this.cocktails.value).subscribe();
  }
}
