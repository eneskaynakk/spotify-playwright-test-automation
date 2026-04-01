import { test, expect } from '../src/fixtures/custom-fixture';

test.use({ storageState: 'spotify-session.json' });

test('Spotify Anasayfa İşlemleri', async ({ basePage }) => {
    
    test.step('Spotify anasayfasına gidilir ve doğrulama yapılır',async () => {
        await basePage.goToSpotify();

        await expect(basePage.spotifyLogo).toBeVisible();
    })

    test.step('Çerezler reddedilir ve kullanıcı oturumu doğrulaması yapılır',async () => {
        await basePage.rejectingCookies();

        await expect(basePage.userNameButton).toBeVisible();
    })
    
});
