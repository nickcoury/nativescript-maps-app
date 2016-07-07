import {Component} from "@angular/core";
import {RouterConfig} from "@angular/router";
import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";
var application = require("application");

if(application.ios) {
  //GMSServices.provideAPIKey("iOS API Key Here");
}


@Component({
    selector: "app-main",
    directives: [NS_ROUTER_DIRECTIVES],
    template: "<page-router-outlet></page-router-outlet>",
})
export class AppComponent {
}