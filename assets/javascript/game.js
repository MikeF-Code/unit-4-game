// Character objects
var QGJ = {
    name: "Qui-Gon Jinn",
    hp: 120,
    baseatk: 10,
    atk: 10,
    // Counter Attack value
    ca: 10,
    // Character's picture
    enemyIndex: -1,
    charID: 0,
}

var yoda = {
    name: "Yoda",
    hp: 100,
    baseatk: 10,
    atk: 10,
    // Counter Attack value
    ca: 15,
    // Character's picture
    enemyIndex: -1,
    charID: 1,
}

var KAM = {
    name: "Ki-Adi Mundi",
    hp: 110,
    baseatk: 8,
    atk: 8,
    // Counter Attack value
    ca: 8,
    // Character's picture
    enemyIndex: -1,
    charID: 2,
}

var plo = {
    name: "Plo Koon",
    hp: 140,
    baseatk: 5,
    atk: 5,
    // Counter Attack value
    ca: 15,
    // Character's picture
    enemyIndex: -1,
    charID: 3,
}
// Globals
var characterArray = [QGJ, yoda, KAM, plo];
var playerChar;
var playerCharID = -1;
var enemies = [];
var currentEnemyID = -1;

//Functions

    // Game Start function
function gameStart() {
    console.log("gameStart() begins");
    $("#playerSelect").hide();
    $("#enemySelect").hide();
    for (var i=0; i < characterArray.length; i++) {
        var character = $("<div>");
        character.addClass("col-2 border charSel");
        character.html("<span id="+characterArray[i].name+">"+characterArray[i].name+"</span><br><span>HP: "+characterArray[i].hp+"</span>");
        character.attr("data-charID", i);
        console.log("Outputting name " + characterArray[i].name + " to #characterSelect.");
        $("#characterSelect").append(character);
      };
      console.log("gameStart() ends");
      console.log("------------------");
};
// Game logic
gameStart();

    // Character Select - after player clicks on the character of their choosing, have the character select div disappear and display the player vs enemy UI in its place
$("#characterSelect").on("click", ".charSel", function() {
    console.log("Character select on-click function is firing!");
    // UI change from character select to enemy select
    $("#characterSelect").hide(900);
    $("#chooseChar").hide(900);
    $("#playerSelect").show(1200);
    $("#enemySelect").show(1200);
    // Identify selected character object and store index of object and object itself to global variables
    playerCharID = $(this).attr("data-charID");
    console.log("Current value of playerCharID is "+playerCharID);
    playerChar = characterArray[playerCharID];
    console.log("playerChar is: ");
    console.log(playerChar);
    console.log("playerChar.name is: "+playerChar.name);
    console.log("-------------------");
    // Inject HTML to page to show your selected character
    var playerSelect = $(".playerSel");
    playerSelect.addClass("border");
    playerSelect.html("<span id="+playerChar.name+">"+playerChar.name+"</span><br><span>HP: "+playerChar.hp+"</span>");
    $("#playerSelect").append(playerSelect);
    // Update `enemies` array with list of character objects that was NOT selected
    enemies = characterArray;
    enemies.splice(playerCharID, 1);
    console.log("Current enemies array:");
    console.log(enemies);
    console.log("----------------");
    // Inject HTML to page to show enemy select
    for (var i = 0; i < enemies.length; i++) {
        var enemy = $("<div>");
        enemy.addClass("border enemySel");
        enemy.html("<span id="+enemies[i].name+">"+enemies[i].name+"</span><br><span>HP: "+enemies[i].hp+"</span>");
        enemy.attr("data-enemyID", i);
        console.log("Outputting name " + enemies[i].name + " to #enemySelect.");
        $("#enemy"+i).append(enemy);
    };
    console.log("Character select on-click function complete.")
    console.log("------------------------");
});
    // Enemy Select - After character is chosen, user selects 1 of 3 enemies to fight.  Once enemy is selected, other enemies should become translucent and unclickable until current enemy is defeated.
$("#enemySelect").on("click", ".enemySel", function() {
    if (currentEnemyID === -1) {
        console.log("Enemy select on-click function is firing!");
        currentEnemyID = $(this).attr("data-enemyID");
        console.log("currentEnemyID is now: "+currentEnemyID);
        currentEnemyID = parseInt(currentEnemyID);
        console.log("currentEnemyID's variable type is: "); 
        console.log(typeof currentEnemyID);
        $("#enemy"+currentEnemyID).addClass("border bg-danger");
        } else {

        }
    });
    // Attack Button functionality
$("#attackButton").click( function() {
    if (currentEnemyID >= 0 && enemies[currentEnemyID].hp > 0) {
        // Recalculate enemy and player HP
        enemies[currentEnemyID].hp = enemies[currentEnemyID].hp - playerChar.atk;
        playerChar.hp = playerChar.hp - enemies[currentEnemyID].ca;
        console.log("Player has HP of "+playerChar.hp);
        // Redraw player element to show updated HP value
        $(".playerSel").html("<span id="+playerChar.name+">"+playerChar.name+"</span><br><span>HP: "+playerChar.hp+"</span>");
        console.log("Current enemy "+enemies[currentEnemyID].name+" has HP of "+enemies[currentEnemyID].hp);
        // Redraw selected enemy element to show updated HP value
        $("#enemy"+currentEnemyID).addClass("border")
        $("#enemy"+currentEnemyID).html("<span id="+enemies[currentEnemyID].name+">"+enemies[currentEnemyID].name+"</span><br><span>HP: "+enemies[currentEnemyID].hp+"</span>");
        $("#combatData").html("<span>You attacked for "+playerChar.atk+" points of damage!</span><br><span>"+enemies[currentEnemyID].name+" counter attacks for "+enemies[currentEnemyID].ca+" points of damage!</span>");
        // Recalculate player ATK value
        playerChar.atk = playerChar.atk + playerChar.baseatk;
        console.log("Updated Player atk value to "+playerChar.atk);
        // If enemy HP is less than 0, hide the element and reset currentEnemyID to force player to select new enemy and prevent further combat with "dead" enemy
        if (enemies[currentEnemyID].hp <= 0) {
            console.log(enemies[currentEnemyID].name+" is defeated!");
            $("#enemy"+currentEnemyID).hide(400);
            currentEnemyID = -1;
        }
    } else {
        $("#attackButton").click( function() {
        alert("Please select a living enemy to fight!");
        });
    }
});