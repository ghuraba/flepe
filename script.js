// Initialize Firebase
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

// Function to cast a vote
function vote(character) {
    var votesRef = database.ref('votes');
    votesRef.transaction(function(currentVotes) {
@@ -20,68 +20,46 @@ function vote(character) {
        }
        currentVotes[character] = (currentVotes[character] || 0) + 1;
        return currentVotes;
        console.log("currentVotes: " + currentVotes);
    }).then(function() {
        // Trigger the pop-up animation for the voted character
         var popupElementId = character + '-vote-popup';
    var popupElement = document.getElementById(popupElementId);
    if (popupElement) {
        popupElement.style.display = 'block'; // Make it visible
        popupElement.classList.add('show'); // Add the show class for animation
        setTimeout(function() {
            popupElement.style.display = 'none'; // Hide after animation
            popupElement.classList.remove('show'); // Remove the show class
        }, 1000); // Duration of the pop-up animationn
        var popupElementId = character + '-vote-popup';
        var popupElement = document.getElementById(popupElementId);
        if (popupElement) {
            popupElement.style.display = 'block';
            popupElement.classList.add('show');
            setTimeout(function() {
                popupElement.style.display = 'none';
                popupElement.classList.remove('show');
            }, 1000); // Duration of the pop-up animation
        }
    });
}

// Listen for changes in the database to trigger pop-ups for all users
database.ref('votes').on('value', function(snapshot) {
    var votes = snapshot.val();
    // Trigger pop-ups for all users based on the updated votes
    if (votes.floki > previousVotes.floki) {
        document.getElementById('floki-vote-popup').classList.add('show');
        setTimeout(function() {
            document.getElementById('floki-vote-popup').classList.remove('show');
        }, 1000);
    }
    if (votes.pepe > previousVotes.pepe) {
        document.getElementById('pepe-vote-popup').classList.add('show');
        setTimeout(function() {
            document.getElementById('pepe-vote-popup').classList.remove('show');
        }, 1000);
    }
    previousVotes = votes; // Update previousVotes for future comparisons
});

function updateProgressBar() {
    database.ref('votes').on('value', function(snapshot) {
        console.log("ardi2")
        var votes = snapshot.val();
        var flokiVotes = votes.floki || 0;
        var pepeVotes = votes.pepe || 0;
        var totalVotes = flokiVotes + pepeVotes;

        if (totalVotes > 0) {
            var flokiPercentage = (flokiVotes / totalVotes) * 100;
            var pepePercentage = (pepeVotes / totalVotes) * 100;

            document.getElementById('floki-bar').style.width = flokiPercentage + '%';
            document.getElementById('pepe-bar').style.width = pepePercentage + '%';

            // Update vote counts
            document.getElementById('floki-vote-count').textContent = 'Votes for Floki: ' + flokiVotes;
            document.getElementById('pepe-vote-count').textContent = 'Votes for Pepe: ' + pepeVotes;

             // Calculate the average position of the image
            var averagePercentage = flokiPercentage;
            console.log("flokiPercentage: " + flokiPercentage);
            console.log("pepePercentage: " + pepePercentage);
            var progressBarWidth = document.getElementById('progressBar').offsetWidth;
            console.log("progressBarWidth: " + progressBarWidth);
            var imagePositionPixels = (averagePercentage * progressBarWidth) / 100;
            console.log("imagePositionPixels: " + imagePositionPixels);
            console.log("averagePercentage: " + averagePercentage);
            // Update the position of the image
            const voting = document.getElementById('voting-image').style.left = imagePositionPixels + 'px';

            console.log("voting-image: " + voting);

        }
    });
}

// Event listeners for voting buttons
// Initialization
var previousVotes = {floki: 0, pepe: 0};
document.getElementById('floki-vote').addEventListener('click', function() {
    vote('floki');
});

document.getElementById('pepe-vote').addEventListener('click', function() {
    vote('pepe');
});

// Initial load
updateProgressBar();
