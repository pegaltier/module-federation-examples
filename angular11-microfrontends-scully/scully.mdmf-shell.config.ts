import { ScullyConfig } from "@scullyio/scully";
export const config: Promise<ScullyConfig> = (async () => {
  return {
    projectRoot: "./projects/mdmf-shell/src",
    projectName: "mdmf-shell",
    outDir: "./dist/static",
    appPort: 4200,
    extraRoutes: [
      "/home",
      "/profile",
      "/product",
      "/product/detail/1",
      "/product/detail/2",
      "/product/detail/3",
      "/product/detail/4",
      "/product/detail/5",
      "/product/detail/6",
      "/product/detail/7",
    ],
    routes: {
      "/product/detail/:productId": {
        type: "json",
        productId: {
          url: "https://fakestoreapi.com/products",
          // url: "http://localhost:4202/assets/json/products.json",
          // resultsHandler: (response) => response.data,
          property: "id",
        },
      },
    },
  } as ScullyConfig;
})();
