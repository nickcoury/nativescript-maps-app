// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
var application = require("application");

// Angular
import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { APP_ROUTES } from "./app.routes"

// App Components
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";
import { AppComponent } from "./app.component";
import { MapComponent } from "./pages/map/map.component";

// iOS Google Maps API Key Setup
declare var GMSServices: any;
if(application.ios) {
    GMSServices.provideAPIKey("AIzaSyCCbRydI84FEFapTzFo5qtGCv5i6NGuQgE");
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        SIDEDRAWER_DIRECTIVES,
        AppComponent,
        MapComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(APP_ROUTES)
    ],
})
class AppComponentModule {}

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);
