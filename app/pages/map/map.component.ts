import {Component, ViewChild} from "@angular/core";
import {registerElement} from 'nativescript-angular/element-registry';
var geolocation = require("nativescript-geolocation");
var mapsModule = require("nativescript-google-maps-sdk");
import {RadSideDrawer} from "nativescript-telerik-ui/sidedrawer";
import sideDrawerModule = require('nativescript-telerik-ui/sidedrawer');
import {RadSideDrawerComponent, SideDrawerType, MainTemplateDirective, DrawerTemplateDirective} from "nativescript-telerik-ui/sidedrawer/angular";


import {Color} from "color";

console.log("Registering MapView");
registerElement("MapView", () => mapsModule.MapView);

@Component({
    selector: "map",
    directives: [RadSideDrawerComponent, MainTemplateDirective, DrawerTemplateDirective],
    templateUrl: "pages/map/map.html",
  styleUrls: ["pages/map/map.css"],
})
export class MapComponent {
    mapView:any = null;
    watchId:number = null;
    gpsLine:any;
    tapLine:any;
    tapMarker:any;

    constructor() {

    }
    
    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: SideDrawerType;
    
    ngAfterViewInit() {
       this.drawer = this.drawerComponent.sideDrawer;
    }
    
    public openDrawer(){
        this.drawer.showDrawer();
    }
    
    public closeDrawer(){
        this.drawer.closeDrawer();
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
        // this.mapView.myLocationEnabled(true);
        // this.mapView.myLocationButtonEnabled(true);
        // this.mapView.zoomControlsEnabled(true);
        // this.mapView.mapType(MapType.Terrain);

        // this.mapView.animateCameraChange = true;
        this.mapView.markerSelect = this.onMarkerSelect;
        this.mapView.cameraChanged = this.onCameraChanged;

        this.enableLocation();
        var location = this.getLocation().then(this.firstLocationReceived, this.error);
    };

    mapTapped = (event) => {
        console.log("Map Tapped");

        if (this.tapLine == null) {
            this.tapMarker = new mapsModule.Marker();
            this.tapMarker.position = mapsModule.Position.positionFromLatLng(event.position.latitude, event.position.longitude);
            this.tapMarker.title = "Tap Marker";
            this.tapMarker.snippet = "Tap Marker";
            this.mapView.addMarker(this.tapMarker);        

            this.tapLine = new mapsModule.Polyline();
            this.tapLine.addPoint(mapsModule.Position.positionFromLatLng(event.position.latitude, event.position.longitude));
            this.tapLine.visible = true;
            this.tapLine.width = 10;
            this.tapLine.color = new Color('Red');
            this.tapLine.geodesic = true;
            this.mapView.addPolyline(this.tapLine);
        }
        else {
            this.tapLine.addPoint(mapsModule.Position.positionFromLatLng(event.position.latitude, event.position.longitude));
        }
    };
    
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
        
        this.gpsLine = new mapsModule.Polyline();
        this.gpsLine.addPoint(mapsModule.Position.positionFromLatLng(location.latitude, location.longitude));
        this.gpsLine.visible = true;
        this.gpsLine.width = 10;
        this.gpsLine.color = new Color('Green');
        this.gpsLine.geodesic = true;
        this.mapView.addPolyline(this.gpsLine);
        
        this.watchId = geolocation.watchLocation(this.locationReceived, this.error, {desiredAccuracy: 10, updateDistance: 10, minimumUpdateTime: 1000, maximumAge: 10000});
    };
    
    locationReceived = (location) => {
        this.gpsLine.addPoint(mapsModule.Position.positionFromLatLng(location.latitude, location.longitude));
    };
    
    clearGpsLine = () => {
        this.gpsLine.removeAllPoints();
        this.closeDrawer();
    }
    
    clearTapLine = () => {
        if (this.tapLine != null) {
            this.tapLine.removeAllPoints();
            this.tapLine = null;
        }
        if (this.tapMarker != null) {
            this.mapView.removeMarker(this.tapMarker);
            this.tapMarker = null;
        }
        this.closeDrawer();
    }
}

const enum MapType {
    None,
    Normal,
    Satellite,
    Terrain,
    Hybrid
} 