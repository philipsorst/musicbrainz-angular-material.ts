import {MusicbrainzEntity} from "../api/musicbrainz-entity";
import {LifeSpan} from '../api/life-span';

export class Artist extends MusicbrainzEntity
{
    name: string;
    disambiguation: string;
    country: string;
    type: string;
    sortName: string;
    lifeSpan: LifeSpan;

    public static parse(data: any): Artist
    {
        let artist = new Artist();
        artist.id = data.id;
        artist.name = data.name;
        artist.disambiguation = data.disambiguation;
        artist.country = data.country;
        artist.type = data.type;
        artist.sortName = data['sort-name'];
        if (data['life-span']) {
            artist.lifeSpan = LifeSpan.parse(data['life-span']);
        }

        return artist;
    }
}
