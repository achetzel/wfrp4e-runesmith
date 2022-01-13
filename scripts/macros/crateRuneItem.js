// Setup test parameters
let luckyDude = "Sergeant Dwarf";
let targetTalent = "Inscribe Rune";
let targetSkill = "Empower Rune";
let targetInscriptionNum = 15;
let targetEmpowerNum = 5;

// Obj to keep track of all the stages and their time variables
var runeTimes = {
  temporary: {
    inscribe: {increment: "minute", range:"2d10"},
    empower: {increment: "minute", range: 20},
    bind: {increment: "minute", range: "1d10"}
  },
  permanent: {
    inscribe: {increment: "week", range: 1},
    empower: {increment: "month", range: 1},
    bind: {increment: "day", range: "1d10"}
  }
};

// Setup dialog to see which type of rune the player is creating
let dialogRuneType = await new Promise((resolve, reject) => {
  new Dialog({
    title: "Create Runic Item",
    content: "<p>Which type of rune are you attempting to make?</p>",
    buttons: {
      temp: {
        label: "Temporary",
        callback: () => {
          resolve({type: "temporary"});
        }
      },
      perm: {
        label: "Permanent",
        callback: () => {
          resolve({type: "permanent"});
        }
      },
    }
  }).render(true);
});

// Search for character by name then isolate his talent and its ranks.
// Generate the dice to be rolled for Inscribe Test from that rank.
let charData = Array.from(game.actors).filter(a => a.name == luckyDude);
let charItems = charData[0].data.items;
let hasTalent = Array.from(charItems).filter(b => b.type == "talent" && b.name == targetTalent);
let talentRanks = hasTalent.length;
let inscribeDice = talentRanks + "d10";

// Use existing search to also isolate the appropriate skill
let hasSkill = Array.from(charItems).filter(c => c.type == "skill" && c.name == targetSkill);
let skillLevel = hasSkill[0].data.data.total.value;

let thePinch = await inscribeTime(dialogRuneType.type, inscribeDice);
console.log(thePinch);
let thePain = await empowerTime(dialogRuneType.type, skillLevel);
console.log(thePain);
let theSalt = await bindTime(dialogRuneType.type);
console.log(theSalt);

async function inscribeTime(type, dice) {
  let timeIncrement = runeTimes[type].inscribe.increment;
  let timeRange = runeTimes[type].inscribe.range;
  var timeIncrementResult = 0;
  var rollResult = 0;
  var attempts = 0;
  var attemptRecord = [];
  var totalTime = 0;

  // Keep doing it until we succeed
  while (rollResult < targetInscriptionNum) {
    // How much time will this attempt take?
    if (typeof timeRange === "string") {
      let incrementRoll = await new Roll(timeRange).roll(async=true);
      timeIncrementResult = incrementRoll.total;
    } else {
      timeIncrementResult = timeRange;
    }
    // Make the attempt
    let inscribeTest = await new Roll(dice).roll(async=true);
    rollResult = inscribeTest.total;

    // Failure = start from scratch
    let tempAttempt = {};
    tempAttempt["success"] = true;
    tempAttempt["rollResult"] = rollResult;
    tempAttempt["time"] = timeIncrementResult;

    if (rollResult < targetInscriptionNum) {
      rollResult = 0;
      tempAttempt["success"] = false;
    }

    attemptRecord.push(tempAttempt);
    totalTime += timeIncrementResult;
    attempts += 1;
  }

  return {
    attempts: attemptRecord,
    timeIncrement: timeIncrement,
    totalTime: totalTime
  }
}

async function empowerTime(type, skillValue) {
  let timeIncrement = runeTimes[type].empower.increment;
  let timeRange = runeTimes[type].empower.range;
  var timeIncrementResult = 0;
  var attempts = 0;
  var attemptRecord = [];
  var successLevel = 0;
  var totalTime = 0;

  // Keep going until targetEmpowerNum is met
  while (successLevel < targetEmpowerNum) {

    // How much time will this attempt take?
    if (typeof timeRange === "string") {
      let incrementRoll = await new Roll(timeRange).roll(async=true);
      timeIncrementResult = incrementRoll.total;
    } else {
      timeIncrementResult = timeRange;
    }

    // Make the attempt
    let empowerTest = await new Roll("1d100").roll(async=true);
    let rollResult = empowerTest.total;

    // evaluate the attempt and determine success levels if needed
    let tempAttempt = {};
    tempAttempt["rollResult"] = rollResult;
    tempAttempt["time"] = timeIncrementResult;

    if (rollResult <= skillValue) {
      let calcSL = Math.trunc((skillValue - rollResult) / 10);
      if (calcSL == 0) {calcSL = 1;}
      successLevel += calcSL;
      tempAttempt["success"] = true;
      tempAttempt["SL"] = calcSL;
    } else {
      tempAttempt["success"] = false;
      tempAttempt["SL"] = 0;
    }
    attemptRecord.push(tempAttempt);
    attempts += 1;
    totalTime += timeIncrementResult;
  }

  return {
    attempts: attemptRecord,
    timeIncrement: timeIncrement,
    totalTime: totalTime
  }
}

async function bindTime(type) {
  let timeIncrement = runeTimes[type].bind.increment;
  let timeRange = runeTimes[type].bind.range;

  // How much time will this take?
  if (typeof timeRange === "string") {
    let incrementRoll = await new Roll(timeRange).roll(async=true);
    totalTime = incrementRoll.total;
  } else {
    totalTime = timeRange;
  }

  return {
    timeIncrement: timeIncrement,
    totalTime: totalTime
  }
}

async function calcTotalTime(inscribe, empower, bind) {
  let units = {
    minute: 1,
    day: 24 * 60,
    week: 7 * 24 * 60,
    month: 30 * 24 * 60 // assume 30days,
  };

}