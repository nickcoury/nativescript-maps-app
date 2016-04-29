"use strict";
var core_1 = require("angular2/core");
var element_registry_1 = require('nativescript-angular/element-registry');
var geolocation = require("nativescript-geolocation");
var mapsModule = require("nativescript-google-maps-sdk");
var sidedrawer_1 = require("nativescript-telerik-ui/sidedrawer");
element_registry_1.registerElement("MapView", function () { return require("nativescript-google-maps-sdk").MapView; });
var MapComponent = (function () {
    function MapComponent() {
        this.message = "Let's Map!";
        this.latitude = 33.5;
        this.longitude = -111.9;
        this.zoom = 10;
        this.bearing = 0;
        this.tilt = 0;
        var _this = this;
        this.enableLocation();
        this.getLocation().then(function (location) {
            console.log(JSON.stringify(location));
            _this.latitude = location.latitude;
            _this.longitude = location.longitude;
            _this.message = "Lat: " + location.latitude + ", Lng: " + location.longitude;
        });
    }
    MapComponent.prototype.enableLocation = function () {
        if (!geolocation.isEnabled()) {
            console.log('Location not enabled, requesting.');
            geolocation.enableLocationRequest();
        }
    };
    MapComponent.prototype.getLocation = function () {
        console.log('Getting location...');
        return geolocation.getCurrentLocation({
            desiredAccuracy: 3,
            updateDistance: 10,
            maximumAge: 30000,
            timeout: 30000
        });
    };
    //Map events
    MapComponent.prototype.OnMapReady = function (args) {
        var map = args.object;
        console.log("Setting a marker...");
        var marker = new mapsModule.Marker();
        marker.position = mapsModule.Position.positionFromLatLng(33.4484, -112.0740);
        marker.title = "Phoenix";
        marker.snippet = "Arizona";
        marker.userData = { index: 1 };
        map.addMarker(marker);
    };
    MapComponent.prototype.onMarkerSelect = function (args) {
        console.log("Clicked on " + args.marker.title);
    };
    MapComponent.prototype.onCameraChanged = function (args) {
        console.log("Camera changed: " + JSON.stringify(args.camera));
    };
    MapComponent = __decorate([
        core_1.Component({
            selector: "map",
            directives: [sidedrawer_1.SIDEDRAWER_DIRECTIVES],
            templateUrl: "pages/map/map.html",
        }), 
        __metadata('design:paramtypes', [])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map