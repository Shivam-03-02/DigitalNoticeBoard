document.addEventListener('DOMContentLoaded', function () {
    // Embed Google Slides
    const slidesIframe = document.createElement('iframe');
    slidesIframe.src = 'https://docs.google.com/presentation/d/e/2PACX-1vTpR4ExJIJt1dO-IS73DywYXBpKZJLIdsYcNIBiL4e6S5DyuvO1qE_uwvMyzYZPFVKNSlO2Wb0gjZi8/embed?start=false&loop=false&delayms=3000';
    slidesIframe.frameBorder = '0';
    slidesIframe.allowFullscreen = true;

    const slidesWidgetContainer = document.getElementById('slides-widget-area');
    slidesWidgetContainer.appendChild(slidesIframe);

    // Function to create Spotify iframe
    function createSpotifyWidget(playlistId) {
        const spotifyIframe = document.createElement('iframe');
        spotifyIframe.src = `https://open.spotify.com/embed/playlist/${playlistId}`;
        spotifyIframe.style.width = '100%';
        spotifyIframe.style.height = '300px'; // Adjust height as needed
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

    // Pomodoro Timer functionality
    let timerInterval;
    let isRunning = false;
    let minutes = 25;
    let seconds = 0;

    function updateTimerDisplay() {
        const timerDisplay = document.getElementById('timer-display');
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function startTimer() {
        timerInterval = setInterval(function () {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    document.getElementById('start-stop-button').textContent = 'Start';
                    alert('Time is up!');
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateTimerDisplay();
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        minutes = 25;
        seconds = 0;
        updateTimerDisplay();
        document.getElementById('start-stop-button').textContent = 'Start';
    }

    document.getElementById('start-stop-button').addEventListener('click', function () {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
            this.textContent = 'Start';
        } else {
            startTimer();
            isRunning = true;
            this.textContent = 'Stop';
        }
    });

    document.getElementById('reset-button').addEventListener('click', function () {
        resetTimer();
    });

    // Initialize timer display
    updateTimerDisplay();
});
