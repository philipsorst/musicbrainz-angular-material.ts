//http://coverartarchive.org/release-group/{{releaseGroup.id}}/front-250

import {Directive, HostBinding, Input, OnInit} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {Release} from "../model/release";

@Directive({selector: '[releaseCover]'})
export class ReleaseCoverDirective implements OnInit {

    @Input('releaseCover')
    release: Release;

    @HostBinding('style.backgroundImage')
    backgroundImage: any;

    @HostBinding('style.backgroundSize')
    backgroundSize: any;

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.backgroundSize = 'cover';
        let imageUrl = 'http://coverartarchive.org/release/' + this.release.id + '/front-250';
        let imageUrlValue = 'url(' + imageUrl + ')';
        this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(imageUrlValue);
    }
}
