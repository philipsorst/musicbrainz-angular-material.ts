import {MusicbrainzEntity} from "./musicbrainz-entity";
import {FlexDate} from "./flex-date";

export class Release extends MusicbrainzEntity {

    title: string;
    status: string;
    country: string;
    date: FlexDate;

    public static parse(data: any) {
        let release = new Release();
        release.title = data['title'];
        release.status = data['status'];
        release.date = FlexDate.parse(data['date']);
        release.country = data['country'];

        return release;
    }
}
