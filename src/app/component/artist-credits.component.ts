import {Component, Input} from "@angular/core";
import {ArtistCredit} from "../model/artist-credit";

@Component({
    selector: '[artist-credits]',
    templateUrl: './artist-credits.component.html'
})
export class ArtistCreditsComponent {
    @Input('artist-credits')
    public artistCredits: Array<ArtistCredit>;
}
