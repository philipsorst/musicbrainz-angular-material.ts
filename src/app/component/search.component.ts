import {Component} from "@angular/core";
import {Restangular} from "ngx-restangular";
import {PaginatedArray} from "../module/paginated-array";
import {Artist} from "../model/artist";
import {MusicbrainzEntity} from "../model/musicbrainz-entity";

@Component({
    templateUrl: './search.component.html',
})
export class SearchComponent {
    query = {
        artists: ''
    };

    loading = {
        artists: false
    };

    result = {
        artists: null
    };

    constructor(private restangular: Restangular) {
    }

    public searchArtist() {
        this.loading.artists = true;
        this.result.artists= null;
        this.restangular.all('artist').getList({'query': 'artist:(' + this.query.artists + ')'}).subscribe((artists: PaginatedArray<Artist>) => {
            this.result.artists = artists;
            this.loading.artists = false;
        }, (response) => {
            console.error(response);
            this.loading.artists = false;
        });
    }

    public trackById(index: number, musicbrainzEntity: MusicbrainzEntity): string {
        return musicbrainzEntity.id;
    }
}
