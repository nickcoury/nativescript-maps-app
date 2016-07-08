# nativescript-maps-app
Simple Nativescript + Angular 2 + Typescript App

This project demonstrates how to use Nativescript with Angular 2 and Typescript, along with the Google Maps API natively.

## Quick Start
Pull down the project.

Register for a Google Maps API key in the [Google Developers Console](https://console.developers.google.com).

For Android, add the key to `app/App_Resources/Android/values/nativescript_google_maps_api.xml`.
For IOS, add the key to `app/app.component.ts`.

Run from the terminal in the project folder
```
npm install
```

Then run the appropriate command for your platform
```
tns platform add ios
tns run android
```
```
tns run android
```

## Features
1. Google Maps natively integrated.
2. Geolocation draws your path on the map as you travel.
3. Draw a route by touching points on the map.
4. Includes Telerik-UI side drawer.
5. Nativescript + Angular2 + Typescript

### Notes
- I have only compiled this on Android so far.


Special thanks to  [dapriett](https://github.com/dapriett) and  [Telerik](http://nativescript.org/)