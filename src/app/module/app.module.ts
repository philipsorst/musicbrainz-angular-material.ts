import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from '../component/app.component';
import {FlexLayoutModule} from "@angular/flex-layout";
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
import {ReleaseGroupCoverDirective} from "../directive/release-group-cover.directive";
import {FlexDatePipe} from "../pipe/flex-date.pipe";
import {HomeComponent} from "../component/home.component";
import {UserService} from "../service/user.service";
import {SecondaryTypePipe} from "../pipe/secondary-type.pipe";
import {MusicbrainzService} from "../service/musicbrainz.service";
import {ReleaseGroupDetailComponent} from "../component/release-group-detail.component";
import {ArtistCreditsComponent} from "../component/artist-credits.component";
import {ReleaseDetailComponent} from "../component/release-detail.component";
import {CacheService} from "../service/cache.service";
import {ReleaseCoverDirective} from "../directive/release-cover.directive";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ArtistCreditsComponent,
        SearchComponent,
        ArtistDetailComponent,
        ReleaseGroupDetailComponent,
        ReleaseDetailComponent,
        ReleaseGroupCoverDirective,
        ReleaseCoverDirective,
        FlexDatePipe,
        SecondaryTypePipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
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
    providers: [
        UserService,
        MusicbrainzService,
        CacheService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
