document.addEventListener('DOMContentLoaded', function () {
    // Embed Google Slides
    const slidesIframe = document.createElement('iframe');
    slidesIframe.src = 'https://docs.google.com/presentation/d/e/2PACX-1vTpR4ExJIJt1dO-IS73DywYXBpKZJLIdsYcNIBiL4e6S5DyuvO1qE_uwvMyzYZPFVKNSlO2Wb0gjZi8/embed?start=false&loop=false&delayms=3000';
    slidesIframe.style.width = '100%';
    slidesIframe.style.height = '500px';
    slidesIframe.frameBorder = '0';
    slidesIframe.allowFullscreen = true;

    const slidesWidgetContainer = document.getElementById('slides-widget-area');
    slidesWidgetContainer.appendChild(slidesIframe);

    // Function to create Spotify iframe
    function createSpotifyWidget(playlistId) {
        const spotifyIframe = document.createElement('iframe');
        spotifyIframe.src = `https://open.spotify.com/embed/playlist/${playlistId}`;
        spotifyIframe.style.width = '100%';
        spotifyIframe.style.height = '100%';
        spotifyIframe.frameBorder = '0';
        spotifyIframe.allowTransparency = 'true';
        spotifyIframe.allow = 'encrypted-media';

        const spotifyWidgetContainer = document.getElementById('spotify-widget');
        spotifyWidgetContainer.innerHTML = ''; // Clear previous iframe
        spotifyWidgetContainer.appendChild(spotifyIframe);
    }

    // Load stored playlist ID
    chrome.storage.sync.get(['spotifyPlaylistId'], function (result) {
        if (result.spotifyPlaylistId) {
            createSpotifyWidget(result.spotifyPlaylistId);
            document.getElementById('spotify-playlist-id').style.display = 'none';
            document.getElementById('save-button').style.display = 'none';
        }
    });

    // Save button click event
    const saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', function () {
        const playlistId = document.getElementById('spotify-playlist-id').value;
        if (playlistId) {
            chrome.storage.sync.set({ spotifyPlaylistId: playlistId }, function () {
                createSpotifyWidget(playlistId);
                document.getElementById('spotify-playlist-id').style.display = 'none';
                document.getElementById('save-button').style.display = 'none';
            });
        }
    });
});
