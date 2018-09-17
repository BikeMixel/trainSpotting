// firebase
var database = firebase.database();

// submit fun
$("#frmSubmit").on("click", function(event) {
  event.preventDefault();

  var name = $("#trainName")
    .val()
    .trim();
  var dest = $("#trainDest")
    .val()
    .trim();
  var freq = $("#trainFreq")
    .val()
    .trim();
  var start = $("#trainStart")
    .val()
    .trim();

  $("#trainName").val("");
  $("#trainDest").val("");
  $("#trainFreq").val("");
  $("#trainStart").val("");

  var time = moment().format("HH:mm");
  console.log("time " + time)
  var startTime = moment(start, "HH:mm").format("HH:mm");
  console.log("start " + startTime)
  var difference = moment().diff(moment(startTime, "HH:mm"), "minutes");
  console.log("diff " + difference)
  var leftOver = difference % freq;
  console.log("leftOver " + leftOver)
  var arrival = freq - leftOver;
  console.log("arrival " + arrival)
  var next = moment().add(arrival, "minutes");
  console.log("next " + next)
  var nextFormat = moment(next, "HH:mm").format("HH:mm");
  console.log(nextFormat)

  database.ref().push({
    userName: name,
    userDest: dest,
    userFreq: freq,
    userStart: start,
    arrival: arrival,
    next: nextFormat
  });
});

database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
    populate(snapshot.val());
  });

// append data to table from firebase, create new <td>s
var addData = function(input, target) {
  var newTD = $("<td>");
  $(newTD).text(input);
  $(newTD).appendTo(target);
};

var populate = function(output) {
  var newRow = $("<tr>");
  addData(output.userName, newRow);
  addData(output.userDest, newRow);
  addData(output.userFreq, newRow);
  addData(output.next, newRow);
  addData(output.arrival, newRow);
  $(newRow).appendTo($("#tableBody"));
};

