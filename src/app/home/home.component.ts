import {Component, OnInit} from "@angular/core";
import {UserService} from "../user/user.service";
import {Artist} from "../artist/artist";

@Component({
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit
{
    public recentArtists: Array<Artist>;

    constructor(private userService: UserService)
    {
    }

    /**
     * @override
     */
    public ngOnInit(): void
    {
        this.recentArtists = this.userService.listRecentArtists();
    }
}
