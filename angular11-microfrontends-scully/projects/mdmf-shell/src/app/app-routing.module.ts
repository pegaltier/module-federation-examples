import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./shell/components/home/home.component";
import { loadRemoteModule } from "./utils/federation-utils";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  {
    path: "profile",
    loadChildren: () =>
      loadRemoteModule({
        remoteName: "profile",
        remoteEntry: "http://localhost:4201/remoteEntry.js",
        exposedModule: "ProfileModule",
      }).then((m) => m.ProfileModule),
  },
  {
    path: "product",
    loadChildren: () =>
      loadRemoteModule({
        remoteName: "profile",
        remoteEntry: "http://localhost:4202/remoteEntry.js",
        exposedModule: "ProductModule",
      }).then((m) => m.ProductModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
