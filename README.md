# nativescript-maps-app
Simple Nativescript + Angular 2 + Typescript App

This project demonstrates how to use Nativescript with Angular 2 and Typescript, along with the Google Maps API natively.

<img src="screenshot1.png" width="250px">
<img src="screenshot2.png" width="250px">

## Quick Start
Pull down the project.

Register for a Google Maps API key in the [Google Developers Console](https://console.developers.google.com).

For Android, add the key to `app/App_Resources/Android/values/nativescript_google_maps_api.xml`.
For IOS, add the key to `app/app.component.ts`.

Run the appropriate command(s) from the terminal in the project folder
```
tns run ios
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

## Important Note

The Google Maps SDK has an issue currently (pull request pending to fix) that will break the Typescript compilation.  To fix it, do the following:

In the `node_modules/nativescript-google-maps-sdk` folder, change:

`map-view.d.ts` - Remove `;` on lines 125 and 136.
`package.json` - Add `"typings": "map-view.d.ts"` at line 6.


Special thanks to [dapriett](https://github.com/dapriett) and [Telerik](http://nativescript.org/)