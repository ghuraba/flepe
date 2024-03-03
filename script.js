window.onload = function() {
    const dbRef = firebase.database().ref('votes');
    dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        const flokiVotes = data.floki || 0;
        const pepeVotes = data.pepe || 0;
        updateProgressBars(flokiVotes, pepeVotes);
    });
};

function vote(option) {
    const dbRef = firebase.database().ref('votes');
    dbRef.transaction((currentData) => {
        if (option === 'floki') {
            return { ...currentData, floki: (currentData.floki || 0) + 1 };
        } else if (option === 'pepe') {
            return { ...currentData, pepe: (currentData.pepe || 0) + 1 };
        }
        return currentData;
    });
}

function updateProgressBars(flokiVotes, pepeVotes) {
    const totalVotes = flokiVotes + pepeVotes;
    const flokiPercentage = (flokiVotes / totalVotes) * 100;
    const pepePercentage = (pepeVotes / totalVotes) * 100;

    document.getElementById('floki-progress').style.width = `${flokiPercentage}%`;
    document.getElementById('pepe-progress').style.width = `${pepePercentage}%`;
}
