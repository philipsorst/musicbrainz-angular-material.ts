import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Restangular} from "ngx-restangular";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {MdGridList} from "@angular/material";
import {ObservableMedia} from "@angular/flex-layout";
import {Artist} from "../model/artist";
import {ReleaseGroup} from "../model/release-group";
import {PaginatedArray} from "../module/paginated-array";
import {FlexDate} from "../model/flex-date";
import {UserService} from "../service/user.service";

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

    private routeSubscription: Subscription;

    private mediaSubscription: Subscription;

    @ViewChild(MdGridList)
    private gridList;

    constructor(private restangular: Restangular, private route: ActivatedRoute, private media: ObservableMedia, private userService: UserService) {
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

    public selectedSecondaryType(releaseGroup: ReleaseGroup) {
        console.log(releaseGroup.secondaryTypes);
        return false;
    }

    ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe((parameters) => {
            this.loading = true;
            let id = parameters['id'];
            this.restangular.one('artist', id).get().subscribe(
                (response) => {
                    this.artist = response;
                    console.log(this.artist);
                    this.userService.addRecentArtist(this.artist);
                    this.restangular.all('release-group').getList({
                        'artist': this.artist.id,
                        'limit': 100
                    }).subscribe(
                        (releaseGroups: PaginatedArray<ReleaseGroup>) => {
                            this.loading = false;
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
                                        console.error('Unknown release group type', releaseGroup.primaryType)
                                    }
                                }
                            }
                        },
                        (response) => {
                            console.error(response);
                            this.loading = false;
                        }
                    );
                },
                (response) => {
                    console.error(response);
                    this.loading = false;
                }
            );

        });
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }
}
