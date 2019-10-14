import {ChangeDetectionStrategy, Component} from '@angular/core';
import {animate, query, style, transition, trigger,} from '@angular/animations';

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
export class AppComponent
{
    constructor()
    {
    }

    public getState(outlet)
    {
        return outlet.activatedRouteData.state;
    }
}
