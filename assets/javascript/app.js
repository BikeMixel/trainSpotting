// firebase 
var database = firebase.database()

// submit fun
$("#frmSubmit").on("click", function(event){
    event.preventDefault()

    var name = $("#trainName").val().trim()
    var dest = $("#trainDest").val().trim()
    var freq = $("#trainFreq").val().trim()
    var next = $("#trainNext").val().trim()

    $("#trainName").val("")
    $("#trainDest").val("")
    $("#trainFreq").val("")
    $("#trainNext").val("")

    database.ref().push({
        userName: name,
        userDest: dest,
        userFreq: freq,
        userNext: next
    })
})

database.ref().orderByChild("dateAdded").on("child_added", function(snapshot){
    populate(snapshot.val())
})

// append data to table from firebase, create new <td>s 
var addTD = function(input, target) {
    var newTD = $("<td>");
    $(newTD).text(input);
    $(newTD).appendTo(target)
   }
   
var populate = function(output) {
    var newRow = $("<tr>");
    addTD(output.userName, newRow)
    addTD(output.userDest, newRow)
    addTD(output.userFreq, newRow)
    //  need an fn for this one, dont paste this data 
    //  addTD("Minutes Left: " + output.userNext, newRow)
    $(newRow).appendTo($("#tableBody"))
}

// use moment for time calc.. 2-3 fns max