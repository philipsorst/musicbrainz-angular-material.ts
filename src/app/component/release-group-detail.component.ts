import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MusicbrainzService} from "../service/musicbrainz.service";
import {ReleaseGroup} from "../model/release-group";
import {Release} from "../model/release";

@Component({
    templateUrl: './release-group-detail.component.html'
})
export class ReleaseGroupDetailComponent implements OnInit, OnDestroy {

    public loading: boolean = false;

    public releaseGroup: ReleaseGroup;

    public releases: Array<Release>;

    private routeSubscription: Subscription;

    constructor(private route: ActivatedRoute, private musicbrainzService: MusicbrainzService) {
    }

    ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe((parameters) => {
            let id = parameters.id;
            this.loading = true;
            Promise.all([
                this.musicbrainzService.findReleaseGroup(id),
                this.musicbrainzService.listAllReleases(id)
            ])
                .then(([releaseGroup, releases]) => {
                    this.releaseGroup = releaseGroup;
                    this.releases = releases;
                    this.loading = false;
                })
                .catch((reason) => {
                    this.loading = false;
                    console.error(reason);
                })
        });
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe()
    }
}
