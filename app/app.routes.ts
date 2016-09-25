import { Routes } from "@angular/router";
import { MapComponent } from "./pages/map/map.component";

export const APP_ROUTES: Routes = [
    { path: "", redirectTo: "map", pathMatch: 'full' },
    { path: "map", component: MapComponent, pathMatch: 'full' },
];
