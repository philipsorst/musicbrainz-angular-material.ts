import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from '../component/app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RestangularConfigFactory} from "../service/restangular.factory";
import {RestangularModule} from "ngx-restangular";
import {
    MdButtonModule,
    MdCardModule,
    MdFormFieldModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdProgressSpinnerModule,
    MdSidenavModule,
    MdTabsModule,
    MdToolbarModule
} from "@angular/material";
import {OverlayModule} from "@angular/cdk/overlay";
import {SearchComponent} from "../component/search.component";
import {FormsModule} from "@angular/forms";
import {ArtistDetailComponent} from "../component/artist-detail.component";

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        ArtistDetailComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        RestangularModule.forRoot(RestangularConfigFactory),
        AppRoutingModule,
        MdToolbarModule,
        MdSidenavModule,
        MdListModule,
        MdButtonModule,
        MdIconModule,
        MdTabsModule,
        MdCardModule,
        MdFormFieldModule,
        MdInputModule,
        MdProgressSpinnerModule,
        MdGridListModule,
        OverlayModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
