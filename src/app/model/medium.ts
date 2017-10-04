import {Track} from "./track";

export class Medium {
    format: string;
    formatId: string;
    position: number;
    title: string;
    trackCount: number;
    trackOffset: number;
    tracks: Array<Track>;

    public static parse(data: any): Medium {
        let medium = new Medium();
        medium.format = data['format'];
        medium.formatId = data['format-id'];
        medium.position = +data['position'];
        medium.title = data['title'];
        medium.trackCount = +data['track-count'];
        medium.trackOffset = +data['track-offset'];

        if (data.hasOwnProperty('tracks')) {
            medium.tracks = [];
            for (let rawTrack of data['tracks']) {
                medium.tracks.push(Track.parse(rawTrack));
            }
        }

        return medium;
    }
}