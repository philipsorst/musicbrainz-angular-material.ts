import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from "./search/search.component";
import {ArtistDetailComponent} from "./artist/artist-detail.component";
import {ReleaseGroupDetailComponent} from "./release-group/release-group-detail.component";
import {ReleaseDetailComponent} from "./release/release-detail.component";

const routes: Routes = [
    {path: 'search', component: SearchComponent, data: {state: 'search'}},
    {path: 'artists/:id', component: ArtistDetailComponent, data: {state: 'artistDetail'}},
    {path: 'release-group/:id', component: ReleaseGroupDetailComponent, data: {state: 'releaseGroupDetail'}},
    {path: 'release/:id', component: ReleaseDetailComponent, data: {state: 'releaseDetail'}},
    {path: '**', redirectTo: '/search', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
