import {Component} from "@angular/core";
import {Restangular} from "ngx-restangular";

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
        this.restangular.one('artist').get({'query': 'artist:(' + this.query.artists + ')'}).subscribe((response) => {
            this.result.artists = response.artists;
            this.loading.artists = false;
        }, (response) => {
            console.error(response);
            this.loading.artists = false;
        });
    }

    public trackById(index: number, musicbrainzEntity: any): number {
        return musicbrainzEntity.id;
    }
}
