import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Restangular} from "ngx-restangular";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {MatGridList} from "@angular/material";
import {ObservableMedia} from "@angular/flex-layout";
import {Artist} from "../model/artist";
import {ReleaseGroup} from "../model/release-group";
import {FlexDate} from "../model/flex-date";
import {UserService} from "../service/user.service";
import {MusicbrainzEntity} from "../model/musicbrainz-entity";
import {MusicbrainzService} from "../service/musicbrainz.service";
import {CacheService} from "../service/cache.service";

@Component({
    templateUrl: './artist-detail.component.html',
})
export class ArtistDetailComponent implements OnInit, OnDestroy {

    public artist: Artist;

    public loading: boolean = false;

    public releaseGroups = {
        album: [],
        single: [],
        ep: [],
        broadcast: [],
        other: []
    };

    public secondaryTypes: Array<string> = [];

    private routeSubscription: Subscription;

    private mediaSubscription: Subscription;

    @ViewChild(MatGridList)
    private gridList;

    constructor(private restangular: Restangular,
                private route: ActivatedRoute,
                private router: Router,
                private media: ObservableMedia,
                private userService: UserService,
                private musicbrainzService: MusicbrainzService,
                private cacheService: CacheService) {
    }

    ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe((parameters) => {
            let id = parameters['id'];
            let result = this.cacheService.getEntry(this.getCacheKey(id));
            if (null !== result) {
                this.artist = result.artist;
                this.userService.addRecentArtist(this.artist);
                this.sortReleaseGroups(result.releaseGroups);
            } else {
                this.loading = true;
                Promise.all([
                    this.musicbrainzService.findArtist(id),
                    this.musicbrainzService.listAllReleaseGroups(id)
                ])
                    .then(([artist, releaseGroups]) => {
                        this.artist = artist;
                        this.userService.addRecentArtist(this.artist);
                        this.sortReleaseGroups(releaseGroups);
                        this.cacheService.setEntry(this.getCacheKey(id), {
                            'artist': artist,
                            'releaseGroups': releaseGroups
                        });
                        this.loading = false;
                    })
                    .catch(reason => {
                        console.error(reason);
                        this.loading = false;
                    });
            }
        });
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }

    public numCols() {
        if (this.media.isActive('xl')) {
            return 6;
        }
        else if (this.media.isActive('lg')) {
            return 5;
        }
        else if (this.media.isActive('md')) {
            return 4;
        }
        else if (this.media.isActive('sm')) {
            return 3;
        }
        else if (this.media.isActive('xs')) {
            return 2;
        }

        return 1;
    }

    public trackById(index: number, musicbrainzEntity: MusicbrainzEntity): string {
        return musicbrainzEntity.id;
    }

    public showReleaseGroup(releaseGroup: ReleaseGroup) {
        this.router.navigate(['/release-group', releaseGroup.id]);
    }

    private sortReleaseGroups(releaseGroups: Array<ReleaseGroup>) {
        let sortedReleaseGroups = releaseGroups.sort((left: ReleaseGroup, right: ReleaseGroup) => {
            return FlexDate.compare(right.firstReleaseDate, left.firstReleaseDate);
        });

        for (let releaseGroup of sortedReleaseGroups) {
            switch (releaseGroup.primaryType) {
                case 'Album': {
                    this.releaseGroups.album.push(releaseGroup);
                    break;
                }
                case 'EP': {
                    this.releaseGroups.ep.push(releaseGroup);
                    break;
                }
                case 'Single': {
                    this.releaseGroups.single.push(releaseGroup);
                    break;
                }
                case 'Broadcast': {
                    this.releaseGroups.broadcast.push(releaseGroup);
                    break;
                }
                case 'Other': {
                    this.releaseGroups.other.push(releaseGroup);
                    break;
                }
                default: {
                    console.warn('Unknown release group type', releaseGroup.primaryType)
                }
            }
        }
    }

    private getCacheKey(artistId: string) {
        return 'artist-detail:' + artistId;
    }
}
