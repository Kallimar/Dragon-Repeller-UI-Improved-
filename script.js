// let xp = 0;
// let health = 100;
// gold = 50;
// let currentWeapon = 0;
// let fighting;
// let monsterHealth;
// let inventory = ["Stick"];

// const button1 = document.querySelector('#button1');
// const button2 = document.querySelector('#button2');
// const button3 = document.querySelector('#button3');
// const text = document.getElementById('text');
// const xptext = document.querySelector('#xpText');
// const healthText = document.querySelector('#healthText');
// const goldText = document.querySelector('#goldText');
// const monsterStats = document.querySelector('#monsterStats');
// const monsterNameText = document.querySelector('#monsterName');
// const monsterHealthText = document.querySelector('#monsterHealth');

// const weapons = [
//     { name: 'Stick', power: 5 },
//     { name: 'Dagger', power: 30 },
//     { name: 'Claw Hammer', power: 50 },
//     { name: 'Sword', power: 100 }
// ];

// const locations = [
//     {
//         name: "town square",
//         "button text": ["Go to Store", "Go to Cave", "Fight the Dragon"],
//         "button functions": [goStore, goCave, fightDragon],
//         text: "You arrive at the town square. You see a sign that reads 'Store'."
//     },
//     {
//         name: "store",
//         "button text": ["Buy 10 Health (10 Gold)", "Buy Weapon (30 Gold)", "Go to Town Square"],
//         "button functions": [buyHealth, buyWeapon, gotown],
//         text: "You enter the store. The shopkeeper greets you warmly."
//     },
//     {
//         name: "cave",
//         "button text": ["Fight Slime", "Fight Fanged Beast", "Go to Town Square"],
//         "button functions": [fightSlime, fightBeast, gotown],
//         text: "You step into the cave. The air is cold, and you sense monsters nearby."
//     },
//     {
//         name: "fight",
//         "button text": ["Attack", "Dodge", "Run"],
//         "button functions": [attack, dodge, gotown],
//         text: "You engage in battle with a monster!"
//     },
//     {
//         name: "kill monster",
//         "button text": ["Go to Town", "Go to Town", "Go to Town"],
//         "button functions": [gotown, gotown, gotown],
//         text: "The monster screams and collapses. You earn gold and experience!"
//     },
//     {
//         name: "lose",
//         "button text": ["Replay?", "Replay?", "Replay?"],
//         "button functions": [restart, restart, restart],
//         text: "You have fallen in battle. Better luck next time!"
//     },
//     {
//         name: "win",
//         "button text": ["Replay?", "Replay?", "Replay?"],
//         "button functions": [restart, restart, restart],
//         text: "You defeated the dragon and emerged victorious!"
//     }
// ];

// const monsters = [
//     { name: "Slime", level: 2, health: 15 },
//     { name: "Fanged Beast", level: 8, health: 60 },
//     { name: "Dragon", level: 20, health: 300 }
// ];

// button1.onclick = goStore;
// button2.onclick = goCave;
// button3.onclick = fightDragon;

// function update(location) {
//     monsterStats.style.display = "none";
//     button1.innerText = location["button text"][0];
//     button2.innerText = location["button text"][1];
//     button3.innerText = location["button text"][2];
//     button1.onclick = location["button functions"][0];
//     button2.onclick = location["button functions"][1];
//     button3.onclick = location["button functions"][2];
//     text.innerText = location.text;
// }

// function gotown() {
//     update(locations[0]);
// }

// function goStore() {
//     update(locations[1]);
// }

// function goCave() {
//     update(locations[2]);
// }

// function buyHealth() {
//     if (gold >= 10) {
//         gold -= 10;
//         health += 10;
//         goldText.innerText = gold;
//         healthText.innerText = health;
//     } else {
//         text.innerText = "You are POOOORRR!!!!!";
//     }
// }

// function buyWeapon() {
//     if (currentWeapon <= 2) {
//         if (gold >= 30) {
//             gold -= 30;
//             currentWeapon++;
//             goldText.innerText = gold;
//             let newWeapon = weapons[currentWeapon].name;
//             text.innerText = "You purchased a new weapon: " + newWeapon + "\n";
//             inventory.push(newWeapon);
//             text.innerText += "Inventory: " + inventory.join(", ");
//         } else {
//             text.innerText = "You don't have enough gold to buy a weapon!";
//         }
//     } else {
//         text.innerText = "You already possess the strongest weapon!";
//         button2.innerText = "Sell your current weapon for 15 Gold";
//         button2.onclick = sellWeapon;
//     }
// }

// function sellWeapon() {
//     if (inventory.length > 1) {
//         gold += 15;
//         goldText.innerText = gold;
//         let soldWeapon = inventory.shift();
//         text.innerText = "You sold your " + soldWeapon + ".\n";
//         text.innerText += "Current Inventory: " + inventory.join(", ");
//     } else {
//         text.innerText = "You can't sell your only weapon!";
//     }
// }

// function fightSlime() {
//     fighting = 0;
//     goFight();
// }

// function fightBeast() {
//     fighting = 1;
//     goFight();
// }

// function fightDragon() {
//     fighting = 2;
//     goFight();
// }

// function goFight() {
//     update(locations[3]);
//     monsterHealth = monsters[fighting].health;
//     monsterStats.style.display = "block";
//     monsterNameText.innerText = monsters[fighting].name;
//     monsterHealthText.innerText = monsterHealth;
// }

// function attack() {
//     text.innerText = "The " + monsters[fighting].name + " attacks!\n";
//     text.innerText += "You strike with your " + weapons[currentWeapon].name + ".\n";

//     if (isMonsterHit()) {
//         health -= getMonsterAttackValue(monsters[fighting].level);
//     } else {
//         text.innerText += "You missed your attack!\n";
//     }

//     monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
//     healthText.innerText = health;
//     monsterHealthText.innerText = monsterHealth;

//     if (health <= 0) {
//         lose();
//     } else if (monsterHealth <= 0) {
//         fighting === 2 ? winGame() : defeatMonster();
//     }
// }

// function getMonsterAttackValue(level) {
//     return (level * 5) - Math.floor(Math.random() * xp);
// }

// function isMonsterHit() {
//     return Math.random() > 0.2 || health < 20;
// }

// function dodge() {
//     text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
// }

// function lose() {
//     update(locations[5]);
// }

// function defeatMonster() {
//     gold += Math.floor(monsters[fighting].level * 6.7);
//     xp += Math.floor(monsters[fighting].level);
//     goldText.innerText = gold;
//     xptext.innerText = xp;
//     update(locations[4]);
// }

// function restart() {
//     xp = 0;
//     gold = 50;
//     health = 100;
//     currentWeapon = 0;
//     goldText.innerText = gold;
//     healthText.innerText = health;
//     xptext.innerText = xp;
//     gotown();
// }

// function winGame() {
//     update(locations[6]);
// }

/* ----- Game state ----- */
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Stick"];

/* ----- DOM references ----- */
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

const action1 = document.querySelector("#action1");
const action2 = document.querySelector("#action2");
const action3 = document.querySelector("#action3");

const text = document.getElementById("message");
const xptext = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");

const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const monsterImageEl = document.getElementById("monsterImage");

const monsterHealthFill = document.getElementById("monsterHealthFill");
const playerHealthBars = document.getElementById("playerHealthBars");

const inventoryEl = document.getElementById("inventory");
const damageContainer = document.getElementById("damagePopups");
const gameRoot = document.getElementById("game");

/* Sounds */
const sfxAttack = document.getElementById("sfx-attack");
const sfxHit = document.getElementById("sfx-hit");
const sfxDeath = document.getElementById("sfx-death");
const sfxBuy = document.getElementById("sfx-buy");
const sfxLevel = document.getElementById("sfx-level");

/* Weapons */
const weapons = [
  { name: "Stick", power: 5, icon: "assets/icons/stick.png" },
  { name: "Dagger", power: 30, icon: "assets/icons/dagger.png" },
  { name: "Claw Hammer", power: 50, icon: "assets/icons/hammer.png" },
  { name: "Sword", power: 100, icon: "assets/icons/sword.png" },
];

/* Game locations */
const locations = [
  { buttons: ["Go to Store", "Go to Cave", "Fight the Dragon"], funcs: [goStore, goCave, fightDragon], text: "You arrive at the town square. You see a sign that reads 'Store'."},
  { buttons: ["Buy 10 Health (10 Gold)", "Buy Weapon (30 Gold)", "Go to Town Square"], funcs: [buyHealth, buyWeapon, gotown], text: "You enter the store. The shopkeeper smiles."},
  { buttons: ["Fight Slime", "Fight Fanged Beast", "Go to Town Square"], funcs: [fightSlime, fightBeast, gotown], text: "You step into the cave. Monsters lurk."},
  { buttons: ["Attack", "Dodge", "Run"], funcs: [attack, dodge, gotown], text: "You prepare for battle!" },
  { buttons: ["Go to Town","Go to Town","Go to Town"], funcs:[gotown,gotown,gotown], text:"The monster collapses! You gain loot!"},
  { buttons: ["Replay?","Replay?","Replay?"], funcs:[restart,restart,restart], text:"You were defeated."},
  { buttons: ["Replay?","Replay?","Replay?"], funcs:[restart,restart,restart], text:"You defeated the dragon!"}
];

/* Monster data */
const monsters = [
  { name: "Slime", level: 2, health: 15, img: "assets/images/slime.png" },
  { name: "Fanged Beast", level: 8, health: 60, img: "assets/images/beast.png" },
  { name: "Dragon", level: 20, health: 300, img: "assets/images/dragon.png" },
];

/* INIT (navigation buttons ONLY) */
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

updateUI(locations[0]);
updateStatsUI();
renderInventory();

/* UI Update */
function updateUI(location) {
  monsterStats.classList.add("hidden");

  button1.innerText = location.buttons[0];
  button2.innerText = location.buttons[1];
  button3.innerText = location.buttons[2];

  button1.onclick = location.funcs[0];
  button2.onclick = location.funcs[1];
  button3.onclick = location.funcs[2];

  text.innerText = location.text;
}

/* Inventory */
function renderInventory() {
  inventoryEl.innerHTML = "";
  inventory.forEach(item => {
    const li = document.createElement("li");
    li.className = "inv-item";
    const icon = getWeaponIcon(item);
    li.innerHTML = `<img src="${icon}" class="inv-icon"> ${item}`;
    inventoryEl.appendChild(li);
  });
}

function getWeaponIcon(name) {
  return weapons.find(w => w.name === name)?.icon || "assets/icons/stick.png";
}

/* Multi-bar health */
function updatePlayerHealthBars() {
  playerHealthBars.innerHTML = "";
  let remaining = health;

  while (remaining > 0) {
    const segment = Math.min(remaining, 100);

    const bar = document.createElement("div");
    bar.className = "segment-bar";

    const fill = document.createElement("div");
    fill.className = "segment-fill";
    fill.style.width = segment + "%";

    if (segment <= 30) fill.classList.add("low");

    bar.appendChild(fill);
    playerHealthBars.appendChild(bar);

    remaining -= 100;
  }
}

/* Navigation */
function gotown() { updateUI(locations[0]); }
function goStore(){ updateUI(locations[1]); }
function goCave() { updateUI(locations[2]); }

/* Store actions */
function buyHealth() {
  if (gold < 10) return flashMessage("Not enough gold!");

  gold -= 10;
  health += 10;
  flashMessage("+10 Health");
  updateStatsUI();
  sfxBuy.play().catch(()=>{});
}

function buyWeapon() {
  if (currentWeapon >= weapons.length - 1)
    return flashMessage("You already own the strongest weapon!");

  if (gold < 30) return flashMessage("Not enough gold!");

  gold -= 30;
  currentWeapon++;
  inventory.push(weapons[currentWeapon].name);

  flashMessage("You purchased " + weapons[currentWeapon].name);
  renderInventory();
  updateStatsUI();
  sfxBuy.play().catch(()=>{});
}

function sellWeapon() {
  if (inventory.length <= 1)
    return flashMessage("You cannot sell your only weapon!");

  const sold = inventory.shift();
  gold += 15;

  flashMessage("Sold: " + sold);
  renderInventory();
  updateStatsUI();
}

/* Fight navigation */
function fightSlime(){ fighting = 0; goFight(); }
function fightBeast(){ fighting = 1; goFight(); }
function fightDragon(){ fighting = 2; goFight(); }

/* FIGHT MODE */
function goFight() {
  updateUI(locations[3]);

  monsterHealth = monsters[fighting].health;
  monsterStats.classList.remove("hidden");

  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  monsterImageEl.src = monsters[fighting].img;

  document.getElementById("m-level").innerText = `Level ${monsters[fighting].level}`;

  monsterHealthFill.style.width = "100%";
  updatePlayerHealthBars();

  /* DIRECT fight actions — NO MORE redirections */
  action1.onclick = attack;
  action2.onclick = dodge;
  action3.onclick = gotown;

  action1.innerText = "Attack";
  action2.innerText = "Dodge";
  action3.innerText = "Run";
}

/* ATTACK */
function attack() {
  sfxAttack.play().catch(()=>{});

  flashMessage(`You strike with your ${weapons[currentWeapon].name}!`);

  if (isMonsterHit()) {
    const dmg = weapons[currentWeapon].power + Math.floor(Math.random()*Math.max(xp,1)) + 1;
    monsterHealth -= dmg;
    showDamage(dmg,false);
    animateMonsterHit();
    sfxHit.play().catch(()=>{});
  }

  if (monsterHealth > 0) {
    const monDmg = getMonsterAttack(monsters[fighting].level);
    health -= monDmg;
    showDamage(monDmg,true);
    triggerShake();
  }

  health = Math.max(0, health);
  monsterHealth = Math.max(0, monsterHealth);

  monsterHealthText.innerText = monsterHealth;
  monsterHealthFill.style.width = (monsterHealth / monsters[fighting].health) * 100 + "%";
  updatePlayerHealthBars();
  healthText.innerText = health;

  if (health <= 0) return lose();
  if (monsterHealth <= 0) return (fighting === 2 ? winGame() : defeatMonster());
}

/* DODGE (NO damage taken unless counter triggers) */
function dodge() {
  flashMessage("You dodge!");

  if (Math.random() < 0.15) {
    const counter = Math.floor(weapons[currentWeapon].power * 0.5);
    monsterHealth -= counter;
    monsterHealth = Math.max(0, monsterHealth);

    showDamage(counter,false);
    monsterHealthText.innerText = monsterHealth;
    monsterHealthFill.style.width = (monsterHealth/monsters[fighting].health)*100 + "%";

    if (monsterHealth <= 0)
      return (fighting === 2 ? winGame() : defeatMonster());
  }
}

/* Accuracy & damage math */
function getMonsterAttack(level) {
  return Math.max(1, level*5 - Math.floor(Math.random()*Math.max(xp,1)));
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

/* OUTCOMES */
function lose(){
  updateUI(locations[5]);
  flashMessage("You have been defeated...");
  sfxDeath.play().catch(()=>{});
}

function defeatMonster(){
  const g = Math.floor(monsters[fighting].level * 6.7);
  gold += g;
  xp += monsters[fighting].level;

  flashMessage(`Victory! +${g} Gold +${monsters[fighting].level} XP`);
  updateUI(locations[4]);
  updateStatsUI();
  sfxLevel.play().catch(()=>{});
}

function restart(){
  xp = 0; gold = 50; health = 100;
  currentWeapon = 0;
  inventory = ["Stick"];
  renderInventory();
  updateStatsUI();
  gotown();
}

function winGame(){
  updateUI(locations[6]);
  flashMessage("You slew the Dragon!");
  sfxLevel.play().catch(()=>{});
}

/* VISUALS */
function flashMessage(msg){ text.innerText = msg; }

function showDamage(amount,isPlayer){
  const div = document.createElement("div");
  div.className = "damage-text";
  div.innerText = `-${amount}`;

  const r = monsterStats.getBoundingClientRect();
  div.style.left = r.left + r.width * (0.6 + Math.random()*0.2) + "px";
  div.style.top = r.top + r.height * (0.35 + Math.random()*0.2) + "px";

  damageContainer.appendChild(div);
  setTimeout(()=> div.remove(),900);
}

function animateMonsterHit(){
  monsterImageEl.style.transform = "translateX(8px)";
  monsterImageEl.style.transition = "0.12s";
  setTimeout(()=> monsterImageEl.style.transform="",120);
}

function triggerShake(){
  gameRoot.classList.add("shake");
  setTimeout(()=> gameRoot.classList.remove("shake"),380);
}

/* Stats display update */
function updateStatsUI(){
  xptext.innerText = xp;
  goldText.innerText = gold;
  healthText.innerText = health;
  updatePlayerHealthBars();
}


