//http://coverartarchive.org/release-group/{{releaseGroup.id}}/front-250

import {Directive, HostBinding, Input, OnInit} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";

@Directive({selector: '[releaseGroupCover]'})
export class ReleaseGroupCoverDirective implements OnInit {

    @Input('releaseGroupCover')
    releaseGroup: any;

    @HostBinding('style.backgroundImage')
    backgroundImage: any;

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        let imageUrl = 'http://coverartarchive.org/release-group/' + this.releaseGroup.id + '/front-250';
        let imageUrlValue = 'url(' + imageUrl + ')';
        this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(imageUrlValue);
    }
}