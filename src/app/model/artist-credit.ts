import {Artist} from "./artist";

export class ArtistCredit {
    artist: Artist;
    name: string;
    joinphrase: string;

    public static parse(data: any): ArtistCredit {
        let artistCredit = new ArtistCredit();
        artistCredit.artist = Artist.parse(data['artist']);
        artistCredit.joinphrase = data['joinphrase'];
        artistCredit.name = data['name'];
        return artistCredit;
    }
}
