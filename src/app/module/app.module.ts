import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from '../component/app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule
} from "@angular/material";
import {OverlayModule} from "@angular/cdk/overlay";
import {SearchComponent} from "../component/search.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArtistDetailComponent} from "../component/artist-detail.component";
import {ReleaseGroupCoverDirective} from "../directive/release-group-cover.directive";
import {FlexDatePipe} from "../pipe/flex-date.pipe";
import {HomeComponent} from "../component/home.component";
import {UserService} from "../service/user.service";
import {MbSecondaryTypePipe} from "../pipe/secondary-type.pipe";
import {MusicbrainzService} from "../service/musicbrainz.service";
import {ReleaseGroupDetailComponent} from "../component/release-group-detail.component";
import {ArtistCreditsComponent} from "../component/artist-credits.component";
import {ReleaseDetailComponent} from "../component/release-detail.component";
import {CacheService} from "../service/cache.service";
import {ReleaseCoverDirective} from "../directive/release-cover.directive";
import {HttpClientModule} from '@angular/common/http';

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
        MbSecondaryTypePipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatGridListModule,
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
