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
        if (currentVotes === null) {
            currentVotes = {};
        }
        currentVotes[character] = (currentVotes[character] || 0) + 1;
        return currentVotes;
    }).then(function() {
        // Trigger the pop-up animation for the voted character
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

// Initialization
var previousVotes = {floki: 0, pepe: 0};
document.getElementById('floki-vote').addEventListener('click', function() {
    vote('floki');
});
document.getElementById('pepe-vote').addEventListener('click', function() {
    vote('pepe');
});

