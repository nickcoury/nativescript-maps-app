import {RouterConfig} from "@angular/router";
import {nsProvideRouter} from "nativescript-angular/router"
import {MapComponent} from "./pages/map/map.component";

export const routes: RouterConfig = [
  { path: "map", component: MapComponent }
];

export const APP_ROUTER_PROVIDERS = [
  nsProvideRouter(routes, {})
];
