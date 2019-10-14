import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MatGridList} from "@angular/material";
import {Artist} from "./artist";
import {ReleaseGroup} from "../release-group/release-group";
import {FlexDate} from "../flex-date/flex-date";
import {UserService} from "../user/user.service";
import {MusicbrainzEntity} from "../api/musicbrainz-entity";
import {MusicbrainzService} from "../api/musicbrainz.service";
import {CacheService} from "../cache/cache.service";
import {Observable, Subscription} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {CategorizedReleaseGroups} from '../release-group/categorized-release-groups';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
    templateUrl: './artist-detail.component.html'
})
export class ArtistDetailComponent implements OnInit
{
    public artist$: Observable<Artist>;

    public categorizedReleaseGroups$: Observable<CategorizedReleaseGroups>;

    public loading: boolean = false;

    public secondaryTypes: Array<string> = [];

    public gridColumns$: Observable<number>;

    private mediaSubscription: Subscription;

    @ViewChild(MatGridList, {static: true})
    private gridList;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private musicbrainzService: MusicbrainzService,
        private cacheService: CacheService,
        private breakpointObserver: BreakpointObserver
    )
    {
    }

    /**
     * @override
     */
    public ngOnInit(): void
    {
        const $id = this.route.paramMap.pipe(
            map(routeParams => routeParams.get('id'))
        );

        this.artist$ = $id.pipe(
            switchMap(id => this.musicbrainzService.findArtist(id)),
            tap(artist => this.userService.addRecentArtist(artist))
        );

        this.categorizedReleaseGroups$ = $id.pipe(
            switchMap(id => this.musicbrainzService.listAllReleaseGroupsByArtist(id)),
            map(releaseGroups => this.categorizeReleaseGroups(releaseGroups))
        );

        this.gridColumns$ = this.breakpointObserver.observe([
            Breakpoints.XSmall,
            Breakpoints.Small,
            Breakpoints.Medium,
            Breakpoints.Large,
            Breakpoints.XLarge
        ]).pipe(map(result => {
            if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
                return 6;
            }
            if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
                return 5;
            }
            if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
                return 4;
            }
            if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
                return 3;
            }
            if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
                return 2;
            }

            return 1;
        }));
    }

    public numCols()
    {
        // if (this.media.isActive('xl')) {
        //     return 6;
        // }
        // else if (this.media.isActive('lg')) {
        //     return 5;
        // }
        // else if (this.media.isActive('md')) {
        //     return 4;
        // }
        // else if (this.media.isActive('sm')) {
        //     return 3;
        // }
        // else if (this.media.isActive('xs')) {
        //     return 2;
        // }

        return 1;
    }

    public trackById(index: number, musicbrainzEntity: MusicbrainzEntity): string
    {
        return musicbrainzEntity.id;
    }

    public showReleaseGroup(releaseGroup: ReleaseGroup)
    {
        this.router.navigate(['/release-group', releaseGroup.id]);
    }

    private categorizeReleaseGroups(releaseGroups: Array<ReleaseGroup>): CategorizedReleaseGroups
    {
        let sortedReleaseGroups = releaseGroups.sort((left: ReleaseGroup, right: ReleaseGroup) => {
            return FlexDate.compare(right.firstReleaseDate, left.firstReleaseDate);
        });

        const categorizedReleaseGroups = new CategorizedReleaseGroups();

        for (let releaseGroup of sortedReleaseGroups) {
            switch (releaseGroup.primaryType) {
                case 'Album': {
                    categorizedReleaseGroups.albums.push(releaseGroup);
                    break;
                }
                case 'EP': {
                    categorizedReleaseGroups.eps.push(releaseGroup);
                    break;
                }
                case 'Single': {
                    categorizedReleaseGroups.singles.push(releaseGroup);
                    break;
                }
                case 'Broadcast': {
                    categorizedReleaseGroups.broadcasts.push(releaseGroup);
                    break;
                }
                case 'Other': {
                    categorizedReleaseGroups.others.push(releaseGroup);
                    break;
                }
                default: {
                    console.warn('Unknown release group type', releaseGroup.primaryType)
                }
            }
        }

        return categorizedReleaseGroups;
    }

    private getCacheKey(artistId: string)
    {
        return 'artist-detail:' + artistId;
    }
}
