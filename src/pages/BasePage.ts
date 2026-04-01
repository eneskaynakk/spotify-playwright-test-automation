import { Locator, Page } from "@playwright/test";

export class BasePage {
    readonly page:Page;

    readonly spotifyLogo : Locator;
    readonly userNameButton : Locator;
    readonly rejectCookiesButton : Locator;
    readonly createPlaylistButton : Locator;
    readonly playlistButton : Locator;
    readonly songSearchBox : Locator;

    constructor(page : Page) {
        this.page = page;

        this.spotifyLogo = page.getByRole('link', { name: 'Spotify', exact: true });
        this.userNameButton = page.getByTestId('user-widget-link');
        this.rejectCookiesButton = page.getByRole('button', { name: 'REJECT ALL' });
        this.createPlaylistButton = page.getByRole('button', { name: 'Create', exact: true });
        this.playlistButton = page.getByRole('menuitem', { name: 'Playlist' });
        this.songSearchBox = page.getByPlaceholder('What do you want to play?');
    };

    async goToSpotify() {
        await this.page.goto('https://open.spotify.com');
    };

    async rejectingCookies() {
        try {
            await this.rejectCookiesButton.click({ timeout: 5000 });
        }
        catch (error){
            console.log('Cookie pop-up çıkmadı');
        }
    };

    async createPlaylist() {
        await this.createPlaylistButton.click();
        await this.page.waitForTimeout(250);
        await this.playlistButton.click();
    };
    
    async songAndArtistSearch(song: string) {
        await this.songSearchBox.click();
        await this.songSearchBox.fill(song);
        await this.songSearchBox.press('Enter');
    };

};