import {Artist} from "../artist/artist";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from 'rxjs';
import {ReleaseGroup} from '../release-group/release-group';
import {Release} from '../release/release';

@Injectable()
export class UserService
{
    private recentArtistsSubject = new BehaviorSubject<Artist[]>(this.loadRecentArtists());

    private recentReleaseGroupsSubject = new BehaviorSubject<ReleaseGroup[]>(this.loadRecentReleaseGroups());

    private recentReleasesSubject = new BehaviorSubject<Release[]>(this.loadRecentReleases());

    private static KEY_RECENT_ARTISTS: string = 'ddr_mb.recent_artists';

    private static KEY_RECENT_RELEASE_GROUPS: string = 'ddr_mb.recent_release_groups';

    private static KEY_RECENT_RELEASES: string = 'ddr_mb.recent_releases';

    public loadRecentArtists(): Array<Artist>
    {
        let entries = JSON.parse(localStorage.getItem(UserService.KEY_RECENT_ARTISTS));
        if (null === entries) {
            entries = [];
        }

        return entries;
    }

    public loadRecentReleaseGroups(): Array<ReleaseGroup>
    {
        let entries = JSON.parse(localStorage.getItem(UserService.KEY_RECENT_RELEASE_GROUPS));
        if (null === entries) {
            entries = [];
        }

        return entries;
    }

    public loadRecentReleases(): Array<Release>
    {
        let entries = JSON.parse(localStorage.getItem(UserService.KEY_RECENT_RELEASES));
        if (null === entries) {
            entries = [];
        }

        return entries;
    }

    public addRecentArtist(artist: Artist)
    {
        let entries = this.loadRecentArtists().filter((element) => {
            return element.id !== artist.id;
        });
        entries.unshift(artist);
        entries.length = Math.min(entries.length, 10);
        localStorage.setItem(UserService.KEY_RECENT_ARTISTS, JSON.stringify(entries));
        this.recentArtistsSubject.next(entries);
    }

    public addRecentReleaseGroup(entry: ReleaseGroup)
    {
        let entries = this.loadRecentReleaseGroups().filter((element) => {
            return element.id !== entry.id;
        });
        entries.unshift(entry);
        entries.length = Math.min(entries.length, 10);
        localStorage.setItem(UserService.KEY_RECENT_RELEASE_GROUPS, JSON.stringify(entries));
        this.recentReleaseGroupsSubject.next(entries);
    }

    public addRecentRelease(entry: Release)
    {
        let entries = this.loadRecentReleases().filter((element) => {
            return element.id !== entry.id;
        });
        entries.unshift(entry);
        entries.length = Math.min(entries.length, 10);
        localStorage.setItem(UserService.KEY_RECENT_RELEASES, JSON.stringify(entries));
        this.recentReleasesSubject.next(entries);
    }

    public getRecentArtistsObservable(): Observable<Artist[]>
    {
        return this.recentArtistsSubject.asObservable();
    }

    public getRecentReleaseGroupsObservable(): Observable<ReleaseGroup[]>
    {
        return this.recentReleaseGroupsSubject.asObservable();
    }

    public getRecentReleasesObservable(): Observable<Release[]>
    {
        return this.recentReleasesSubject.asObservable();
    }
}
