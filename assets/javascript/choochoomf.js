// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCkRcScnnP_VIcB2SbOLjUgYhFZ2PNjHC0",
    authDomain: "choochoo-4f59e.firebaseapp.com",
    databaseURL: "https://choochoo-4f59e.firebaseio.com",
    projectId: "choochoo-4f59e",
    storageBucket: "",
    messagingSenderId: "231884047913",
    appId: "1:231884047913:web:bc349e1e73727050"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("hh:mm");
    var trainRate = $("#rate-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDest,
        start: trainStart,
        rate: trainRate
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.rate);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
});