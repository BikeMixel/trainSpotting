// firebase 
var database = firebase.database()
// submit fun

$("#frmSubmit").on("click", function (event) {
    event.preventDefault()

    var name = $("#trainName").val().trim()
    var dest = $("#trainDest").val().trim()
    var freq = $("#trainFreq").val().trim()
    var start= $("#trainStart").val().trim()

    $("#trainName").val("")
    $("#trainDest").val("")
    $("#trainFreq").val("")
    $("#trainStart").val("")

var time = moment().format("HH:mm")
console.log(time)
var startTime = moment(start, "HH:mm").format("HH:mm")
console.log("startTime " + startTime)
var difference = moment().diff(moment(startTime, "HH:mm"), "minutes")
console.log("difference " + difference)
var minLeft = difference % freq
console.log("minLeft " + minLeft)

    database.ref().push({
        userName: name,
        userDest: dest,
        userFreq: freq,
        userNext: start,
        minLeft: minLeft
    })
})

database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
    populate(snapshot.val())
})

// append data to table from firebase, create new <td>s 
var addData = function (input, target) {
    var newTD = $("<td>")
    $(newTD).text(input)
    $(newTD).appendTo(target)
}

var populate = function (output) {
    var newRow = $("<tr>");
    addData(output.userName, newRow)
    addData(output.userDest, newRow)
    addData(output.userFreq, newRow)
    addData("Sasdfas", newRow)
    addData(output.minLeft, newRow)
    $(newRow).appendTo($("#tableBody"))
}

// use moment for time calc.. 2-3 fns max


// var startTest = 2200
// var time = moment().format("HH:mm")
// console.log(time)
// var startTime = moment(startTest, "HH:mm").format("HH:mm")
// console.log("startTime " + startTime)
// var difference = moment().diff((startTime), "minutes") % userFreq.freq
// console.log("difference " + difference)

