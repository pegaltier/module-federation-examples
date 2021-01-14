import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { pluck } from "rxjs/operators";
import { Product, ProductService } from "./product.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  products: Observable<Product[]> = this.pruductService
    .getProducts()
    .pipe(pluck("data"));

  constructor(private pruductService: ProductService) {}

  ngOnInit(): void {}
}
