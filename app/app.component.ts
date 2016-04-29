import {Component} from "angular2/core";
import {RouteConfig} from "angular2/router";
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from "nativescript-angular/router";
import {MapComponent} from "./pages/map/map.component";
var application = require("application");

if(application.ios) {
  //GMSServices.provideAPIKey("iOS API Key Here");
}


@Component({
    selector: "app-main",
    directives: [NS_ROUTER_DIRECTIVES],
    providers: [NS_ROUTER_PROVIDERS],
    template: "<page-router-outlet ></page-router-outlet>",
})
@RouteConfig([
    { path: "/map", component: MapComponent, as: "Map", useAsDefault: true },
])
export class AppComponent {
}