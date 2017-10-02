import {FlexDate} from "./flex-date";

export class ReleaseGroup {

    id: string;
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
