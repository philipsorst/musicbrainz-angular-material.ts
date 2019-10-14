import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MusicbrainzService} from "../api/musicbrainz.service";
import {ReleaseGroup} from "./release-group";
import {Release} from "../release/release";
import {map, switchMap} from 'rxjs/operators';

@Component({
    templateUrl: './release-group-detail.component.html'
})
export class ReleaseGroupDetailComponent implements OnInit
{
    public releaseGroup$: Observable<ReleaseGroup>;

    public releases$: Observable<Release[]>;

    constructor(private route: ActivatedRoute, private musicbrainzService: MusicbrainzService)
    {
    }

    /**
     * @override
     */
    public ngOnInit(): void
    {
        const $id = this.route.paramMap.pipe(
            map(paramMap => paramMap.get('id'))
        );

        this.releaseGroup$ = $id.pipe(
            switchMap(id => this.musicbrainzService.findReleaseGroup(id))
        );

        this.releases$ = $id.pipe(
            switchMap(id => this.musicbrainzService.listAllReleasesByReleaseGroup(id))
        );
    }
}
