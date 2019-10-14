import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MatGridList} from "@angular/material";
import {Artist} from "../model/artist";
import {ReleaseGroup} from "../model/release-group";
import {FlexDate} from "../model/flex-date";
import {UserService} from "../service/user.service";
import {MusicbrainzEntity} from "../model/musicbrainz-entity";
import {MusicbrainzService} from "../service/musicbrainz.service";
import {CacheService} from "../service/cache.service";
import {Observable, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {CategorizedReleaseGroups} from '../release-group/categorized-release-groups';

@Component({
    templateUrl: './artist-detail.component.html'
})
export class ArtistDetailComponent implements OnInit
{
    public artist$: Observable<Artist>;

    public categorizedReleaseGroups$: Observable<CategorizedReleaseGroups>;

    public loading: boolean = false;

    public secondaryTypes: Array<string> = [];

    private mediaSubscription: Subscription;

    @ViewChild(MatGridList, {static: true})
    private gridList;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private musicbrainzService: MusicbrainzService,
        private cacheService: CacheService
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
            switchMap(id => this.musicbrainzService.findArtist(id))
        );

        this.categorizedReleaseGroups$ = $id.pipe(
            switchMap(id => this.musicbrainzService.listAllReleaseGroupsByArtist(id)),
            map(releaseGroups => this.categorizeReleaseGroups(releaseGroups))
        );

        // this.routeSubscription = this.route.params.subscribe((parameters) => {
        //     let id = parameters['id'];
        //     let result = this.cacheService.getEntry(this.getCacheKey(id));
        //     if (null !== result) {
        //         this.artist = result.artist;
        //         this.userService.addRecentArtist(this.artist);
        //         this.sortReleaseGroups(result.releaseGroups);
        //     } else {
        //         this.loading = true;
        //         Promise.all([
        //             this.musicbrainzService.findArtist(id),
        //             this.musicbrainzService.listAllReleaseGroupsByArtist(id)
        //         ])
        //             .then(([artist, releaseGroups]) => {
        //                 this.artist = artist;
        //                 this.userService.addRecentArtist(this.artist);
        //                 this.sortReleaseGroups(releaseGroups);
        //                 this.cacheService.setEntry(this.getCacheKey(id), {
        //                     'artist': artist,
        //                     'releaseGroups': releaseGroups
        //                 });
        //                 this.loading = false;
        //             })
        //             .catch(reason => {
        //                 console.error(reason);
        //                 this.loading = false;
        //             });
        //     }
        // });
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

        console.log('sadfhwef', categorizedReleaseGroups);

        return categorizedReleaseGroups;
    }

    private getCacheKey(artistId: string)
    {
        return 'artist-detail:' + artistId;
    }
}
