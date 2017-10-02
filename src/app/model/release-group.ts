import {FlexDate} from "./flex-date";
import {MusicbrainzEntity} from "./musicbrainz-entity";

export class ReleaseGroup extends MusicbrainzEntity {

    title: string;
    firstReleaseDate: FlexDate;
    primaryType: string;
    secondaryTypes: string[];

    public static parse(data: any): ReleaseGroup {
        let releaseGroup = new ReleaseGroup();
        releaseGroup.id = data.id;
        releaseGroup.title = data.title;
        releaseGroup.firstReleaseDate = FlexDate.parse(data['first-release-date']);
        releaseGroup.primaryType = data['primary-type'];
        releaseGroup.secondaryTypes = data['secondary-types'];

        return releaseGroup;
    }
}
