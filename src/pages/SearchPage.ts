import { Locator, Page } from '@playwright/test';

export class SearchPage {
    readonly page: Page;

    readonly songNameButton : Locator;
    readonly artistNameButton : Locator;
    readonly goToAlbumButton : Locator;
    readonly albumNameButton : Locator;
    readonly followButton : Locator;
    readonly followingButton : Locator;

    constructor(page: Page) {
        this.page = page;

        this.songNameButton = page.getByRole('link', { name: 'Inndia' }).nth(1);
        this.artistNameButton = page.getByRole('link', { name: 'INNA' }).nth(1);
        this.goToAlbumButton = page.getByRole('menuitem', { name: 'Go to album' });
        this.albumNameButton = page.getByRole('heading', { name: 'Party Never Ends, Part 1 (Deluxe Edition)' });
        this.followButton = page.getByRole('button', { name: 'Follow', exact: true });
        this.followingButton = page.getByRole('button', { name: 'Following', exact: true });
    };

    async goToAlbum() {
        await this.songNameButton.click({button: "right"});
        await this.goToAlbumButton.click();
    };

    async searchSongAndArtist() {
        await this.songNameButton.click({button: "right"});
        await this.artistNameButton.click({button: "right"});
    };
    
    async goToArtist() {
        await this.page.goBack();
        await this.artistNameButton.click();
    };

    async followArtist() {
        await this.followButton.click();
    };

    async unfollowArtist() {
        await this.followingButton.click();
    };
    
};



