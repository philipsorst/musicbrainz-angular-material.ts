import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
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
import {SearchComponent} from "./search/search.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArtistDetailComponent} from "./artist/artist-detail.component";
import {ReleaseGroupCoverDirective} from "./release-group/release-group-cover.directive";
import {FlexDatePipe} from "./flex-date/flex-date.pipe";
import {HomeComponent} from "./home/home.component";
import {UserService} from "./user/user.service";
import {ReleaseGroupSecondaryTypePipe} from "./release-group/release-group-secondary-type.pipe";
import {MusicbrainzService} from "./api/musicbrainz.service";
import {ReleaseGroupDetailComponent} from "./release-group/release-group-detail.component";
import {ArtistCreditsComponent} from "./artist/artist-credits.component";
import {ReleaseDetailComponent} from "./release/release-detail.component";
import {CacheService} from "./cache/cache.service";
import {ReleaseCoverDirective} from "./release/release-cover.directive";
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {LifeSpanPipe} from './api/life-span.pipe';
import {GridTileLazyImgDirective} from './lazy-img/grid-tile-lazy-img.directive';
import {GridTileLazyImageContainerDirective} from './lazy-img/grid-tile-lazy-image-container.directive';

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
        ReleaseGroupSecondaryTypePipe,
        LifeSpanPipe,
        GridTileLazyImgDirective,
        GridTileLazyImageContainerDirective
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
        OverlayModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
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
