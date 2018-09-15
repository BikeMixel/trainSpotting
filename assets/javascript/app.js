// firebase 
    var database = firebase.database()

// submit fun
$("#frmSubmit").on("click", function(event){
    event.preventDefault()

    var name = $("#trainName").val().trim()
    console.log($("#trainName").val().trim())
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
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
    popData(snapshot.val())
})

// append data to table from firebase, create new <td>s 
var addTD = function(data, target) {
    var newTD = $('<td>');
    $(newTD).text(data);
    $(newTD).appendTo(target)
   }
   
   var popData = function(dataSet) {
    var newRow = $('<tr>');
    addTD(dataSet.userName, newRow)
    addTD(dataSet.userDest, newRow)
    addTD(dataSet.userFreq, newRow)
    addTD("Minutes Left: " + dataSet.userNext, newRow)
    $(newRow).appendTo($("#tableBody"))
}