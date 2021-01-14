import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { map, pluck, take, tap } from "rxjs/operators";
import { Product, ProductService } from "../product.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  public readonly product$: Observable<Product> = forkJoin([
    this.activatedRoute.params.pipe(pluck("id"), take(1)),
    this.productService.getProducts().pipe(pluck("data")),
  ]).pipe(
    tap(([id, products]) => {
      console.log(
        "🚀 ~ file: product-detail.component.ts ~ line 19 ~ ProductDetailComponent ~ tap ~ ([id, products]",
        id,
        products
      );
    }),
    map(([id, products]) => {
      return products.find((p) => p.id === +id);
    })
  );

  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}
}
