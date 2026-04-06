import { test, expect } from '../src/fixtures/custom-fixture';

test.use({ storageState: 'spotify-session.json' });

test.beforeEach('Spotify Anasayfasına Gidilir ve Çerezler Reddedilir',async ({ basePage }) => {
    await basePage.goToSpotify();
    await basePage.rejectingCookies();
});

test('Çalma Listesi Oluşturma, Düzenleme, Silme ve Parça Ekleme/Çıkarma İşlemleri', async ({ basePage, playlistPage }) => {
    
    await test.step('Oynatma listesi oluşturulur ve doğrulama yapılır', async () => {
        await basePage.createPlaylist();
        
        await expect(playlistPage.playlistNameButton).toBeVisible();
    });

    await test.step('Oynatma listesi adı, kapak fotoğrafı eklenir ve doğrulama yapılır', async () => {
        await playlistPage.renamedPlaylist('Favori Listem');
        
        await playlistPage.updatePlaylistCover();
        
        await expect(playlistPage.newPlaylistNameButton).toContainText('Favori Listem');
    });

    await test.step('Müzik eklenir/çıkarılır ve doğrulama yapılır ', async () => {
        await playlistPage.addMusic('Yokluğunda');
        
        await expect(playlistPage.musicNameButton).toContainText('Yokluğunda');

        await playlistPage.deleteMusic();

        await expect(playlistPage.musicNameButton).toBeHidden();
    });

    await test.step('Oynatma listesi silinir ve doğrulama yapılır', async () => {
        await playlistPage.deletePlaylist();

        await expect(playlistPage.playlistConfirmationButton).toBeVisible();
    });

});
