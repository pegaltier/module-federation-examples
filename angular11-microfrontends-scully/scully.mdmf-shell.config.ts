import { ScullyConfig } from "@scullyio/scully";
export const config: ScullyConfig = {
  projectRoot: "./projects/mdmf-shell/src",
  projectName: "mdmf-shell",
  outDir: "./dist/static",
  appPort: 4200,
  extraRoutes: ["/profile", "/product"],
  routes: {
    "/product/detail/:id": {
      type: "json",
      productId: {
        url: "http://localhost:4202/assets/json/products.json",
        resultsHandler: (response) => response.data,
        property: "id",
      },
    },
  },
};
