import {Artist} from "../model/artist";
import {Injectable} from "@angular/core";

@Injectable()
export class UserService {

    private static KEY_RECENT_ARTISTS: string = 'recent_artists';

    public listRecentArtists(): Array<Artist> {
        let artists = JSON.parse(localStorage.getItem(UserService.KEY_RECENT_ARTISTS));
        if (null === artists) {
            artists = [];
        }

        return artists;
    }

    public addRecentArtist(artist: Artist) {
        let artists = this.listRecentArtists().filter((element) => {
            return element.id !== artist.id;
        });
        artists.unshift(artist);
        artists.length = Math.min(artists.length, 10);
        localStorage.setItem(UserService.KEY_RECENT_ARTISTS, JSON.stringify(artists));
    }
}
