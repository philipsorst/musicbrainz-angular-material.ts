import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MusicbrainzService} from "../api/musicbrainz.service";
import {ReleaseGroup} from "./release-group";
import {Release} from "../release/release";
import {map, switchMap, tap} from 'rxjs/operators';
import {UserService} from '../user/user.service';

@Component({
    templateUrl: './release-group-detail.component.html'
})
export class ReleaseGroupDetailComponent implements OnInit
{
    public releaseGroup$: Observable<ReleaseGroup>;

    public releases$: Observable<Release[]>;

    constructor(
        private route: ActivatedRoute, private musicbrainzService: MusicbrainzService, private userService: UserService)
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
            switchMap(id => this.musicbrainzService.findReleaseGroup(id)),
            tap(releaseGroup => this.userService.addRecentReleaseGroup(releaseGroup))
        );

        this.releases$ = $id.pipe(
            switchMap(id => this.musicbrainzService.listAllReleasesByReleaseGroup(id))
        );
    }
}
