import { test, expect } from '../src/fixtures/custom-fixture';

test.use({ storageState: 'spotify-session.json' });

test.beforeEach('Spotify Anasayfasına Gidilir ve Çerezler Reddedilir',async ({ basePage }) => {
    await basePage.goToSpotify();
    await basePage.rejectingCookies();
});

test('Şarkı ve Sanatçı İşlemleri ', async ({ basePage, searchPage }) => {
    
    await test.step('Şarkı, sanatçı aranır ve doğrulama yapılır', async () => {
        await basePage.songAndArtistSearch('Inna Inndia');

        await expect(searchPage.songNameButton).toContainText('Inndia');

        await expect(searchPage.artistNameButton).toContainText('INNA');
    });

    await test.step('Album sayfasına gidilir ve doğrulama yapılır', async () => {
        await searchPage.goToAlbum();

        await expect(searchPage.albumNameButton).toContainText('Party Never Ends, Part 1 (Deluxe Edition)');
    });

    await test.step('Önceki sayfaya dönülür, sanatçı sayfasına gidilir ve doğrulama yapılır', async () => {
        await searchPage.goToArtist();

        await expect(searchPage.followButton).toContainText('Follow');
    });

    await test.step('Sanatçı takip edilir ve doğrulama yapılır', async () => {
        await searchPage.followArtist();

        await expect(searchPage.followingButton).toContainText('Following');
    });

    await test.step('Sanatçıyı takip etmekten çıkılır ve doğrulama yapılır', async () => {
        await searchPage.unfollowArtist();

        await expect(searchPage.followButton).toContainText('Follow');
    });

});