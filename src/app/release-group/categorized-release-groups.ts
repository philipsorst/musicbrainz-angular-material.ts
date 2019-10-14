import {ReleaseGroup} from '../model/release-group';

export class CategorizedReleaseGroups
{
    albums = new Array<ReleaseGroup>();
    singles = new Array<ReleaseGroup>();
    eps = new Array<ReleaseGroup>();
    broadcasts = new Array<ReleaseGroup>();
    others = new Array<ReleaseGroup>();
}
