import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Release} from "../model/release";
import {ActivatedRoute} from "@angular/router";
import {MusicbrainzService} from "../service/musicbrainz.service";

@Component({
    templateUrl: './release-detail.component.html'
})
export class ReleaseDetailComponent implements OnInit {

    public loading: boolean = false;

    public release: Release;

    private routeSubscription: Subscription;

    constructor(private route: ActivatedRoute, private musicbrainzService: MusicbrainzService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((parameters) => {
            let id = parameters.id;
            this.loading = true;
            this.musicbrainzService.findRelease(id)
                .then((release: Release) => {
                    console.log(release);
                    this.release = release;
                    this.loading = false;
                })
                .catch(reason => {
                    console.error(reason);
                    this.loading = false;
                });
        });
    }
}
