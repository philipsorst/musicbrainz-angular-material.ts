import {Component, OnDestroy, OnInit} from "@angular/core";
import {Restangular} from "ngx-restangular";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
    templateUrl: './artist-detail.component.html',
})
export class ArtistDetailComponent implements OnInit, OnDestroy {

    public artist: any;

    public releaseGroups: any;

    public loading: boolean = false;

    private routeSubscription: Subscription;

    constructor(private restangular: Restangular, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe((parameters) => {
            this.loading = true;
            let id = parameters['id'];
            this.restangular.one('artist', id).get().subscribe(
                (response) => {
                    this.artist = response;
                    console.log(this.artist);
                    this.restangular.one('release-group').get({
                        'artist': this.artist.id,
                        'limit': 100
                    }).subscribe(
                        (response) => {
                            console.log(response);
                            this.loading = false;
                            this.releaseGroups = response['release-groups'];
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
