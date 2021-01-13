import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductRoutingModule } from "./product-routing.module";
import { ProductComponent } from "./product.component";
import { ProductService } from "./product.service";

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, ProductRoutingModule],
  providers: [ProductService],
})
export class ProductModule {}
