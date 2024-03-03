// script.js
var config = {
    apiKey: "AIzaSyDpsobzDm9421BbdvPDOInoZJf672FeZfw",
    authDomain: "flepe-6dc02.firebaseapp.com",
    databaseURL: "https://flepe-6dc02-default-rtdb.firebaseio.com",
    projectId: "flepe-6dc02",
    storageBucket: "flepe-6dc02.appspot.com",
    messagingSenderId: "1026810643781",
    appId: "1:1026810643781:web:ebdcd85be2dd41c8d4ea2c"
};
firebase.initializeApp(config);

var database = firebase.database();

function animateProgressBar(progressBar, duration, targetWidth) {
    let progress = 0;
    const increment = targetWidth / duration * 100; // Adjust the increment value for desired smoothness
    const interval = setInterval(() => {
        progress += increment;
        progressBar.style.width = `${progress}%`;
        if (progress >= targetWidth) {
            clearInterval(interval);
        }
    }, 10); // Adjust the interval duration for desired speed
}

function updateProgressBar() {
    database.ref('votes').once('value', function(snapshot) {
        var votes = snapshot.val();
        var flokiVotes = votes.floki || 0;
        var pepeVotes = votes.pepe || 0;
        var totalVotes = flokiVotes + pepeVotes;
        
        if (totalVotes > 0) {
            var flokiPercentage = (flokiVotes / totalVotes) * 100;
            var pepePercentage = (pepeVotes / totalVotes) * 100;
            
            // Update Floki bar
            var flokiBar = document.getElementById('floki-bar');
            flokiBar.style.width = flokiPercentage + '%';
            flokiBar.setAttribute('data-full', flokiPercentage >= 100);
            
            // Update Pepe bar
            var pepeBar = document.getElementById('pepe-bar');
            pepeBar.style.width = pepePercentage + '%';
            pepeBar.setAttribute('data-full', pepePercentage >= 100);
        }
    });
}



// Function to handle voting
function vote(character) {
    var votesRef = database.ref('votes');
    votesRef.transaction(function(currentVotes) {
        if (currentVotes === null) {
            currentVotes = {};
        }
        currentVotes[character] = (currentVotes[character] || 0) + 1;
        return currentVotes;
    });
}

// Event listeners for voting buttons
document.getElementById('floki-vote').addEventListener('click', function() {
    vote('floki');
    updateProgressBar();
});

document.getElementById('pepe-vote').addEventListener('click', function() {
    vote('pepe');
    updateProgressBar();
});

// Initial load
updateProgressBar();
