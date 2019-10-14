import {Component, OnInit} from "@angular/core";
import {PaginatedArray} from "../module/paginated-array";
import {Artist} from "../model/artist";
import {MusicbrainzEntity} from "../model/musicbrainz-entity";
import {MusicbrainzService} from "../service/musicbrainz.service";
import {ReleaseGroup} from "../model/release-group";
import {Release} from "../model/release";
import {Recording} from "../model/recording";
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';

@Component({
    templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit
{
    public artistSearchControl = new FormControl();
    public releaseGroupSearchControl = new FormControl();
    public releaseSearchControl = new FormControl();
    public recordingSearchControl = new FormControl();

    public artists$: Observable<PaginatedArray<Artist>>;
    public releaseGroups$: Observable<PaginatedArray<ReleaseGroup>>;
    public releases$: Observable<PaginatedArray<Release>>;
    public recordings$: Observable<PaginatedArray<Recording>>;

    constructor(private musicbrainzService: MusicbrainzService)
    {
    }

    /**
     * @override
     */
    public ngOnInit(): void
    {
        this.artists$ = this.artistSearchControl.valueChanges.pipe(
            debounceTime(500),
            switchMap((value) => this.musicbrainzService.searchArtists(value))
        );

        this.releaseGroups$ = this.releaseGroupSearchControl.valueChanges.pipe(
            debounceTime(500),
            switchMap((value) => this.musicbrainzService.searchReleaseGroups(value))
        );

        this.releases$ = this.releaseSearchControl.valueChanges.pipe(
            debounceTime(500),
            switchMap((value) => this.musicbrainzService.searchReleases(value))
        );

        this.recordings$ = this.recordingSearchControl.valueChanges.pipe(
            debounceTime(500),
            switchMap((value) => this.musicbrainzService.searchRecordings(value))
        );
    }

    public trackById(index: number, musicbrainzEntity: MusicbrainzEntity): string
    {
        return musicbrainzEntity.id;
    }
}
