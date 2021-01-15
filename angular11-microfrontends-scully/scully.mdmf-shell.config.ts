import { httpGetJson, ScullyConfig } from "@scullyio/scully";

const mainPages = Promise.resolve(["/home", "/profile", "/product"]);

const productPages = httpGetJson(
  "https://fakestoreapi.com/products"
).then((products: any[]) => products.map((p) => "/product/detail/" + p.id));

const extraRoutesPromise = Promise.all([
  mainPages,
  productPages,
]).then((responses) => [].concat.apply([], responses));

export const config: Promise<ScullyConfig> = (async () => {
  return {
    projectRoot: "./projects/mdmf-shell/src",
    projectName: "mdmf-shell",
    outDir: "./dist/static",
    appPort: 4200,
    // the extraRoutes config traverse routes from external source (MF)
    extraRoutes: extraRoutesPromise,
    routes: {
      // the routes config we traverse the local source only (NO MF)
      // https://github.com/scullyio/scully/issues/1203
      /*
      "/product/detail/:productId": {
        type: "json",
        productId: {
          url: "https://fakestoreapi.com/products",
          // url: "http://localhost:4202/assets/json/products.json",
          // resultsHandler: (response) => response.data,
          property: "id",
        },
      },
      */
    },
  } as ScullyConfig;
})();
