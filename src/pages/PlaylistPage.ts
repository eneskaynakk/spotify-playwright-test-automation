import { Locator, Page } from '@playwright/test';

export class PlaylistPage {
    readonly page : Page;

    readonly editDetailsButton : Locator;
    readonly playlistNameChangeInput : Locator;
    readonly photoUploadInput : Locator;
    readonly saveButton : Locator;
    readonly newPlaylistNameButton : Locator;
    readonly musicSearchBox : Locator;
    readonly addMusicButton : Locator;
    readonly closeButton : Locator;
    readonly musicNameButton : Locator;
    readonly musicDeleteButton : Locator;
    readonly playlistDeleteButton : Locator;
    readonly playlistConfirmationButton : Locator;
    readonly confirmDeletionButton : Locator;
    readonly playlistNameButton : Locator;

    constructor(page : Page) {
        this.page = page;

        this.editDetailsButton = page.getByText('Edit details');
        this.playlistNameChangeInput = page.getByPlaceholder('Add a name');
        this.photoUploadInput = page.getByTestId('image-file-picker');
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.newPlaylistNameButton = page.getByRole('button', { name: 'Favori Listem – Edit details' });
        this.musicSearchBox = page.getByPlaceholder('Search for songs or episodes');
        this.addMusicButton = page.getByRole('button', { name: 'Add to Playlist' }).first();
        this.closeButton = page.getByRole('button', { name: 'Close' }).nth(1);
        this.musicNameButton = page.getByRole('link', { name: 'Yokluğunda' }).first();
        this.musicDeleteButton = page.getByRole('menuitem', { name: 'Remove from this playlist', exact: true });
        this.playlistDeleteButton = page.getByRole('menuitem', { name: 'Delete', exact: true });
        this.playlistConfirmationButton = page.getByRole('button', { name: 'Create playlist', exact: true });
        this.confirmDeletionButton = page.getByRole('button', { name: 'Delete Favori Listem?', exact: true });
        this.playlistNameButton = page.getByRole('button', { name: 'My Playlist #2 – Edit details', exact: true });
    };

    async renamedPlaylist(newPlaylistName: string) {
        await this.playlistNameButton.click({button: "right"});
        await this.editDetailsButton.click();
        await this.playlistNameChangeInput.click();
        await this.playlistNameChangeInput.fill(newPlaylistName);
        
    };

    async updatePlaylistCover() {
        await this.photoUploadInput.setInputFiles('C:\\Users\\kaynk\\Downloads\\rose.jpg');
        await this.saveButton.click();
    };

    async addMusic(music: string) {
        await this.musicSearchBox.click();
        await this.musicSearchBox.fill(music);
        await this.addMusicButton.click();
    };

    async deleteMusic() {
        await this.closeButton.click();
        await this.musicNameButton.click({button: "right"});
        await this.musicDeleteButton.click();
    };

    async deletePlaylist() {
        await this.newPlaylistNameButton.click({button: "right"});
        await this.playlistDeleteButton.click();
        await this.confirmDeletionButton.click();
    };
    
};