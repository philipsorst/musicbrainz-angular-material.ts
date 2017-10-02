import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Restangular} from "ngx-restangular";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {MdGridList} from "@angular/material";
import {ObservableMedia} from "@angular/flex-layout";
import {Artist} from "../model/artist";
import {ReleaseGroup} from "../model/release-group";
import {PaginatedArray} from "../module/paginated-array";

@Component({
    templateUrl: './artist-detail.component.html',
})
export class ArtistDetailComponent implements OnInit, OnDestroy {

    public artist: Artist;

    public loading: boolean = false;

    public albums: any = [];

    public eps: any = [];

    public singles: any = [];

    public compilations: any = [];

    public live: any[];

    public other: any = [];

    private routeSubscription: Subscription;

    private mediaSubscription: Subscription;

    @ViewChild(MdGridList)
    private gridList;

    constructor(private restangular: Restangular, private route: ActivatedRoute, private media: ObservableMedia) {
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

    ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe((parameters) => {
            this.loading = true;
            let id = parameters['id'];
            this.restangular.one('artist', id).get().subscribe(
                (response) => {
                    this.artist = response;
                    console.log(this.artist);
                    this.restangular.all('release-group').getList({
                        'artist': this.artist.id,
                        'limit': 100
                    }).subscribe(
                        (releaseGroups: PaginatedArray<ReleaseGroup>) => {
                            this.loading = false;
                            let sortedReleaseGroups = releaseGroups.sort((left: ReleaseGroup, right: ReleaseGroup) => {
                                return right.firstReleaseDate.compareTo(left.firstReleaseDate);
                            });

                            for (let releaseGroup of sortedReleaseGroups) {
                                console.log(releaseGroup.secondaryTypes);
                                switch (releaseGroup.primaryType) {
                                    case 'Album': {
                                        this.albums.push(releaseGroup);
                                        break;
                                    }
                                    case 'EP': {
                                        this.eps.push(releaseGroup);
                                        break;
                                    }
                                    case 'Single': {
                                        this.singles.push(releaseGroup);
                                        break;
                                    }
                                    default: {
                                        this.other.push(releaseGroup);
                                        break;
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


            // https://musicbrainz.org/ws/2/release-group/?artist=7527f6c2-d762-4b88-b5e2-9244f1e34c46&limit=50&fmt=json

        });
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }
}
