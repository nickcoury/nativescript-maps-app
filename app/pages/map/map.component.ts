import {Component} from "angular2/core";
import {registerElement} from 'nativescript-angular/element-registry';
var geolocation = require("nativescript-geolocation");
var mapsModule = require("nativescript-google-maps-sdk");
import {SIDEDRAWER_DIRECTIVES} from "nativescript-telerik-ui/sidedrawer";

registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
    selector: "map",
    directives: [SIDEDRAWER_DIRECTIVES],
    templateUrl: "pages/map/map.html",
})
export class MapComponent {
    public message:string = "Let's Map!";
    public latitude:number = 33.5;
    public longitude:number = -111.9;
    public zoom:number = 10;
    public bearing:number = 0;
    public tilt:number = 0;

    constructor() {
        var _this = this;
        this.enableLocation();
        this.getLocation().then(function (location) {
            console.log(JSON.stringify(location));
            _this.latitude = location.latitude;
            _this.longitude = location.longitude;
            _this.message = "Lat: " + location.latitude + ", Lng: " + location.longitude;
        });
    }

    enableLocation() {
        if (!geolocation.isEnabled()) {
            console.log('Location not enabled, requesting.');
            geolocation.enableLocationRequest();
        }
    }

    getLocation() {
        console.log('Getting location...');
        return geolocation.getCurrentLocation({
            desiredAccuracy: 3,
            updateDistance: 10,
            maximumAge: 30000,
            timeout: 30000
        })
    }

    //Map events
    OnMapReady(args) {
        var map = args.object;

        console.log("Setting a marker...");
        var marker = new mapsModule.Marker();
        marker.position = mapsModule.Position.positionFromLatLng(33.4484, -112.0740);
        marker.title = "Phoenix";
        marker.snippet = "Arizona";
        marker.userData = {index: 1};
        map.addMarker(marker);
    }

    onMarkerSelect(args) {
        console.log("Clicked on " + args.marker.title);
    }

    onCameraChanged(args) {
        console.log("Camera changed: " + JSON.stringify(args.camera));
    }
}