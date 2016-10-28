import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {registerElement} from 'nativescript-angular/element-registry';
let geolocation = require('nativescript-geolocation');
import {MapView, Marker, Polyline, Position} from 'nativescript-google-maps-sdk';
import sideDrawerModule = require('nativescript-telerik-ui/sidedrawer');
import {RadSideDrawerComponent, SideDrawerType} from 'nativescript-telerik-ui/sidedrawer/angular';
var style = require('./map-style.json');

import {Color} from 'color';

console.log('Registering MapView');
registerElement('MapView', () => MapView);

@Component({
    moduleId: module.id,
    selector: 'map',
    templateUrl: 'map.html',
    styleUrls: ['map.css'],
})
export class MapComponent implements AfterViewInit {
    mapView:any = null;
    watchId:number = null;
    gpsLine:Polyline;
    tapLine:Polyline;
    tapMarker:any;
    gpsMarker:any;
    centeredOnLocation:boolean = false;

    constructor() {
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: SideDrawerType;
    
    ngAfterViewInit() {
       this.drawer = this.drawerComponent.sideDrawer;
    }
    
    openDrawer(){
        this.drawer.showDrawer();
    }
    
    closeDrawer(){
        this.drawer.closeDrawer();
    }

    enableLocation() {
        if (!geolocation.isEnabled()) {
            console.log('Location not enabled, requesting.');
            return geolocation.enableLocationRequest();
        } else {
            return Promise.resolve(true);
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
        return Promise.reject('Geolocation not enabled.');
    }

    //Map events
    onMapReady(event) {
        console.log('Map Ready');
        if (this.mapView || !event.object) return;

        this.mapView = event.object;

        this.mapView.setStyle(style);

        this.mapView.markerSelect = this.onMarkerSelect;
        this.mapView.cameraChanged = this.onCameraChanged;

        this.enableLocation()
            .then(this.getLocation)
            .then(() => {
                this.watchId = geolocation.watchLocation(this.locationReceived, this.error, {
                    desiredAccuracy: 10,
                    updateDistance: 10,
                    minimumUpdateTime: 10000,
                    maximumAge: 60000
                });
            }, this.error);
    };

    mapTapped = (event) => {
        console.log('Map Tapped');

        this.tapLine = this.addPointToLine({
            color: new Color('Red'),
            line: this.tapLine,
            location: event.position,
            geodesic: true,
            width: 10
        });

        this.removeMarker(this.tapMarker);
        this.tapMarker = this.addMarker({
            location: event.position,
            title: 'Tap Location'
        });
    };
    
    locationReceived = (position:Position) => {
        console.log('GPS Update Received');

        if (this.mapView && position && !this.centeredOnLocation) {
            this.mapView.latitude = position.latitude;
            this.mapView.longitude = position.longitude;
            this.mapView.zoom = 16;
            this.centeredOnLocation = true;
        }

        this.gpsLine = this.addPointToLine({
            color: new Color('Green'),
            line: this.gpsLine,
            location: position,
            geodesic: true,
            width: 10
        });

        this.removeMarker(this.gpsMarker);
        this.gpsMarker = this.addMarker({
            location: position,
            title: 'GPS Location'
        });
    };

    addPointToLine(args:AddLineArgs) {
        if (!this.mapView || !args || !args.location) return;

        let line = args.line;

        if (!line) {
            line = new Polyline();
            line.visible = true;
            line.width = args.width || 10;
            line.color = args.color || new Color('Red');
            line.geodesic = args.geodesic != undefined ? args.geodesic : true;
            this.mapView.addPolyline(line);
        }
        line.addPoint(Position.positionFromLatLng(args.location.latitude, args.location.longitude));

        return line;
    }

    addMarker(args:AddMarkerArgs) {
        if (!this.mapView || !args || !args.location) return;

        let marker = new Marker();
        marker.position = Position.positionFromLatLng(args.location.latitude, args.location.longitude);
        marker.title = args.title;
        marker.snippet = args.title;
        this.mapView.addMarker(marker);

        return marker;
    };

    clearGpsLine() {
        this.removeLine(this.gpsLine);
        this.gpsLine = null;
        this.closeDrawer();
    };

    clearTapLine() {
        this.removeLine(this.tapLine);
        this.tapLine = null;
        this.removeMarker(this.tapMarker);
        this.tapMarker = null;
        this.closeDrawer();
    }

    removeLine(line:Polyline) {
        if (line) {
            line.removeAllPoints();
        }
    }

    removeMarker(marker:Marker) {
        if (this.mapView && marker) {
            this.mapView.removeMarker(marker);
        }
    }

    error(err) {
        console.log('Error: ' + JSON.stringify(err));
    }

    onMarkerSelect(event) {
        console.log('Clicked on ' + event.marker.title);
    }

    onCameraChanged(event) {
        console.log('Camera changed: ' + JSON.stringify(event.camera));
    }
}

export class AddLineArgs {
    public color:Color;
    public line:Polyline;
    public location:Position;
    public geodesic:boolean;
    public width:number;
}

export class AddMarkerArgs {
    public location:Position;
    public title:string;
}