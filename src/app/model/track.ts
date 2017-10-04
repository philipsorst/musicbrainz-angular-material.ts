import {MusicbrainzEntity} from "./musicbrainz-entity";
import {Recording} from "./recording";

export class Track extends MusicbrainzEntity {
    length: number;
    number: string;
    position: number;
    title: string;
    recording: Recording;

    public static parse(data: any): Track {
        let track = new Track();
        track.id = data['id'];
        track.length = +data['length'];
        track.number = data['number'];
        track.position = +data['position'];
        track.title = data['title'];
        track.recording = Recording.parse(data['recording']);

        return track;
    }
}
