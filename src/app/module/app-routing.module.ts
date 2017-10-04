import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from "../component/search.component";
import {ArtistDetailComponent} from "../component/artist-detail.component";
import {HomeComponent} from "../component/home.component";
import {ReleaseGroupDetailComponent} from "../component/release-group-detail.component";
import {ReleaseDetailComponent} from "../component/release-detail.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'search', component: SearchComponent},
    {path: 'artists/:id', component: ArtistDetailComponent},
    {path: 'release-group/:id', component: ReleaseGroupDetailComponent},
    {path: 'release/:id', component: ReleaseDetailComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
