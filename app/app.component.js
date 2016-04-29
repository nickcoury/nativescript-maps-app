"use strict";
var core_1 = require("angular2/core");
var router_1 = require("angular2/router");
var router_2 = require("nativescript-angular/router");
var map_component_1 = require("./pages/map/map.component");
var application = require("application");
if (application.ios) {
}
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "app-main",
            directives: [router_2.NS_ROUTER_DIRECTIVES],
            providers: [router_2.NS_ROUTER_PROVIDERS],
            template: "<page-router-outlet ></page-router-outlet>",
        }),
        router_1.RouteConfig([
            { path: "/map", component: map_component_1.MapComponent, as: "Map", useAsDefault: true },
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map