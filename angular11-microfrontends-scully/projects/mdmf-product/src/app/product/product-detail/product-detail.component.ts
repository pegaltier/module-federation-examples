import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { forkJoin, Observable, of } from "rxjs";
import { isScullyGenerated, TransferStateService } from "@scullyio/ng-lib";
import {
  catchError,
  filter,
  map,
  pluck,
  shareReplay,
  switchMap,
  take,
  tap,
} from "rxjs/operators";
import { Product, ProductService } from "../product.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  //
  public readonly productId$: Observable<
    number
  > = this.activatedRoute.params.pipe(
    tap((val) => {
      console.log(
        "🚀 ~ file: product-detail.component.ts ~ line 26 ~ ProductDetailComponent ~ val",
        val
      );
    }),
    pluck("productId"),
    filter((val) => ![undefined, null].includes(val)),
    map((val) => parseInt(val, 10)),
    tap((val) => {
      console.log(
        "🚀 ~ file: product-detail.component.ts ~ line 29 ~ ProductDetailComponent ~ val",
        val
      );
    }),
    shareReplay(1)
  );

  public readonly apiProduct$ = this.productId$.pipe(
    switchMap((id) =>
      this.productService.getProducts().pipe(
        pluck("data"),
        map((products) => {
          const product = products.find((p) => p.id === +id);
          console.log(
            "🚀 ~ file: product-detail.component.ts ~ line 36 ~ ProductDetailComponent ~ product",
            product
          );
          return product;
        }),
        catchError(() => {
          console.log(
            "🚀 ~ file: product-detail.component.ts ~ line 59 ~ ProductDetailComponent ~ catchError"
          );
          return of({
            id: id,
            title: "not found",
          } as Product);
        })
      )
    ),
    shareReplay(1)
  );

  // This is an example of using TransferState for the product
  public readonly product$ = isScullyGenerated()
    ? this.transferState
        .getState<Product>("product")
        .pipe(tap((product) => console.log("Getting TSS product", product)))
    : this.apiProduct$.pipe(
        tap((product) => {
          console.log("Setting TSS product", product);
          this.transferState.setState("product", product);
        })
      );

  // this is the simple solution to get the product without using TransferState
  /*
  public readonly product2$: Observable<Product> = forkJoin([
    this.activatedRoute.params.pipe(pluck("productId"), take(1)),
    this.productService.getProducts().pipe(pluck("data")),
  ]).pipe(
    map(([id, products]) => {
      return products.find((p) => p.id === +id);
    })
  );*/

  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly transferState: TransferStateService
  ) {}

  ngOnInit() {}

  addToCart(product: Product): void {
    console.log(
      "🚀 ~ file: product-detail.component.ts ~ line 87 ~ ProductDetailComponent ~ addToCart ~ product",
      product
    );
  }
}
