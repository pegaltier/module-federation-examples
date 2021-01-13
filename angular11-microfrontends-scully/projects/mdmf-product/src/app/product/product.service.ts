import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

export interface Product {
  Name: string;
  Price: number;
  Location: string;
}

@Injectable()
export class ProductService {
  constructor() {}

  getProducts(): Observable<Product[]> {
    return of([
      { Name: "Cheese", Price: 2.5, Location: "Refrigerated foods" },
      { Name: "Crisps", Price: 3, Location: "the Snack isle" },
      { Name: "Pizza", Price: 4, Location: "Refrigerated foods" },
      { Name: "Chocolate", Price: 1.5, Location: "the Snack isle" },
      { Name: "Self-raising flour", Price: 1.5, Location: "Home baking" },
      { Name: "Ground almonds", Price: 3, Location: "Home baking" },
    ]).pipe(delay(200));
  }
}
