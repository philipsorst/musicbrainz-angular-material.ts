import {Component, OnInit} from "@angular/core";
import {PaginatedArray} from "../api/paginated-array";
import {Artist} from "../artist/artist";
import {MusicbrainzEntity} from "../api/musicbrainz-entity";
import {MusicbrainzService} from "../api/musicbrainz.service";
import {ReleaseGroup} from "../release-group/release-group";
import {Release} from "../release/release";
import {Recording} from "../recording/recording";
import {FormControl} from '@angular/forms';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    public artistsLoading$ = new BehaviorSubject(false);
    public releaseGroups$: Observable<PaginatedArray<ReleaseGroup>>;
    public releaseGroupsLoading$ = new BehaviorSubject(false);
    public releases$: Observable<PaginatedArray<Release>>;
    public releasesLoading$ = new BehaviorSubject(false);
    public recordings$: Observable<PaginatedArray<Recording>>;
    public recordingsLoading$ = new BehaviorSubject(false);

    constructor(private musicbrainzService: MusicbrainzService, private snackBar: MatSnackBar)
    {
    }

    /**
     * @override
     */
    public ngOnInit(): void
    {
        this.artists$ = this.artistSearchControl.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => this.artistsLoading$.next(true)),
            switchMap((value) => this.musicbrainzService.searchArtists(value)),
            map(value => {
                this.artistsLoading$.next(false);
                return value;
            }),
            catchError(error => {
                this.snackBar.open('Could not search artists', 'OK');
                return throwError(error);
            })
        );

        this.releaseGroups$ = this.releaseGroupSearchControl.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((value) => this.musicbrainzService.searchReleaseGroups(value))
        );

        this.releases$ = this.releaseSearchControl.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((value) => this.musicbrainzService.searchReleases(value))
        );

        this.recordings$ = this.recordingSearchControl.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((value) => this.musicbrainzService.searchRecordings(value))
        );
    }

    public trackById(index: number, musicbrainzEntity: MusicbrainzEntity): string
    {
        return musicbrainzEntity.id;
    }
}
