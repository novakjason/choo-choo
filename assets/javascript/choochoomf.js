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

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainRate = childSnapshot.val().rate;

    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log(trainRate);

    // Train Start (pushed back 1 year to make sure it comes before current time)
    var trainStartConverted = moment(trainStart, "HH:mm").subtract(1, "years");
    console.log(trainStartConverted);

    // Variable to hold current time
    var currentTime = moment();
    console.log("Current time: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trainStartConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainRate;
    console.log(tRemainder);

    // Minutes until train arrives
    var minutesAway = trainRate - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next time train arrives displayed in standard time.
    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm A"));

    // Creates the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainRate),
        $("<td>").text(moment(nextArrival).format("hh:mm A")),
        $("<td>").text(minutesAway)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});