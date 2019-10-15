import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {animate, query, style, transition, trigger,} from '@angular/animations';
import {UserService} from './user/user.service';
import {Observable} from 'rxjs';
import {Artist} from './artist/artist';
import {ReleaseGroup} from './release-group/release-group';
import {Release} from './release/release';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('routerAnimation', [
            transition('* <=> *', [
                query(':enter',
                    style({
                        position: 'fixed',
                        width: '100%',
                        transform: 'scale(0)',
                        opacity: 0,
                        'z-index': 100
                    }),
                    {optional: true}),
                query(':leave',
                    style({
                        'z-index': 0
                    }),
                    {optional: true}),
                query(':leave',
                    animate('500ms ease',
                        style({
                            opacity: 0,
                            transform: 'scale(0)',
                        })
                    ),
                    {optional: true}),
                query(':enter',
                    animate('500ms ease',
                        style({
                            opacity: 1,
                            transform: 'scale(1)'
                        })
                    ),
                    {optional: true}),
            ])
        ])
    ]
})
export class AppComponent implements OnInit
{
    public recentArtists$: Observable<Artist[]>;
    public recentReleaseGroups$: Observable<ReleaseGroup[]>;
    public recentReleases$: Observable<Release[]>;

    constructor(private userService: UserService)
    {
    }

    /**
     * @override
     */
    public ngOnInit(): void
    {
        this.recentArtists$ = this.userService.getRecentArtistsObservable();
        this.recentReleaseGroups$ = this.userService.getRecentReleaseGroupsObservable();
        this.recentReleases$ = this.userService.getRecentReleasesObservable();
    }


    public getState(outlet)
    {
        return outlet.activatedRouteData.state;
    }
}
