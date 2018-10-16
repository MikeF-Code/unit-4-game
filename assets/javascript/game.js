// Character objects
var QGJ = {
    name: "Qui-Gon Jinn",
    hp: 120,
    atk: 10,
    // Counter Attack value
    ca: 10,
    // Character's picture
    // Alive/Dead
    dead: false,
    enemyIndex: -1,
}

var yoda = {
    name: "Yoda",
    hp: 100,
    atk: 15,
    // Counter Attack value
    ca: 15,
    // Character's picture
    // Alive/Dead
    dead: false,
    enemyIndex: -1,
}

var KAM = {
    name: "Ki-Adi Mundi",
    hp: 110,
    atk: 8,
    // Counter Attack value
    ca: 10,
    // Character's picture
    // Alive/Dead
    dead: false,
    enemyIndex: -1,
}

var plo = {
    name: "Plo Koon",
    hp: 140,
    atk: 5,
    // Counter Attack value
    ca: 20,
    // Character's picture
    // Alive/Dead
    dead: false,
    enemyIndex: -1,
}
// Globals
var characterArray = [QGJ, yoda, KAM, plo];
var playerChar;
var playerCharID = -1;
var enemies = [];
var currentEnemyID = -1;

//Functions

    // Game Start
function gameStart() {
    console.log("gameStart() begins");
    console.log("------------------");
    $("#playerSelect").hide();
    $("#enemySelect").hide();
    for (var i=0; i < characterArray.length; i++) {
        var character = $("<div>");
        character.addClass("col-2 border charSel");
        character.text(characterArray[i].name);
        console.log("Outputting name " + characterArray[i].name + " to #characterSelect.");
        $("#characterSelect").append(character);
      };
      console.log("gameStart() ends");
};

// Game logic
gameStart();

    // Character Select - after player clicks on the character of their choosing, have the character select div disappear and display the player vs enemy UI in its place
$(".charSel").on("click", function() {
    console.log("Character select on-click function is firing!");
    $("#characterSelect").hide();
    $("#playerSelect").show();
    $("#enemySelect").show();
    var debugThis = $(this);
    console.log("Current value of THIS is: ");
    console.log(debugThis);
    playerCharID = $.inArray($(this), characterArray);
    console.log("Current value of playerCharID is "+playerCharID);
    playerChar = characterArray[playerCharID];
});