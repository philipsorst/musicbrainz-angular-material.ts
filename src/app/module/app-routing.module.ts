import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from "../component/search.component";
import {ArtistDetailComponent} from "../component/artist-detail.component";

const routes: Routes = [
    {path: '', redirectTo: '/search', pathMatch: 'full'},
    {path: 'search', component: SearchComponent},
    {path: 'artists/:id', component: ArtistDetailComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
