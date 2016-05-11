import {Component} from "angular2/core";
import {registerElement} from 'nativescript-angular/element-registry';
var geolocation = require("nativescript-geolocation");
var mapsModule = require("nativescript-google-maps-sdk");
import {SIDEDRAWER_DIRECTIVES} from "nativescript-telerik-ui/sidedrawer";
import {Color} from "color";

registerElement("MapView", () => mapsModule.MapView);

@Component({
    selector: "map",
    directives: [SIDEDRAWER_DIRECTIVES],
    templateUrl: "pages/map/map.html",
})
export class MapComponent {
    mapView:any = null;
    watchId:number = null;
    polyline:any;
    
    constructor() {
    }
    
    enableLocation() {
        if (!geolocation.isEnabled()) {
            console.log('Location not enabled, requesting.');
            geolocation.enableLocationRequest();
        }
    }

    getLocation() {
        if (geolocation.isEnabled()) {
            return geolocation.getCurrentLocation({
                desiredAccuracy: 10,
                updateDistance: 10,
                minimumUpdateTime: 1000,
                maximumAge: 10000
            })
        }
        return Promise.reject("Geolocation not enabled.");
    }

    //Map events
    onMapReady = (event) => {
        console.log("Map Ready");
        if (this.mapView || !event.object) return;
        
        this.mapView = event.object;
        this.mapView.myLocationEnabled(true);
        this.mapView.myLocationButtonEnabled(true);
        this.mapView.zoomControlsEnabled(true);
        this.mapView.mapType(MapType.Terrain);

        this.mapView.animateCameraChange = true;
        this.mapView.markerSelect = this.onMarkerSelect;
        this.mapView.cameraChanged = this.onCameraChanged;

        this.enableLocation();
        var location = this.getLocation().then(this.firstLocationReceived, this.error);
    }
    
    error(err) {
        console.log("Error: " + JSON.stringify(err));
    }

    onMarkerSelect(event) {
        console.log("Clicked on " + event.marker.title);
    }

    onCameraChanged(event) {
        console.log("Camera changed: " + JSON.stringify(event.camera));
    }
    
    firstLocationReceived = (location) => {
        this.mapView.latitude = location.latitude;
        this.mapView.longitude = location.longitude;
        this.mapView.zoom = 16;
        
        var marker = new mapsModule.Marker();
        marker.position = mapsModule.Position.positionFromLatLng(location.latitude, location.longitude);
        marker.title = "My Location";
        marker.snippet = "My Location";
        this.mapView.addMarker(marker);
        
        this.polyline = new mapsModule.Polyline();
        this.polyline.addPoint(mapsModule.Position.positionFromLatLng(location.latitude, location.longitude));
        this.polyline.visible = true;
        this.polyline.width = 10;
        this.polyline.color = new Color('Red');
        this.polyline.geodesic = true;
        this.mapView.addPolyline(this.polyline);
        
        this.watchId = geolocation.watchLocation(this.locationReceived, this.error, {desiredAccuracy: 10, updateDistance: 10, minimumUpdateTime: 1000, maximumAge: 10000});
    }
    
    locationReceived = (location) => {
        this.polyline.addPoint(mapsModule.Position.positionFromLatLng(location.latitude, location.longitude));
    }
    
    clearLine = () => {
        this.polyline.removeAllPoints();
    }
}

const enum MapType {
    None,
    Normal,
    Satellite,
    Terrain,
    Hybrid
} 