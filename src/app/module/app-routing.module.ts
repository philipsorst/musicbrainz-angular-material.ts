import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from "../component/search.component";
import {ArtistDetailComponent} from "../component/artist-detail.component";
import {HomeComponent} from "../component/home.component";
import {ReleaseGroupDetailComponent} from "../component/release-group-detail.component";
import {ReleaseDetailComponent} from "../component/release-detail.component";

const routes: Routes = [
    {path: '', component: HomeComponent, data: {state: 'home'}},
    {path: 'search', component: SearchComponent, data: {state: 'search'}},
    {path: 'artists/:id', component: ArtistDetailComponent, data: {state: 'artistDetail'}},
    {path: 'release-group/:id', component: ReleaseGroupDetailComponent, data: {state: 'releaseGroupDetail'}},
    {path: 'release/:id', component: ReleaseDetailComponent, data: {state: 'releaseDetail'}}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
