import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyDpsobzDm9421BbdvPDOInoZJf672FeZfw",
  authDomain: "flepe-6dc02.firebaseapp.com",
  databaseURL: "https://flepe-6dc02-default-rtdb.firebaseio.com",
  projectId: "flepe-6dc02",
  storageBucket: "flepe-6dc02.appspot.com",
  messagingSenderId: "1026810643781",
  appId: "1:1026810643781:web:ebdcd85be2dd41c8d4ea2c",
  measurementId: "G-VW9GYGRB72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.onload = function() {
    const votesRef = ref(db, 'votes');
    onValue(votesRef, (snapshot) => {
        const data = snapshot.val();
        const flokiVotes = data.floki || 0;
        const pepeVotes = data.pepe || 0;
        updateProgressBars(flokiVotes, pepeVotes);
    });
};

function vote(option) {
    const votesRef = ref(db, 'votes');
    set(votesRef, {
        floki: option === 'floki' ? (data.floki || 0) + 1 : data.floki,
        pepe: option === 'pepe' ? (data.pepe || 0) + 1 : data.pepe
    });
}

function updateProgressBars(flokiVotes, pepeVotes) {
    const totalVotes = flokiVotes + pepeVotes;
    const flokiPercentage = (flokiVotes / totalVotes) * 100;
    const pepePercentage = (pepeVotes / totalVotes) * 100;

    document.getElementById('floki-progress').style.width = `${flokiPercentage}%`;
    document.getElementById('pepe-progress').style.width = `${pepePercentage}%`;
}
