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

// Function to update the progress bar
function updateProgressBar() {
    database.ref('votes').on('value', function(snapshot) {
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
            document.getElementById('floki-votes').textContent = flokiVotes;
            document.getElementById('pepe-votes').textContent = pepeVotes;
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
});

document.getElementById('pepe-vote').addEventListener('click', function() {
    vote('pepe');
});

// Initial load
updateProgressBar();
