import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, pluck, switchMap } from "rxjs/operators";
import { Product, ProductService } from "../product.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  public readonly product$: Observable<
    Product
  > = this.activatedRoute.params.pipe(
    pluck("id"),
    switchMap((id: string) => {
      return this.productService.getProducts();
    }),
    map((productsResponse) => productsResponse.data),
    map((products) => {
      return products.find((p) => p.id === 1);
    })
  );

  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}
}
