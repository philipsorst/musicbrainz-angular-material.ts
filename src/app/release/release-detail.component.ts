import {Component, OnInit} from "@angular/core";
import {Release} from "./release";
import {ActivatedRoute} from "@angular/router";
import {MusicbrainzService} from "../api/musicbrainz.service";
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {UserService} from '../user/user.service';

@Component({
    templateUrl: './release-detail.component.html'
})
export class ReleaseDetailComponent implements OnInit
{
    public release$: Observable<Release>;

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

        this.release$ = $id.pipe(
            switchMap(id => this.musicbrainzService.findRelease(id)),
            tap(release => this.userService.addRecentRelease(release))
        );
    }
}
