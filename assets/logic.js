 	var config = {
    apiKey: "AIzaSyCCSgCLKQQsF5a9ghwPOJ4VdylSGsxE5Hk",
    authDomain: "trains-1f052.firebaseapp.com",
    databaseURL: "https://trains-1f052.firebaseio.com",
    projectId: "trains-1f052",
    storageBucket: "trains-1f052.appspot.com",
    messagingSenderId: "381082659339"
	};
    
    firebase.initializeApp(config);

	var database = firebase.database();

// submit button on click function for capturing user input
	$("#add-train-btn").on("click", function(){
	var trainName = $("#name-input").val().trim();
	var trainDest = $("#dest-input").val().trim();
	var trainFirst = $("#first-input").val().trim();
	var trainFreq = $("#freq-input").val().trim();

// storing variable for new train and pushing to database
	var newTrain = {
		name: trainName,
		dest: trainDest,
		first: trainFirst,
		freq: trainFreq,
	}

	database.ref().push(newTrain);

// emptying forms
	$("#name-input").val("");
	$("#dest-input").val("");
	$("#first-input").val("");
	$("#freq-input").val("");

	console.log(newTrain.name);
	console.log(newTrain.dest);
	console.log(newTrain.first);
	console.log(newTrain.freq);

// making it so the page won't refresh
	return false;
	});

// function for capturing the values of added children in the database
	database.ref().on("child_added", function(childSnapshot, prevChildKey){

	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().dest;
	var trainFirst = childSnapshot.val().first;
	var trainFreq = childSnapshot.val().freq;

	console.log(trainName);
	console.log(trainDest);
	console.log(trainFirst)
	console.log(trainFreq);

// variable using moment.js for calculating first train time
	var firstTime = moment(trainFirst, "hh:mm").subtract(1, "days");
	
// building variables using moment.js that calculate the next train time by calculating the time difference in current and first times
	var diff = moment().diff(moment(firstTime), "minutes");

// creating another variable using the time difference and train frequency to calculate the remainder
	var remainder = diff % trainFreq;

// creating another variable to calculate the time until train
	var minsAway = trainFreq - remainder;
	console.log("Minutes away: " + minsAway);

// final variable for next train time which adds the current time to time until train
	var nextArrival = moment().add(minsAway, "minutes");
	console.log("Next arrival: " + moment(nextArrival).format("hh:mm"));

// appending the values of the trains to the train table
	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + minsAway + "</td><td>" + moment(nextArrival).format("hh:mm"));
	});