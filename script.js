let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Stick"];

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

const sfxAttack = document.getElementById("sfx-attack");
const sfxHit = document.getElementById("sfx-hit");
const sfxDeath = document.getElementById("sfx-death");
const sfxBuy = document.getElementById("sfx-buy");
const sfxLevel = document.getElementById("sfx-level");

const weapons = [
  { name: "Stick", power: 5, icon: "assets/icons/stick.png" },
  { name: "Dagger", power: 30, icon: "assets/icons/dagger.png" },
  { name: "Claw Hammer", power: 50, icon: "assets/icons/hammer.png" },
  { name: "Sword", power: 100, icon: "assets/icons/sword.png" },
];

const locations = [
  { buttons: ["Go to Store", "Go to Cave", "Fight the Dragon"], funcs: [goStore, goCave, fightDragon], text: "You arrive at the town square. You see a sign that reads 'Store'."},
  { buttons: ["Buy 10 Health (10 Gold)", "Buy Weapon (30 Gold)", "Go to Town Square"], funcs: [buyHealth, buyWeapon, gotown], text: "You enter the store. The shopkeeper smiles."},
  { buttons: ["Fight Slime", "Fight Fanged Beast", "Go to Town Square"], funcs: [fightSlime, fightBeast, gotown], text: "You step into the cave. Monsters lurk."},
  { buttons: ["Attack", "Dodge", "Run"], funcs: [attack, dodge, gotown], text: "You prepare for battle!" },
  { buttons: ["Go to Town","Go to Town","Go to Town"], funcs:[gotown,gotown,gotown], text:"The monster collapses! You gain loot!"},
  { buttons: ["Replay?","Replay?","Replay?"], funcs:[restart,restart,restart], text:"You were defeated."},
  { buttons: ["Replay?","Replay?","Replay?"], funcs:[restart,restart,restart], text:"You defeated the dragon!"}
];

const monsters = [
  { name: "Slime", level: 2, health: 15, img: "assets/images/slime.png" },
  { name: "Fanged Beast", level: 8, health: 60, img: "assets/images/beast.png" },
  { name: "Dragon", level: 20, health: 300, img: "assets/images/dragon.png" },
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

updateUI(locations[0]);
updateStatsUI();
renderInventory();

function updateUI(location) {
  monsterStats.classList.add("hidden");
  button1.innerText = location.buttons[0];
  button2.innerText = location.buttons[1];
  button3.innerText = location.buttons[2];
  button1.onclick = location.funcs[0];
  button2.onclick = location.funcs[1];
  button3.onclick = location.funcs[2];
  text.innerText = location.text;

  if (location === locations[1] && currentWeapon >= weapons.length - 1) {
    button2.innerText = "Sell Weapon (+15 Gold)";
    button2.onclick = sellWeapon;
  }
}

function renderInventory() {
  inventoryEl.innerHTML = "";
  inventory.forEach(item => {
    const li = document.createElement("li");
    li.className = "inv-item";
    li.innerHTML = `<img src="${getWeaponIcon(item)}" class="inv-icon"> ${item}`;
    inventoryEl.appendChild(li);
  });
}

function getWeaponIcon(name) {
  return weapons.find(w => w.name === name)?.icon || "assets/icons/stick.png";
}

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

function gotown(){ updateUI(locations[0]); }
function goStore(){ updateUI(locations[1]); }
function goCave(){ updateUI(locations[2]); }

function buyHealth() {
  if (gold < 10) return flashMessage("Not enough gold!");
  gold -= 10;
  health += 10;
  flashMessage("+10 Health");
  updateStatsUI();
  sfxBuy.play().catch(()=>{});
}

function buyWeapon() {
  if (currentWeapon >= weapons.length - 1) {
    flashMessage("You already own the strongest weapon!");
    button2.innerText = "Sell Weapon (+15 Gold)";
    button2.onclick = sellWeapon;
    return;
  }
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
  if (inventory.length <= 1) return flashMessage("You cannot sell your only weapon!");
  const sold = inventory.shift();
  gold += 15;
  flashMessage("Sold: " + sold);
  renderInventory();
  updateStatsUI();
}

function fightSlime(){ fighting = 0; goFight(); }
function fightBeast(){ fighting = 1; goFight(); }
function fightDragon(){ fighting = 2; goFight(); }

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
  action1.onclick = attack;
  action2.onclick = dodge;
  action3.onclick = gotown;
  action1.innerText = "Attack";
  action2.innerText = "Dodge";
  action3.innerText = "Run";
}

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

  monsterHealth = Math.max(0, monsterHealth);
  health = Math.max(0, health);

  monsterHealthText.innerText = monsterHealth;
  monsterHealthFill.style.width = (monsterHealth / monsters[fighting].health) * 100 + "%";
  healthText.innerText = health;
  updatePlayerHealthBars();

  if (health <= 0) return lose();
  if (monsterHealth <= 0) return (fighting === 2 ? winGame() : defeatMonster());
}

function dodge() {
  flashMessage("You dodge!");
  if (Math.random() < 0.15) {
    const counter = Math.floor(weapons[currentWeapon].power * 0.5);
    monsterHealth -= counter;
    monsterHealth = Math.max(0, monsterHealth);
    showDamage(counter,false);
    monsterHealthText.innerText = monsterHealth;
    monsterHealthFill.style.width = (monsterHealth/monsters[fighting].health)*100 + "%";
    if (monsterHealth <= 0) return (fighting === 2 ? winGame() : defeatMonster());
  }
}

function getMonsterAttack(level) {
  return Math.max(1, level*5 - Math.floor(Math.random()*Math.max(xp,1)));
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function lose() {
  updateUI(locations[5]);
  flashMessage("You have been defeated...");
  sfxDeath.play().catch(()=>{});
}

function defeatMonster() {
  const reward = Math.floor(monsters[fighting].level * 6.7);
  gold += reward;
  xp += monsters[fighting].level;
  flashMessage(`Victory! +${reward} Gold +${monsters[fighting].level} XP`);
  updateUI(locations[4]);
  updateStatsUI();
  sfxLevel.play().catch(()=>{});
}

function restart() {
  xp = 0;
  gold = 50;
  health = 100;
  currentWeapon = 0;
  inventory = ["Stick"];
  renderInventory();
  updateStatsUI();
  gotown();
}

function winGame() {
  updateUI(locations[6]);
  flashMessage("You slew the Dragon!");
  sfxLevel.play().catch(()=>{});
}

function flashMessage(msg) {
  text.innerText = msg;
}

function showDamage(amount) {
  const div = document.createElement("div");
  div.className = "damage-text";
  div.innerText = `-${amount}`;
  const r = monsterStats.getBoundingClientRect();
  div.style.left = r.left + r.width * (0.6 + Math.random()*0.2) + "px";
  div.style.top = r.top + r.height * (0.35 + Math.random()*0.2) + "px";
  damageContainer.appendChild(div);
  setTimeout(()=> div.remove(),900);
}

function animateMonsterHit() {
  monsterImageEl.style.transform = "translateX(8px)";
  monsterImageEl.style.transition = "0.12s";
  setTimeout(()=> monsterImageEl.style.transform="",120);
}

function triggerShake(){
  gameRoot.classList.add("shake");
  setTimeout(()=> gameRoot.classList.remove("shake"),380);
}

function updateStatsUI() {
  xptext.innerText = xp;
  goldText.innerText = gold;
  healthText.innerText = health;
  updatePlayerHealthBars();
}
