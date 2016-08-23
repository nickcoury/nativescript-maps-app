import {Component} from "@angular/core";
import {RouterConfig} from "@angular/router";
import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";
var application = require("application");

var GMSServices: any;
if(application.ios) {
  GMSServices.provideAPIKey("AIzaSyCCbRydI84FEFapTzFo5qtGCv5i6NGuQgE");
}

@Component({
    moduleId: module.id,
    selector: "app-main",
    directives: [NS_ROUTER_DIRECTIVES],
    template: "<page-router-outlet></page-router-outlet>",
})
export class AppComponent {
}