const terranMusic = [
    "audio/terran/music/ndlc02_music_cue02.wav",
    "audio/terran/music/zswarm_music_cutscenemoment2.wav",
    "audio/terran/music/the_rescue_full.wav",
    "audio/terran/music/ndlc03_music_cuecutscene040.wav",
    "audio/terran/music/terransc2-05.wav",
    "audio/terran/music/terransc2-04.wav",
    "audio/terran/music/zswarm_music_darkvictory_livefull.wav",
    "audio/terran/music/zswarm_music_gs_terran9.wav",
    "audio/terran/music/sc1_terran4.wav",
    "audio/terran/music/terransc2-03.wav",
    "audio/terran/music/zswarm_music_inspirational_livefull.wav",
    "audio/terran/music/sc1_terran1.wav",
    "audio/terran/music/terransc2-02.wav",
    "audio/terran/music/ndlc03_music_cue01.wav",
    "audio/terran/music/sc1_terran3.wav",
    "audio/terran/music/sc1_terran2.wav",
    "audio/terran/music/terransc2-01.wav",
    "audio/terran/music/ndlc01_music_cue10.wav",
    "audio/terran/music/zswarm_music_sadominouslivefull.wav",
    "audio/terran/music/zswarm_music_gs terran8.wav",
    "audio/terran/music/ndlc01_music_cue03.wav",
    "audio/terran/music/zswarm_music_terran6.wav",
    "audio/terran/music/zswarm_music_terran7_action.wav",
    "audio/terran/music/ndlc02_music_cue08.wav",
    "audio/terran/music/zswarm_music_cutscenemoment2_ambient.wav",
    "audio/terran/music/zswarm_music_lowtensioninspirationallivealt.wav",
    "audio/terran/music/zswarm_music_titan_full.wav",
];

const protossMusic = [
    "audio/protoss/music/protosssc2-02.wav",
    "audio/protoss/music/protosssc2-03.wav",
    "audio/protoss/music/protosssc2-01.wav",
    "audio/protoss/music/protosssc2-04.wav",
    "audio/protoss/music/protosssc2-05.wav",
    "audio/protoss/music/protosssc2-07.wav",
    "audio/protoss/music/protosssc2-06.wav",
    "audio/protoss/music/music_protosstakekievh.wav",
    "audio/protoss/music/sc1_protoss4.wav",
    "audio/protoss/music/sc1_protoss3.wav",
    "audio/protoss/music/sc1_protoss2.wav",
    "audio/protoss/music/sc1_protoss1.wav",
]

const zergMusic = [
    "audio/zerg/music/zergsc2-06.wav",
    "audio/zerg/music/sc1_zerg3.wav",
    "audio/zerg/music/sc1_zerg2.wav",
    "audio/zerg/music/zergsc2-07.wav",
    "audio/zerg/music/zergsc2-05.wav",
    "audio/zerg/music/sc1_zerg1.wav",
    "audio/zerg/music/zergsc2-04.wav",
    "audio/zerg/music/sc1_zerg4.wav",
    "audio/zerg/music/zergsc2-01.wav",
    "audio/zerg/music/zergsc2-03.wav",
    "audio/zerg/music/zergsc2-02.wav",
    "audio/zerg/music/music_zergrolloutd.wav",
    "audio/zerg/music/zergsc2-09.wav",
    "audio/zerg/music/zsm_zergadjutant_prekorhal01.wav",
    "audio/zerg/music/zergsc2-08.wav",
    "audio/zerg/music/zerg_intro_album_mix.wav",
]

let currentAudioIndex = 0;

let isPlaying = false;
let currentMusicCollection = terranMusic;
const audioPlayer = document.getElementById('audioPlayer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const nextButton = document.getElementById('next'); // Get the Next button
const musicCollectionDropdown = document.getElementById('musicCollection');

startButton.addEventListener('click', () => {
    if (!isPlaying) {
        isPlaying = true;
        playAudio();
    }
});

pauseButton.addEventListener('click', () => {
    isPlaying = false;
    audioPlayer.pause();
});

nextButton.addEventListener('click', () => {
    playAudio();
});

audioPlayer.addEventListener('ended', () => {
    if (isPlaying) {
        playAudio();
    }
});

musicCollectionDropdown.addEventListener('change', (event) => {
    switch (event.target.value) {
        case 'terran':
            currentMusicCollection = terranMusic;
            break;
        case 'protoss':
            currentMusicCollection = protossMusic;
            break;
        case 'zerg':
            currentMusicCollection = zergMusic;
            break;
    }
    if (isPlaying) {
        playAudio();
    }
});

function playAudio() {
    let newAudioIndex;
    do {
        newAudioIndex = Math.floor(Math.random() * currentMusicCollection.length);
    } while (newAudioIndex === currentAudioIndex);

    currentAudioIndex = newAudioIndex;
    audioPlayer.src = currentMusicCollection[currentAudioIndex];
    audioPlayer.play();
    updateTrackName();
}

function updateTrackName() {
    const trackNameElement = document.getElementById('trackName');
    const currentTrackPath = currentMusicCollection[currentAudioIndex];
    const currentTrackName = currentTrackPath.split('/').pop();
    trackNameElement.textContent = currentTrackName;
    toggleVisibility();
}

function toggleVisibility() {
    const currentDiv = document.querySelector('.current');
    const audioPlayer = document.getElementById('audioPlayer');
    const trackNameElement = document.getElementById('trackName');
    if (trackNameElement.textContent.trim() === '') {
        currentDiv.style.display = 'none';
        audioPlayer.style.display = 'none';
    } else {
        currentDiv.style.display = 'flex';
        audioPlayer.style.display = 'block';
    }
}

// Add this code to handle F9 key press
document.addEventListener('keydown', function (event) {
    if (event.key === 'F9') {

        document.getElementById('next').click();
    }
});