import './style.css'

// --- GAME DATA ---
const createPixelArt = (gridStr, palette) => {
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d');
  const rows = gridStr.trim().split('\n');
  rows.forEach((row, y) => {
    for (let x = 0; x < 16; x++) {
      const char = row[x];
      if (char && char !== '.') {
        ctx.fillStyle = palette[char];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  });
  return canvas.toDataURL();
};

const CHARACTERS = [
  { id: 'peasant', name: "Peasant", visual: "/chars/peasant.png", rarity: "Common", chance: 2, color: "#888888", value: 1, hp: 10, str: 1, anim: 'anim-breathe' },
  { id: 'thief', name: "Rogue Thief", visual: "/chars/thief.png", rarity: "Common", chance: 3, color: "#888888", value: 1, hp: 12, str: 3, anim: 'anim-breathe' },
  { id: 'goblin', name: "Goblin", visual: "/chars/goblin.png", rarity: "Common", chance: 5, color: "#9ca3af", value: 2, hp: 15, str: 2, anim: 'anim-breathe' },
  { id: 'slime', name: "Acid Slime", visual: "/chars/slime.png", rarity: "Common", chance: 6, color: "#22c55e", value: 3, hp: 30, str: 2, anim: 'anim-breathe' },
  { id: 'skeleton', name: "Skeleton", visual: "/chars/skeleton.png", rarity: "Uncommon", chance: 25, color: "#4ade80", value: 10, hp: 20, str: 5, anim: 'anim-breathe' },
  { id: 'ghost', name: "Wandering Ghost", visual: "/chars/ghost.png", rarity: "Uncommon", chance: 30, color: "#e5e7eb", value: 12, hp: 10, str: 12, anim: 'anim-float' },
  { id: 'dwarf', name: "Dwarf Warrior", visual: "/chars/dwarf.png", rarity: "Uncommon", chance: 40, color: "#4ade80", value: 15, hp: 60, str: 10, anim: 'anim-breathe' },
  { id: 'orc', name: "Orc Warrior", visual: "/chars/orc.png", rarity: "Uncommon", chance: 50, color: "#22c55e", value: 25, hp: 40, str: 8, anim: 'anim-breathe' },
  { id: 'blood_orc', name: "Blood Orc", visual: "/chars/orc.png", cssFilter: "hue-rotate(300deg) saturate(2) brightness(0.9)", rarity: "Rare", chance: 150, color: "#60a5fa", value: 80, hp: 45, str: 18, anim: 'anim-breathe' },
  { id: 'golem', name: "Stone Golem", visual: "/chars/golem.png", rarity: "Rare", chance: 180, color: "#78716c", value: 90, hp: 120, str: 15, anim: 'anim-shake' },
  { id: 'elf', name: "Elven Archer", visual: "/chars/elf.png", rarity: "Rare", chance: 200, color: "#60a5fa", value: 100, hp: 35, str: 15, anim: 'anim-float' },
  { id: 'kraken', name: "Kraken Hatchling", visual: "/chars/kraken.png", rarity: "Rare", chance: 250, color: "#3b82f6", value: 120, hp: 45, str: 22, anim: 'anim-breathe' },
  { id: 'vulcan_golem', name: "Vulcan Golem", visual: "/chars/vulcan_golem.png", rarity: "Rare", chance: 300, color: "#f97316", value: 130, hp: 100, str: 18, anim: 'anim-shake' },
  { id: 'vulcan_golem', name: "Vulcan Golem", visual: "/chars/vulcan_golem.png", rarity: "Rare", chance: 300, color: "#f97316", value: 130, hp: 100, str: 18, anim: 'anim-shake' },
  { id: 'assassin', name: "Shadow Assassin", visual: "/chars/assassin.png", rarity: "Rare", chance: 350, color: "#60a5fa", value: 150, hp: 30, str: 40, anim: 'anim-float' },
  { id: 'knight', name: "Noble Knight", visual: "/chars/knight.png", rarity: "Rare", chance: 500, color: "#3b82f6", value: 250, hp: 80, str: 20, anim: 'anim-float' },
  { id: 'spectral_knight', name: "Spectral Knight", visual: "/chars/knight.png", cssFilter: "hue-rotate(120deg) saturate(1.5) opacity(0.8)", rarity: "Epic", chance: 1500, color: "#c084fc", value: 800, hp: 100, str: 45, anim: 'anim-float' },
  { id: 'vampire', name: "Vampire Lord", visual: "/chars/vampire.png", rarity: "Epic", chance: 1800, color: "#ef4444", value: 900, hp: 100, str: 80, anim: 'anim-float' },
  { id: 'mage', name: "Dark Mage", visual: "/chars/mage.png", rarity: "Epic", chance: 2000, color: "#c084fc", value: 1000, hp: 60, str: 50, anim: 'anim-float' },
  { id: 'necromancer', name: "Necromancer", visual: "/chars/necromancer.png", rarity: "Epic", chance: 2200, color: "#a855f7", value: 1100, hp: 75, str: 65, anim: 'anim-float' },
  { id: 'storm_summoner', name: "Storm Summoner", visual: "/chars/storm_summoner.png", rarity: "Epic", chance: 2500, color: "#06b6d4", value: 1250, hp: 70, str: 55, anim: 'anim-float' },
  { id: 'storm_summoner', name: "Storm Summoner", visual: "/chars/storm_summoner.png", rarity: "Epic", chance: 2500, color: "#06b6d4", value: 1250, hp: 70, str: 55, anim: 'anim-float' },
  { id: 'dark_elf', name: "Dark Elf Ranger", visual: "/chars/elf.png", cssFilter: "hue-rotate(240deg) saturate(1.5) brightness(0.8)", rarity: "Epic", chance: 2800, color: "#a855f7", value: 1400, hp: 85, str: 55, anim: 'anim-float' },
  { id: 'paladin', name: "Holy Paladin", visual: "/chars/paladin.png", rarity: "Epic", chance: 3500, color: "#a855f7", value: 1800, hp: 200, str: 60, anim: 'anim-shake' },
  { id: 'demon', name: "Demon Brute", visual: "/chars/demon.png", rarity: "Epic", chance: 5000, color: "#a855f7", value: 2500, hp: 150, str: 75, anim: 'anim-shake' },
  { id: 'frost_dragon', name: "Frost Dragon", visual: "/chars/dragon.png", cssFilter: "hue-rotate(180deg) saturate(2) brightness(1.2)", rarity: "Legendary", chance: 15000, color: "#fbbf24", value: 8000, hp: 400, str: 180, glow: "0 0 20px #60a5fa", anim: 'anim-pulse-glow' },
  { id: 'pegasus', name: "Pegasus", visual: "/chars/pegasus.png", rarity: "Legendary", chance: 18000, color: "#fcd34d", value: 8500, hp: 320, str: 220, glow: "0 0 20px #fcd34d", anim: 'anim-float' },
  { id: 'gryphon', name: "Majestic Gryphon", visual: "/chars/gryphon.png", rarity: "Legendary", chance: 20000, color: "#fcd34d", value: 9500, hp: 350, str: 250, glow: "0 0 20px #fcd34d", anim: 'anim-pulse-glow' },
  { id: 'dragon', name: "Elder Dragon", visual: "/chars/dragon.png", rarity: "Legendary", chance: 25000, color: "#fbbf24", value: 10000, hp: 500, str: 200, glow: "0 0 20px #fbbf24", anim: 'anim-pulse-glow' },
  { id: 'phoenix', name: "Fiery Phoenix", visual: "/chars/phoenix.png", rarity: "Legendary", chance: 50000, color: "#f59e0b", value: 25000, hp: 300, str: 350, glow: "0 0 25px #f59e0b", anim: 'anim-pulse-glow' },
  { id: 'archangel', name: "Archangel", visual: "/chars/archangel.png", rarity: "Legendary", chance: 100000, color: "#f59e0b", value: 50000, hp: 400, str: 250, glow: "0 0 30px #f59e0b", anim: 'anim-pulse-glow' },
  { id: 'void_mage', name: "Void Mage", visual: "/chars/mage.png", cssFilter: "invert(1) hue-rotate(180deg) contrast(1.5)", rarity: "Mythic", chance: 300000, color: "#ef4444", value: 150000, hp: 800, str: 600, glow: "0 0 30px #a855f7", anim: 'anim-shake' },
  { id: 'void_stalker', name: "Void Stalker", visual: "/chars/void_stalker.png", rarity: "Mythic", chance: 350000, color: "#a78bfa", value: 180000, hp: 1000, str: 650, glow: "0 0 35px #a78bfa", anim: 'anim-shake' },
  { id: 'void_stalker', name: "Void Stalker", visual: "/chars/void_stalker.png", rarity: "Mythic", chance: 350000, color: "#a78bfa", value: 180000, hp: 1000, str: 650, glow: "0 0 35px #a78bfa", anim: 'anim-shake' },
  { id: 'time_weaver', name: "Time Weaver", visual: "/chars/time_weaver.png", rarity: "Mythic", chance: 400000, color: "#60a5fa", value: 200000, hp: 1200, str: 700, glow: "0 0 35px #60a5fa", anim: 'anim-pulse-glow' },
  { id: 'abyssal', name: "Abyssal Lord", visual: "/chars/abyssal.png", rarity: "Mythic", chance: 500000, color: "#ef4444", value: 250000, hp: 1500, str: 800, glow: "0 0 40px #ef4444", anim: 'anim-shake' },
  { id: 'cosmic', name: "Cosmic Entity", visual: "/chars/cosmic.png", rarity: "Divine", chance: 5000000, color: "linear-gradient(45deg, #b8860b, #5c4033)", value: 2500000, hp: 9999, str: 5000, glow: "0 0 80px #b8860b, 0 0 40px #5c4033", anim: 'anim-pulse-glow' }
];

const UPGRADES = [
  { id: 'luck', name: "Loaded Dice", desc: "Increases fate multiplier by +0.2x", baseCost: 50, costMult: 1.5 },
  { id: 'speed', name: "Swift Ritual", desc: "Reduces summon cooldown by 10%", baseCost: 100, costMult: 1.6 },
  { id: 'bargain', name: "Merchant's Guild", desc: "Increases gold from dismissing by +10%", baseCost: 200, costMult: 1.8 },
  { id: 'tactics', name: "War Tactics", desc: "Increases party power in boss fights by +5%", baseCost: 500, costMult: 2.0 },
  { id: 'wealth', name: "Tavern Income", desc: "Passively generates +1 Gold every second", baseCost: 300, costMult: 1.5 },
  { id: 'auto', name: "Auto-Summon", desc: "Unlocks constant automatic summoning", baseCost: 5000, costMult: 1, maxLevel: 1 },
  { id: 'auto_sell_module', name: "Contract of Selling", desc: "Unlocks Auto-Dismiss filters for low rarity heroes", baseCost: 100, costMult: 1, maxLevel: 1 }
];

const MISSIONS = [
  { id: 'first_summon', title: "First Blood", desc: "Summon your first hero", req: () => state.totalRolls >= 1, rewardText: "+50 Gold", reward: () => state.coins += 50 },
  { id: 'summon_100', title: "Dedicated Recruiter", desc: "Summon 100 times", req: () => state.totalRolls >= 100, rewardText: "+500 Gold", reward: () => state.coins += 500 },
  { id: 'unlock_5', title: "Gathering the Vanguard", desc: "Unlock 5 different heroes in the Index", req: () => Object.keys(state.unlocked).length >= 5, rewardText: "+1 Loaded Dice Level", reward: () => state.upgrades.luck++ },
  { id: 'first_boss', title: "Slayer of Beasts", desc: "Defeat Dungeon Floor 1", req: () => state.currentDungeonFloor > 1, rewardText: "+10,000 Gold", reward: () => state.coins += 10000 },
  { id: 'unlock_10', title: "Master Commander", desc: "Unlock 10 different heroes in the Index", req: () => Object.keys(state.unlocked).length >= 10, rewardText: "+3 Loaded Dice Levels", reward: () => state.upgrades.luck += 3 },
  { id: 'dungeon_crawler', title: "Dungeon Crawler", desc: "Reach Dungeon Floor 3", req: () => state.currentDungeonFloor >= 3, rewardText: "+5,000 Gold", reward: () => state.coins += 5000 },
  { id: 'true_ascension', title: "True Ascension", desc: "Ascend any hero at least 5 times", req: () => Object.values(state.ascensions).some(lvl => lvl >= 5), rewardText: "+5 Tactics Levels", reward: () => state.upgrades.tactics += 5 },
  { id: 'summoner_adept', title: "Adept Summoner", desc: "Roll the dice 1,000 times", req: () => state.totalRolls >= 1000, rewardText: "+5 Speed Levels", reward: () => state.upgrades.speed += 5 },
  { id: 'golden_age', title: "The Golden Age", desc: "Hoard 100,000 Gold Coins", req: () => state.coins >= 100000, rewardText: "+5 Wealth Levels", reward: () => state.upgrades.wealth += 5 },
  { id: 'relic_hunter', title: "Relic Hunter", desc: "Equip 3 Artifacts at the same time", req: () => {
    let equipped = 0;
    Object.values(state.equipment).forEach(arr => equipped += arr.length);
    return equipped >= 3;
  }, rewardText: "+50,000 Gold", reward: () => state.coins += 50000 },
  { id: 'dungeon_master', title: "Dungeon Master", desc: "Reach Dungeon Floor 5", req: () => state.currentDungeonFloor >= 5, rewardText: "+250,000 Gold", reward: () => state.coins += 250000 },
  { id: 'summoner_master', title: "Master Summoner", desc: "Roll the dice 10,000 times", req: () => state.totalRolls >= 10000, rewardText: "+10 Luck Levels", reward: () => state.upgrades.luck += 10 },
  { id: 'unlock_all', title: "Legendary Collector", desc: "Unlock all heroes (Index 100%)", req: () => Object.keys(state.unlocked).length >= CHARACTERS.length, rewardText: "+999,999 Gold", reward: () => state.coins += 999999 }
];

const DUNGEON_BOSSES = [
  { floor: 1, name: "Bandit King", req: 100, reward: 500, visual: "/chars/thief.png", hp: "500", color: "#888888" },
  { floor: 2, name: "Skeleton Warlord", req: 300, reward: 1500, visual: "/chars/skeleton.png", hp: "1,500", color: "#4ade80" },
  { floor: 3, name: "Orc Chieftain", req: 1000, reward: 5000, visual: "/chars/orc.png", hp: "4,000", color: "#22c55e" },
  { floor: 4, name: "Corrupted Knight", req: 3000, reward: 15000, visual: "/chars/knight.png", hp: "12,000", color: "#3b82f6", cssFilter: "grayscale(1) brightness(0.5)" },
  { floor: 5, name: "The Abyss Overlord", req: 10000, reward: 50000, visual: "/chars/abyssal.png", hp: "50,000", color: "#ef4444" },
  { floor: 6, name: "Cosmic Devourer", req: 50000, reward: 250000, visual: "/chars/cosmic.png", hp: "250,000", color: "#b8860b", cssFilter: "hue-rotate(90deg)" },
  { floor: 7, name: "The Creator (Max)", req: 250000, reward: 1000000, visual: "/chars/archangel.png", hp: "1,000,000", color: "#f59e0b", cssFilter: "invert(1)" }
];

const RELICS = [
  { id: 'sword', name: "Sword of the Ancients", desc: "Global: +5% Total Power per level", equipDesc: "Equip: +50% Hero Power", type: "power", mult: 0.05, equipPower: 0.5, equipHp: 0 },
  { id: 'amulet', name: "Amulet of Fate", desc: "Global: +5% Luck per level", equipDesc: "Equip: +50% Hero Vitality", type: "luck", mult: 0.05, equipPower: 0, equipHp: 0.5 },
  { id: 'chalice', name: "Chalice of Greed", desc: "Global: +5% Gold Income per level", equipDesc: "Equip: +25% Power & Vitality", type: "gold", mult: 0.05, equipPower: 0.25, equipHp: 0.25 }
];

// --- PATH REPAIR FOR SUBFOLDER HOSTING ---
CHARACTERS.forEach(c => {
  if (c.visual && c.visual.startsWith('/')) c.visual = c.visual.substring(1);
});
DUNGEON_BOSSES.forEach(b => {
  if (b.visual && b.visual.startsWith('/')) b.visual = b.visual.substring(1);
});

// --- GAME STATE ---
const getInitialState = () => ({
  coins: 0,
  totalRolls: 0,
  army: {}, // id: count
  unlocked: {}, // id: true (for Index)
  upgrades: { luck: 0, speed: 0, bargain: 0, tactics: 0, wealth: 0, auto: 0, auto_sell_module: 0 },
  autoRollActive: false,
  claimedRewards: {}, // id: true
  autoSellConfig: { "Common": false, "Uncommon": false, "Rare": false, "Epic": false },
  lastSaveTime: Date.now(),
  currentDungeonFloor: 1,
  ascensions: {}, // id: level
  relics: {}, // id: count
  equipment: {}, // id: [relic_id, relic_id]
  prestige: 0
});

let state = getInitialState();
let currentSlot = 1;
let currentDismissMult = 1;

// Boss Battle State
let selectedParty = [];
const BOSS_REQ_STR = 1500;
const BOSS_REWARD = 5000;

// --- SAVE SLOT LOGIC ---
function getSaveKey(slot) {
  return `tavernLegendsSave_slot_${slot}`;
}

function loadSaveSlotsUI() {
  for (let i = 1; i <= 3; i++) {
    const dataStr = localStorage.getItem(getSaveKey(i));
    const slotEl = document.querySelector(`.save-slot[data-slot="${i}"]`);
    const infoEl = slotEl.querySelector('.slot-info');
    const deleteBtn = slotEl.querySelector('.delete-slot-btn');
    const playBtn = slotEl.querySelector('.play-slot-btn');
    
    if (dataStr) {
      const data = JSON.parse(dataStr);
      infoEl.textContent = `Gold: ${data.coins} | Summons: ${data.totalRolls}`;
      deleteBtn.style.display = 'inline-block';
      playBtn.textContent = 'Continue';
    } else {
      infoEl.textContent = 'Empty';
      deleteBtn.style.display = 'none';
      playBtn.textContent = 'New Game';
    }
    
    // Unbind and rebind events safely
    const newPlayBtn = playBtn.cloneNode(true);
    playBtn.parentNode.replaceChild(newPlayBtn, playBtn);
    newPlayBtn.addEventListener('click', () => loadGame(i));
    
    const newDelBtn = deleteBtn.cloneNode(true);
    deleteBtn.parentNode.replaceChild(newDelBtn, deleteBtn);
    newDelBtn.addEventListener('click', () => deleteSave(i));
  }
}

function loadGame(slot) {
  currentSlot = slot;
  const dataStr = localStorage.getItem(getSaveKey(slot));
  if (dataStr) {
    state = { ...getInitialState(), ...JSON.parse(dataStr) };
    
    // Backwards compatibility for new state fields
    if (!state.unlocked) state.unlocked = {};
    if (!state.claimedRewards) state.claimedRewards = {};
    if (!state.autoSellConfig) state.autoSellConfig = { "Common": false, "Uncommon": false, "Rare": false, "Epic": false };
    if (!state.ascensions) state.ascensions = {};
    if (!state.relics) state.relics = {};
    if (!state.currentDungeonFloor) state.currentDungeonFloor = 1;
    if (state.prestige === undefined) state.prestige = 0;
    if (!state.equipment) state.equipment = {};
    
    // Offline Progress Calculation
    const now = Date.now();
    if (state.lastSaveTime && state.upgrades.wealth > 0) {
      const seconds = Math.floor((now - state.lastSaveTime) / 1000);
      if (seconds > 60) {
        const offlineGold = seconds * state.upgrades.wealth * getSellMultiplier();
        state.coins += offlineGold;
        setTimeout(() => notify(`You were away for ${Math.floor(seconds/60)} mins. Earned ${Math.floor(offlineGold)} Gold!`, '#fbbf24'), 1000);
      }
    }
    state.lastSaveTime = now;
    
    // Ensure upgrades
    UPGRADES.forEach(u => {
      if (state.upgrades[u.id] === undefined) state.upgrades[u.id] = 0;
    });
  } else {
    state = getInitialState();
  }
  
  document.getElementById('save-slots-menu').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  
  if (state.autoRollActive) {
    toggleAutoRoll(true);
  }
  
  updateAutoSellUI();
  updateStats();
  renderArmy();
  renderUpgrades();
  notify(`Loaded Save Slot ${slot}`, '#2e8b57');
}

function saveState() {
  state.lastSaveTime = Date.now();
  localStorage.setItem(getSaveKey(currentSlot), JSON.stringify(state));
}

function deleteSave(slot) {
  if (confirm(`Are you sure you want to delete Save Slot ${slot}?`)) {
    localStorage.removeItem(getSaveKey(slot));
    loadSaveSlotsUI();
  }
}

document.getElementById('switch-save-btn').addEventListener('click', () => {
  saveState();
  if (state.autoRollActive) toggleAutoRoll(); // turn off
  document.getElementById('app').style.display = 'none';
  document.getElementById('save-slots-menu').style.display = 'flex';
  loadSaveSlotsUI();
});


// --- LOGIC ---
const getPrestigeMult = () => 1.0 + (state.prestige * 2.0);
const getRelicMult = (type) => {
  const relic = RELICS.find(r => r.type === type);
  return 1.0 + ((state.relics[relic.id] || 0) * relic.mult);
};
const getLuckMultiplier = () => (1.0 + (state.upgrades.luck * 0.2)) * getPrestigeMult() * getRelicMult('luck');
const getCooldownMs = () => Math.max(100, 1000 * Math.pow(0.9, state.upgrades.speed));
const getSellMultiplier = () => (1.0 + (state.upgrades.bargain * 0.10)) * getPrestigeMult() * getRelicMult('gold');
const getTacticsMultiplier = () => (1.0 + (state.upgrades.tactics * 0.05)) * getRelicMult('power');

const getBasePower = (char) => {
  let power = char.str * (1.0 + (state.ascensions[char.id] || 0));
  const equips = state.equipment[char.id] || [];
  let mult = 1.0;
  equips.forEach(rId => {
    const r = RELICS.find(x => x.id === rId);
    if(r) mult += r.equipPower;
  });
  return Math.floor(power * mult);
};

const getBaseHp = (char) => {
  let hp = char.hp * (1.0 + (state.ascensions[char.id] || 0));
  const equips = state.equipment[char.id] || [];
  let mult = 1.0;
  equips.forEach(rId => {
    const r = RELICS.find(x => x.id === rId);
    if(r) mult += r.equipHp;
  });
  return Math.floor(hp * mult);
};

const getUpgradeCost = (id) => {
  const upg = UPGRADES.find(u => u.id === id);
  return Math.floor(upg.baseCost * Math.pow(upg.costMult, state.upgrades[id]));
};

let isRolling = false;
let autoRollTimer = null;
let lastRolledChar = null;
let passiveIncomeTimer = setInterval(() => {
  state.lastSaveTime = Date.now();
  if (document.getElementById('app').style.display !== 'none' && state.upgrades.wealth > 0) {
    state.coins += state.upgrades.wealth * getSellMultiplier();
    if (!document.hidden) {
      updateStats();
      renderUpgrades(); // To update button disabled states
    }
  }
}, 1000);

function notify(message, color = "var(--accent)") {
  const container = document.getElementById('notification-container');
  const el = document.createElement('div');
  el.className = 'notification';
  el.style.borderLeftColor = color;
  el.innerHTML = message;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

function rollCharacter() {
  const luck = getLuckMultiplier();
  const sorted = [...CHARACTERS].sort((a, b) => b.chance - a.chance);
  
  for (const char of sorted) {
    const effectiveChance = Math.max(1, char.chance / luck);
    if (Math.random() < 1 / effectiveChance) {
      return char;
    }
  }
  return sorted[sorted.length - 1]; // Peasant
}

function performRoll() {
  if (isRolling) return;
  isRolling = true;
  
  state.totalRolls++;
  const char = rollCharacter();
  
  state.unlocked[char.id] = true; // Unlock in Index
  
  let armyChanged = false;
  // Auto-Dismiss logic
  if (state.upgrades.auto_sell_module > 0 && state.autoSellConfig[char.rarity]) {
    const sellValue = Math.floor(char.value * getSellMultiplier());
    state.coins += sellValue;
    playSfx('coins');
  } else {
    state.army[char.id] = (state.army[char.id] || 0) + 1;
    playSfx('summon_' + char.rarity.toLowerCase());
    armyChanged = true;
  }

  saveState();
  
  const cooldownMs = getCooldownMs();
  
  if (!document.hidden) {
    updateDisplay(char);
    updateStats();
    if (armyChanged) {
      renderArmy();
    }
    
    if (char.chance >= 2000) {
      notify(`Summoned ${char.name}! (1 in ${char.chance})`, char.color.startsWith('linear') ? '#b8860b' : char.color);
    }
    
    const bar = document.getElementById('cooldown-bar');
    const btn = document.getElementById('roll-btn');
    btn.disabled = true;
    
    bar.style.transition = 'none';
    bar.style.transform = 'scaleX(0)';
    void bar.offsetWidth;
    bar.style.transition = `transform ${cooldownMs}ms linear`;
    bar.style.transform = 'scaleX(1)';
    
    setTimeout(() => {
      isRolling = false;
      btn.disabled = false;
    }, cooldownMs);
  } else {
    lastRolledChar = char;
    setTimeout(() => {
      isRolling = false;
    }, cooldownMs);
  }
}

function toggleAutoRoll(forceState = null) {
  if (state.upgrades.auto === 0) return;
  
  const targetState = forceState !== null ? forceState : !state.autoRollActive;
  
  // Clear any existing timer to prevent duplicates
  clearTimeout(autoRollTimer);
  
  state.autoRollActive = targetState;
  const btn = document.getElementById('auto-roll-btn');
  
  if (state.autoRollActive) {
    btn.classList.add('active');
    btn.textContent = "Auto-Summon: ON";
    autoRollLoop();
  } else {
    btn.classList.remove('active');
    btn.textContent = "Auto-Summon: OFF";
  }
}

function autoRollLoop() {
  if (!state.autoRollActive) return;
  if (!isRolling) {
    performRoll();
  }
  autoRollTimer = setTimeout(autoRollLoop, getCooldownMs() + 50);
}

// --- MODALS ---
const rulesModal = document.getElementById('rules-modal');
const bossModal = document.getElementById('boss-modal');
const indexModal = document.getElementById('index-modal');
const questsModal = document.getElementById('quests-modal');

const relicsModal = document.getElementById('relics-modal');

document.getElementById('open-rules-btn').addEventListener('click', () => {
  populateRarityTable();
  rulesModal.style.display = 'flex';
});
document.getElementById('close-rules-btn').addEventListener('click', () => rulesModal.style.display = 'none');

document.getElementById('open-boss-btn').addEventListener('click', () => {
  selectedParty = [];
  renderBossPartySelection();
  document.getElementById('battle-log').style.display = 'none';
  bossModal.style.display = 'flex';
});
document.getElementById('close-boss-btn').addEventListener('click', () => bossModal.style.display = 'none');

document.getElementById('open-index-btn').addEventListener('click', () => {
  renderIndex();
  indexModal.style.display = 'flex';
});
document.getElementById('close-index-btn').addEventListener('click', () => indexModal.style.display = 'none');

document.getElementById('open-quests-btn').addEventListener('click', () => {
  renderQuests();
  questsModal.style.display = 'flex';
});
document.getElementById('close-quests-btn').addEventListener('click', () => questsModal.style.display = 'none');

document.getElementById('open-relics-btn').addEventListener('click', () => {
  renderRelics();
  relicsModal.style.display = 'flex';
});
document.getElementById('close-relics-btn').addEventListener('click', () => relicsModal.style.display = 'none');

document.getElementById('rebirth-btn').addEventListener('click', () => {
  if (confirm("Are you sure you want to Prestige? You will lose all Gold, Upgrades, Vanguard, and Dungeon Progress. But you will earn a permanent global 2x multiplier!")) {
    state.prestige++;
    const pres = state.prestige;
    const pUnlocked = state.unlocked;
    const pRewards = state.claimedRewards;
    const pRelics = state.relics;
    
    state = getInitialState();
    state.prestige = pres;
    state.unlocked = pUnlocked;
    state.claimedRewards = pRewards;
    state.relics = pRelics;
    
    saveState();
    playSfx('battleWin');
    notify("PRESTIGE ACTIVATED!", "#f59e0b");
    updateStats();
    renderArmy();
    renderUpgrades();
  }
});

function populateRarityTable() {
  const tbody = document.getElementById('rarity-table-body');
  tbody.innerHTML = '';
  
  const rarities = [...new Set(CHARACTERS.map(c => c.rarity))];
  rarities.forEach(r => {
    const charsOfRarity = CHARACTERS.filter(c => c.rarity === r);
    const color = charsOfRarity[0].color.startsWith('linear') ? '#b8860b' : charsOfRarity[0].color;
    const lowestChance = Math.min(...charsOfRarity.map(c => c.chance));
    const highestChance = Math.max(...charsOfRarity.map(c => c.chance));
    const chanceStr = lowestChance === highestChance ? `1 in ${lowestChance}` : `1 in ${lowestChance} - ${highestChance}`;
    
    tbody.innerHTML += `
      <tr>
        <td style="font-weight: bold;">${r}</td>
        <td>${chanceStr}</td>
        <td><span class="color-swatch" style="background: ${color};"></span></td>
      </tr>
    `;
  });
}

function renderBossPartySelection() {
  const floorIndex = Math.min(state.currentDungeonFloor - 1, DUNGEON_BOSSES.length - 1);
  const boss = DUNGEON_BOSSES[floorIndex];
  
  document.getElementById('dungeon-title').textContent = `The Dungeon - Floor ${state.currentDungeonFloor}`;
  document.getElementById('boss-name-text').textContent = boss.name;
  document.getElementById('boss-hp-text').textContent = boss.hp + " Vitality";
  document.getElementById('boss-reward-text').textContent = boss.reward + " Gold";
  document.getElementById('boss-req-text').textContent = boss.req;
  
  const bossImg = document.getElementById('boss-visual-img');
  bossImg.src = boss.visual;
  bossImg.style.filter = boss.cssFilter || 'none';

  const list = document.getElementById('boss-party-list');
  list.innerHTML = '';
  
  const availableChars = [];
  Object.keys(state.army).forEach(id => {
    const totalCount = state.army[id];
    const selectedCount = selectedParty.filter(sid => sid === id).length;
    
    if (totalCount - selectedCount > 0) {
      availableChars.push(CHARACTERS.find(c => c.id === id));
    }
  });

  availableChars.sort((a,b) => getBasePower(b) - getBasePower(a)).forEach(char => {
    const el = document.createElement('div');
    el.className = 'army-item selectable';
    el.style.borderLeftColor = char.color.startsWith('linear') ? '#b8860b' : char.color;
    
    const power = getBasePower(char);
    el.innerHTML = `
      <div class="army-info-container">
        <div class="army-visual"><img src="${char.visual}" style="filter: ${char.cssFilter || 'none'};" /></div>
        <div class="army-info">
          <span class="army-name">${char.name}</span>
          <span class="army-stats-small"><span class="str">Power: ${power}</span></span>
        </div>
      </div>
      <div>Click to Add</div>
    `;
    
    el.addEventListener('click', () => {
      if (selectedParty.length < 3) {
        selectedParty.push(char.id);
        renderBossPartySelection();
      }
    });
    
    list.appendChild(el);
  });
  
  // Render selected
  const log = document.getElementById('battle-log');
  log.style.display = 'block';
  log.innerHTML = `<span style="color:#fff">Selected Party (${selectedParty.length}/3):</span><br/>`;
  if (selectedParty.length === 0) log.innerHTML += `None<br/>`;
  
  let totalStr = 0;
  selectedParty.forEach((id, index) => {
    const char = CHARACTERS.find(c => c.id === id);
    const power = getBasePower(char);
    totalStr += power;
    log.innerHTML += `${index+1}. ${char.name} (Power: ${power}) <br/>`;
  });
  
  totalStr = Math.floor(totalStr * getTacticsMultiplier());
  
  document.getElementById('party-total-str').textContent = totalStr;
  
  const fightBtn = document.getElementById('start-fight-btn');
  fightBtn.disabled = selectedParty.length === 0;
  
  // Unbind old events to prevent multiple triggers
  const newFightBtn = fightBtn.cloneNode(true);
  fightBtn.parentNode.replaceChild(newFightBtn, fightBtn);
  newFightBtn.addEventListener('click', () => executeBossBattle(totalStr, boss));
}

function executeBossBattle(partyStr, boss) {
  const log = document.getElementById('battle-log');
  log.innerHTML += `\n<span style="color:gold;">--- BATTLE COMMENCES ---</span>\n`;
  log.innerHTML += `Your party charges at ${boss.name} with ${partyStr} Power!\n`;
  
  document.getElementById('start-fight-btn').disabled = true;

  setTimeout(() => {
    if (partyStr >= boss.req) {
      playSfx('battleWin');
      log.innerHTML += `<span style="color:#4ade80;">VICTORY! ${boss.name} is slain!</span>\n`;
      log.innerHTML += `Bounty Acquired: <span style="color:gold;">${boss.reward} Gold</span>!\n`;
      
      state.coins += boss.reward;
      
      // Relic Drop Chance
      if (Math.random() < 0.33) {
        const relic = RELICS[Math.floor(Math.random() * RELICS.length)];
        state.relics[relic.id] = (state.relics[relic.id] || 0) + 1;
        log.innerHTML += `Artifact Recovered: <span style="color:#c084fc;">${relic.name}</span>!\n`;
        playSfx('upgrade');
      }
      
      state.currentDungeonFloor++;
      
      log.innerHTML += `Your heroes survive to see another day.\n`;
      selectedParty = [];
      saveState();
      updateStats();
      renderArmy();
      renderUpgrades();
    } else {
      playSfx('battleLose');
      log.innerHTML += `<span style="color:#ff4444;">DEFEAT! Your party lacked the power...</span>\n`;
      log.innerHTML += `The heroes retreat back to the Vanguard to fight another day.\n`;
      
      selectedParty = [];
      saveState();
      updateStats();
      renderArmy();
    }
    
    // Refresh view
    setTimeout(renderBossPartySelection, 3000);
    
  }, 1000);
}

function renderIndex() {
  const grid = document.getElementById('index-grid');
  grid.innerHTML = '';
  
  // Sort characters by chance (rarity)
  const sorted = [...CHARACTERS].sort((a, b) => a.chance - b.chance);
  
  sorted.forEach(char => {
    const isUnlocked = state.unlocked[char.id];
    const el = document.createElement('div');
    el.className = `index-item ${isUnlocked ? '' : 'locked'}`;
    if (isUnlocked) {
      el.style.borderColor = char.color.startsWith('linear') ? '#b8860b' : char.color;
    }
    
    let imgFilter = char.cssFilter || 'none';
    if (!isUnlocked) {
      imgFilter = 'brightness(0) contrast(100%) opacity(0.5)';
    }
    
    el.innerHTML = `
      <img src="${char.visual}" alt="${char.name}" style="filter: ${imgFilter};" />
      <span class="index-name">${isUnlocked ? char.name : '???'}</span>
      <span style="font-size: 0.8rem; font-family: 'Marcellus SC', serif; color: #5c4033;">${isUnlocked ? char.rarity : 'Unknown Rarity'}</span>
    `;
    grid.appendChild(el);
  });
}

let currentQuestPage = 0;

document.getElementById('book-prev-btn').addEventListener('click', () => {
  if (currentQuestPage > 0) {
    currentQuestPage--;
    playSfx('click');
    renderQuests();
  }
});

document.getElementById('book-next-btn').addEventListener('click', () => {
  const maxPage = Math.ceil(MISSIONS.length / 2) - 1;
  if (currentQuestPage < maxPage) {
    currentQuestPage++;
    playSfx('click');
    renderQuests();
  }
});

function buildQuestHtml(mission) {
  const isCompleted = mission.req();
  const isClaimed = state.claimedRewards[mission.id];
  
  let btnHtml = '';
  if (isClaimed) {
    btnHtml = `<button class="btn btn-secondary" disabled style="background: transparent; color: #8b0000; border: 2px dashed #8b0000; font-size: 1.2rem;">Bounty Claimed</button>`;
  } else if (isCompleted) {
    btnHtml = `<button class="btn btn-primary claim-btn" data-id="${mission.id}" style="background: linear-gradient(#b8860b, #8b5a2b); font-size: 1.2rem;">Claim Bounty</button>`;
  } else {
    btnHtml = `<button class="btn btn-secondary" disabled>In Progress...</button>`;
  }
  
  return `
    <h2 style="font-family: 'MedievalSharp', cursive; color: #8b0000; border-bottom: 2px solid rgba(139, 69, 19, 0.3); padding-bottom: 0.5rem; text-shadow: none;">${mission.title}</h2>
    <p style="font-size: 1.1rem; line-height: 1.6; margin: 1.5rem 0; font-style: italic;">"${mission.desc}"</p>
    <div style="font-family: 'Marcellus SC', serif; font-size: 1.2rem; color: #5c4033; font-weight: bold; margin: 2rem 0; padding: 1rem; background: rgba(139, 69, 19, 0.1); border-radius: 4px;">
      Reward: ${mission.rewardText}
    </div>
    <div style="margin-top: 2rem; text-align: center;">
      ${btnHtml}
    </div>
  `;
}

function attachQuestListener(pageEl, mission) {
  const isCompleted = mission.req();
  const isClaimed = state.claimedRewards[mission.id];
  if (isCompleted && !isClaimed) {
    const btn = pageEl.querySelector('.claim-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        mission.reward();
        state.claimedRewards[mission.id] = true;
        playSfx('upgrade');
        saveState();
        updateStats();
        renderUpgrades();
        renderQuests(); 
        notify(`Claimed ${mission.title} Reward!`, '#2e8b57');
      });
    }
  }
}

function renderQuests() {
  const leftPage = document.getElementById('book-page-left');
  const rightPage = document.getElementById('book-page-right');
  
  // Trigger animation
  leftPage.classList.remove('anim-page-turn');
  rightPage.classList.remove('anim-page-turn');
  void leftPage.offsetWidth; // trigger reflow
  leftPage.classList.add('anim-page-turn');
  rightPage.classList.add('anim-page-turn');
  
  const m1 = MISSIONS[currentQuestPage * 2];
  const m2 = MISSIONS[currentQuestPage * 2 + 1];
  
  leftPage.innerHTML = m1 ? buildQuestHtml(m1) : '<h2 style="color: #8b0000; text-shadow: none;">Blank Page</h2>';
  rightPage.innerHTML = m2 ? buildQuestHtml(m2) : '<h2 style="color: #8b0000; text-shadow: none;">Blank Page</h2>';
  
  // Attach listeners
  if (m1) attachQuestListener(leftPage, m1);
  if (m2) attachQuestListener(rightPage, m2);
  
  document.getElementById('book-page-number').textContent = `Pages ${currentQuestPage * 2 + 1} - ${currentQuestPage * 2 + 2}`;
  
  const maxPage = Math.ceil(MISSIONS.length / 2) - 1;
  document.getElementById('book-prev-btn').disabled = currentQuestPage === 0;
  document.getElementById('book-next-btn').disabled = currentQuestPage >= maxPage;
}

// --- UI UPDATES ---
function updateStats() {
  document.getElementById('coins-display').textContent = Math.floor(state.coins);
  document.getElementById('rolls-display').textContent = state.totalRolls;
  document.getElementById('luck-display').textContent = getLuckMultiplier().toFixed(1) + 'x';
  document.getElementById('prestige-display').textContent = getPrestigeMult().toFixed(1) + 'x';
  
  if (state.prestige > 0 || Object.keys(state.unlocked).length >= CHARACTERS.length || state.currentDungeonFloor > DUNGEON_BOSSES.length) {
    document.getElementById('rebirth-btn').style.display = 'inline-block';
    document.getElementById('prestige-box').style.display = 'block';
  }
}

function renderRelics() {
  const list = document.getElementById('relics-list');
  list.innerHTML = '';
  
  RELICS.forEach(relic => {
    const level = state.relics[relic.id] || 0;
    const el = document.createElement('div');
    el.className = 'quest-item';
    el.innerHTML = `
      <div class="quest-info">
        <h3>${relic.name} (Lvl ${level})</h3>
        <p>${relic.desc}</p>
        <div class="quest-reward" style="color: #c084fc;">Current Bonus: +${Math.floor(level * relic.mult * 100)}%</div>
      </div>
    `;
    list.appendChild(el);
  });
}

function updateDisplay(char) {
  const display = document.getElementById('current-character-display');
  const visualEl = document.getElementById('char-visual');
  const placeholderEl = display.querySelector('.visual-placeholder');
  const nameEl = document.getElementById('char-name');
  const rarityEl = document.getElementById('char-rarity');
  const statsEl = document.getElementById('char-stats');
  const hpEl = document.getElementById('char-hp');
  const strEl = document.getElementById('char-str');
  
  placeholderEl.style.display = 'none';
  visualEl.style.opacity = '1';
  visualEl.src = char.visual;
  visualEl.className = 'character-visual ' + char.anim;
  visualEl.style.filter = char.cssFilter ? char.cssFilter : 'none';
  
  nameEl.textContent = char.name;
  rarityEl.textContent = `1 in ${char.chance} • ${char.rarity}`;
  
  statsEl.style.display = 'flex';
  hpEl.textContent = char.hp;
  strEl.textContent = char.str;
  
  if (char.color.startsWith('linear-gradient')) {
    nameEl.style.color = 'transparent';
    nameEl.style.backgroundImage = char.color;
    nameEl.style.webkitBackgroundClip = 'text';
  } else {
    nameEl.style.color = char.color;
    nameEl.style.backgroundImage = 'none';
    nameEl.style.webkitBackgroundClip = 'initial';
  }
  
  if (char.glow) {
    display.style.boxShadow = `0 5px 20px rgba(0, 0, 0, 0.8), inset 0 0 50px rgba(139, 90, 43, 0.4), ${char.glow}`;
    display.style.borderColor = char.color;
  } else {
    display.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.8), inset 0 0 50px rgba(139, 90, 43, 0.4)';
    display.style.borderColor = 'var(--parchment-border)';
  }
}

function renderArmy() {
  const list = document.getElementById('army-list');
  list.innerHTML = '';
  
  const armyChars = Object.keys(state.army)
    .filter(id => state.army[id] > 0)
    .map(id => CHARACTERS.find(c => c.id === id))
    .sort((a, b) => b.chance - a.chance);
    
  if (armyChars.length === 0) {
    list.innerHTML = '<p style="color: var(--text-secondary); text-align: center; font-family: \'Marcellus SC\', serif;">Your vanguard is empty. Summon heroes!</p>';
    return;
  }

  armyChars.forEach(char => {
    const count = state.army[char.id];
    const sellValue = Math.floor(char.value * getSellMultiplier());
    const power = getBasePower(char);
    const hp = getBaseHp(char);
    const ascLvl = state.ascensions[char.id] || 0;
    const equips = state.equipment[char.id] || [];
    
    let sellAmount = 1;
    if (currentDismissMult === 'MAX') {
      sellAmount = count;
    } else {
      sellAmount = Math.min(count, currentDismissMult);
    }
    
    const el = document.createElement('div');
    el.className = 'army-item';
    el.style.borderLeftColor = char.color.startsWith('linear') ? '#b8860b' : char.color;
    
    el.innerHTML = `
      <div class="army-info-container">
        <div class="army-visual">
          <img src="${char.visual}" alt="${char.name}" style="filter: ${char.cssFilter || 'none'};" />
        </div>
        <div class="army-info">
          <span class="army-name" style="color: ${char.color.startsWith('linear') ? '#b8860b' : char.color}">${char.name}</span>
          <span class="army-rarity">${char.rarity}</span>
          <div class="army-stats-small">
            <span class="hp">Vitality: ${hp}</span>
            <span class="str">Power: ${power} ${ascLvl > 0 ? `<span style="color: #4ade80;">(+${ascLvl})</span>` : ''}</span>
            ${equips.length > 0 ? `<span style="color: #c084fc; font-size: 0.7rem; display: block; width: 100%;">Equipped: ${equips.length} Artifacts</span>` : ''}
          </div>
        </div>
      </div>
      <div class="army-actions">
        <span class="army-count">x${count}</span>
        ${count >= 10 ? `<button class="btn-sell btn-ascend" data-id="${char.id}" style="background: linear-gradient(to bottom, #15803d, #14532d); border-color: #14532d;">Ascend (10x)</button>` : ''}
        <button class="btn-sell btn-equip" data-id="${char.id}" style="background: linear-gradient(to bottom, #6b21a8, #4c1d95); border-color: #4c1d95;">Equip Artifact</button>
        <button class="btn-sell sell-dynamic" data-id="${char.id}">Dismiss ${sellAmount} (+${sellValue * sellAmount}G)</button>
      </div>
    `;
    
    el.querySelector('.sell-dynamic').addEventListener('click', () => {
      sellCharacter(char.id, sellValue, sellAmount);
    });
    
    const ascendBtn = el.querySelector('.btn-ascend');
    if (ascendBtn) {
      ascendBtn.addEventListener('click', () => {
        if (state.army[char.id] >= 10) {
          state.army[char.id] -= 10;
          state.ascensions[char.id] = (state.ascensions[char.id] || 0) + 1;
          playSfx('rare');
          saveState();
          updateStats();
          renderArmy();
        }
      });
    }
    
    const equipBtn = el.querySelector('.btn-equip');
    if (equipBtn) {
      equipBtn.addEventListener('click', () => {
        renderEquipModal(char.id);
        document.getElementById('equip-modal').style.display = 'flex';
        playSfx('click');
      });
    }
    
    list.appendChild(el);
  });
}

function sellCharacter(id, sellValue, amount = 1) {
  if (state.army[id] >= amount) {
    state.army[id] -= amount;
    state.coins += (sellValue * amount);
    playSfx('coins');
    saveState();
    updateStats();
    renderArmy();
    renderUpgrades();
  }
}

function renderUpgrades() {
  const list = document.getElementById('upgrades-list');
  list.innerHTML = '';
  
  const sortedUpgrades = [...UPGRADES].sort((a, b) => {
    const aMaxed = a.maxLevel && state.upgrades[a.id] >= a.maxLevel;
    const bMaxed = b.maxLevel && state.upgrades[b.id] >= b.maxLevel;
    if (aMaxed && !bMaxed) return 1;
    if (!aMaxed && bMaxed) return -1;
    return getUpgradeCost(a.id) - getUpgradeCost(b.id);
  });
  
  sortedUpgrades.forEach(upg => {
    const level = state.upgrades[upg.id];
    const maxed = upg.maxLevel && level >= upg.maxLevel;
    const cost = getUpgradeCost(upg.id);
    const canAfford = state.coins >= cost;
    
    const el = document.createElement('div');
    el.className = 'upgrade-item';
    
    el.innerHTML = `
      <div class="upgrade-header">
        <span class="upgrade-name">${upg.name}</span>
        <span class="upgrade-level">${maxed ? 'MAX' : 'Lvl ' + level}</span>
      </div>
      <div class="upgrade-desc">${upg.desc}</div>
      <button class="btn-upgrade" data-id="${upg.id}" ${(!canAfford || maxed) ? 'disabled' : ''}>
        ${maxed ? 'Maxed Out' : 'Purchase (' + cost + 'G)'}
      </button>
    `;
    
    if (!maxed) {
      el.querySelector('.btn-upgrade').addEventListener('click', () => {
        buyUpgrade(upg.id, cost);
      });
    }
    
    list.appendChild(el);
  });
  
  if (state.upgrades.auto > 0) {
    document.getElementById('auto-roll-btn').style.display = 'block';
  }
  
  if (state.upgrades.auto_sell_module > 0) {
    document.getElementById('auto-sell-config').style.display = 'block';
  } else {
    document.getElementById('auto-sell-config').style.display = 'none';
  }
}

function buyUpgrade(id, cost) {
  if (state.coins >= cost) {
    state.coins -= cost;
    state.upgrades[id]++;
    playSfx('upgrade');
    saveState();
    updateStats();
    renderUpgrades();
    renderArmy(); 
  }
}

// --- MUSIC & SFX LOGIC ---
const tracks = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
];
let currentTrackIndex = 0;
let musicAudio = new Audio(tracks[0]);
musicAudio.volume = 0.3;

function nextTrack() {
  musicAudio.pause();
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  musicAudio = new Audio(tracks[currentTrackIndex]);
  musicAudio.volume = 0.3;
  musicAudio.addEventListener('ended', () => nextTrack());
  
  if (isMusicPlaying) {
    musicAudio.play().then(() => {
      notify("Playing next track...", "#c084fc");
    }).catch(e => {
      console.log('Audio error:', e);
      notify("Failed to load track. Trying next...", "#ff4444");
      setTimeout(nextTrack, 1000);
    });
  }
}

musicAudio.addEventListener('ended', () => nextTrack());

const toggleMusicBtn = document.getElementById('toggle-music-btn');
const nextTrackBtn = document.getElementById('next-track-btn');
let isMusicPlaying = false;

toggleMusicBtn.addEventListener('click', () => {
  if (isMusicPlaying) {
    musicAudio.pause();
    toggleMusicBtn.textContent = 'Play Music';
    nextTrackBtn.style.display = 'none';
    isMusicPlaying = false;
  } else {
    musicAudio.play().catch(e => console.log('Audio play failed:', e));
    toggleMusicBtn.textContent = 'Stop Music';
    nextTrackBtn.style.display = 'inline-block';
    isMusicPlaying = true;
  }
});

nextTrackBtn.addEventListener('click', () => {
  nextTrack();
});

// Create an AudioContext for SFX Synthesis
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(e => console.log("Failed to resume AudioContext:", e));
  }
}

// Automatically unlock the AudioContext on the first user interaction
const unlockAudio = () => {
  initAudioContext();
  window.removeEventListener('click', unlockAudio);
  window.removeEventListener('keydown', unlockAudio);
  window.removeEventListener('touchstart', unlockAudio);
};
window.addEventListener('click', unlockAudio, { passive: true });
window.addEventListener('keydown', unlockAudio, { passive: true });
window.addEventListener('touchstart', unlockAudio, { passive: true });

function playTone(freq, type, duration, vol=0.1) {
  initAudioContext();
  if (!audioCtx || audioCtx.state === 'suspended') return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function playSfx(type) {
  initAudioContext();
  if (!audioCtx) return;
  if (type === 'click') {
    playTone(600, 'sine', 0.1, 0.1);
  } else if (type === 'summon_common') {
    playTone(800, 'square', 0.1, 0.1);
    setTimeout(() => playTone(1200, 'sine', 0.2, 0.1), 100);
  } else if (type === 'summon_uncommon') {
    playTone(600, 'triangle', 0.1, 0.1);
    setTimeout(() => playTone(800, 'triangle', 0.1, 0.15), 100);
    setTimeout(() => playTone(1000, 'sine', 0.2, 0.2), 200);
  } else if (type === 'summon_rare') {
    playTone(500, 'square', 0.15, 0.15);
    setTimeout(() => playTone(750, 'square', 0.15, 0.2), 150);
    setTimeout(() => playTone(1100, 'sine', 0.3, 0.25), 300);
  } else if (type === 'summon_epic') {
    playTone(400, 'sawtooth', 0.2, 0.2);
    setTimeout(() => playTone(600, 'sawtooth', 0.2, 0.25), 200);
    setTimeout(() => playTone(800, 'sawtooth', 0.2, 0.3), 400);
    setTimeout(() => playTone(1200, 'sine', 0.5, 0.35), 600);
  } else if (type === 'summon_legendary') {
    playTone(300, 'sawtooth', 0.3, 0.3);
    setTimeout(() => playTone(450, 'sawtooth', 0.3, 0.3), 300);
    setTimeout(() => playTone(600, 'sawtooth', 0.3, 0.3), 600);
    setTimeout(() => playTone(900, 'square', 0.6, 0.4), 900);
  } else if (type === 'summon_mythic' || type === 'summon_divine') {
    playTone(150, 'sawtooth', 1.0, 0.5);
    setTimeout(() => playTone(100, 'sawtooth', 1.5, 0.6), 200);
    setTimeout(() => playTone(50, 'square', 2.0, 0.8), 500);
    setTimeout(() => playTone(1500, 'sine', 0.2, 0.3), 1000);
    setTimeout(() => playTone(2000, 'sine', 0.3, 0.3), 1200);
    setTimeout(() => playTone(2500, 'sine', 0.4, 0.3), 1400);
  } else if (type === 'coins') {
    playTone(1500, 'sine', 0.1, 0.1);
    setTimeout(() => playTone(2000, 'sine', 0.2, 0.1), 50);
  } else if (type === 'upgrade') {
    playTone(400, 'square', 0.2, 0.1);
    setTimeout(() => playTone(600, 'square', 0.2, 0.1), 150);
    setTimeout(() => playTone(800, 'square', 0.4, 0.1), 300);
  } else if (type === 'battleWin') {
    playTone(400, 'square', 0.2, 0.15);
    setTimeout(() => playTone(500, 'square', 0.2, 0.15), 200);
    setTimeout(() => playTone(600, 'square', 0.4, 0.15), 400);
  } else if (type === 'battleLose') {
    playTone(300, 'sawtooth', 0.3, 0.15);
    setTimeout(() => playTone(250, 'sawtooth', 0.3, 0.15), 300);
    setTimeout(() => playTone(200, 'sawtooth', 0.6, 0.15), 600);
  }
}

// Add click sounds to all buttons generally
document.addEventListener('click', (e) => {
  if (e.target.closest('button') && !e.target.closest('.btn-sell') && !e.target.closest('.btn-upgrade') && e.target.id !== 'roll-btn' && e.target.id !== 'start-fight-btn') {
    playSfx('click');
  }
});

// --- IMAGE TRANSPARENCY PROCESSING ---
const makeImageTransparent = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      
      // Sample the top-left pixel
      const rBg = data[0], gBg = data[1], bBg = data[2], aBg = data[3];
      
      // If the background is not already transparent, key out the background color
      if (aBg > 0) {
        const isWhiteBg = rBg > 230 && gBg > 230 && bBg > 230;
        const isBlackBg = rBg < 25 && gBg < 25 && bBg < 25;
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i+1], b = data[i+2];
          const distance = Math.sqrt((r - rBg)**2 + (g - gBg)**2 + (b - bBg)**2);
          
          let threshold = 55;
          if (isWhiteBg) {
            threshold = 135;
          } else if (isBlackBg) {
            threshold = 120;
          }
          
          if (distance < threshold) {
            data[i+3] = 0;
          } else if (isWhiteBg && r > 238 && g > 238 && b > 238) {
            data[i+3] = 0;
          } else if (isBlackBg && r < 18 && g < 18 && b < 18) {
            data[i+3] = 0;
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);
      resolve(canvas.toDataURL());
    };
    img.onerror = () => {
      resolve(src);
    };
    img.src = src;
  });
};

async function preprocessCharacterVisuals() {
  for (const char of CHARACTERS) {
    if (char.visual.endsWith('.png')) {
      try {
        char.visual = await makeImageTransparent(char.visual);
      } catch (e) {
        console.error("Failed to make image transparent:", char.visual, e);
      }
    }
  }
}

// --- INIT ---
document.getElementById('roll-btn').addEventListener('click', performRoll);
document.getElementById('auto-roll-btn').addEventListener('click', () => toggleAutoRoll());
document.getElementById('save-btn').addEventListener('click', () => {
  saveState();
  notify('Game Saved Successfully!', '#2e8b57');
});

// Start at Main Menu after pre-processing assets
preprocessCharacterVisuals().then(() => {
  loadSaveSlotsUI();
}).catch(() => {
  loadSaveSlotsUI();
});

// Handle visibility change catchup for background throttling
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    if (lastRolledChar) {
      updateDisplay(lastRolledChar);
      lastRolledChar = null;
    }
    updateStats();
    renderArmy();
    renderUpgrades();
  }
});

// Auto Sell Config Setup
['Common', 'Uncommon', 'Rare', 'Epic'].forEach(rarity => {
  const checkbox = document.getElementById('auto-sell-' + rarity);
  checkbox.addEventListener('change', (e) => {
    state.autoSellConfig[rarity] = e.target.checked;
    saveState();
    playSfx('click');
  });
});

// Update checkboxes from state when game loads
function updateAutoSellUI() {
  ['Common', 'Uncommon', 'Rare', 'Epic'].forEach(rarity => {
    const checkbox = document.getElementById('auto-sell-' + rarity);
    if(checkbox) checkbox.checked = state.autoSellConfig[rarity];
  });
}

// Dismiss Multiplier Toggles
document.querySelectorAll('.btn-toggle').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.btn-toggle').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    const mult = e.target.getAttribute('data-mult');
    if (mult === 'MAX') {
      currentDismissMult = 'MAX';
    } else {
      currentDismissMult = parseInt(mult, 10);
    }
    
    renderArmy(); // Re-render to update the button text and amounts
    playSfx('click');
  });
});

// --- EQUIP MODAL LOGIC ---
const equipModal = document.getElementById('equip-modal');
document.getElementById('close-equip-btn').addEventListener('click', () => equipModal.style.display = 'none');

let equipTargetCharId = null;

function renderEquipModal(charId) {
  equipTargetCharId = charId;
  const char = CHARACTERS.find(c => c.id === charId);
  document.getElementById('equip-hero-name').textContent = char.name;
  
  const list = document.getElementById('equip-list');
  list.innerHTML = '';
  
  // Calculate total owned vs equipped
  const allEquippedCounts = {};
  Object.values(state.equipment).forEach(arr => {
    arr.forEach(rId => {
      allEquippedCounts[rId] = (allEquippedCounts[rId] || 0) + 1;
    });
  });
  
  RELICS.forEach(relic => {
    const owned = state.relics[relic.id] || 0;
    const equipped = allEquippedCounts[relic.id] || 0;
    const available = owned - equipped;
    
    if (available > 0) {
      const el = document.createElement('div');
      el.className = 'quest-item';
      el.innerHTML = `
        <div class="quest-info">
          <h3>${relic.name} (Available: ${available})</h3>
          <p style="color: #4ade80;">${relic.equipDesc}</p>
        </div>
        <button class="btn btn-primary btn-equip-action" data-id="${relic.id}">Equip</button>
      `;
      el.querySelector('.btn-equip-action').addEventListener('click', () => {
        if (!state.equipment[charId]) state.equipment[charId] = [];
        state.equipment[charId].push(relic.id);
        playSfx('upgrade');
        saveState();
        renderEquipModal(charId);
        renderArmy();
      });
      list.appendChild(el);
    }
  });
  
  if (list.innerHTML === '') {
    list.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No artifacts available to equip. Defeat Dungeon Bosses to find more!</p>';
  }
  
  // Render Equipped List
  const eqList = document.getElementById('equipped-list');
  eqList.innerHTML = '';
  const myEquips = state.equipment[charId] || [];
  myEquips.forEach((rId, index) => {
    const r = RELICS.find(x => x.id === rId);
    const el = document.createElement('div');
    el.style.background = 'rgba(0,0,0,0.5)';
    el.style.padding = '0.5rem';
    el.style.border = '1px solid #c084fc';
    el.style.borderRadius = '4px';
    el.innerHTML = `<span style="color: #c084fc; font-size: 0.9rem;">${r.name}</span> <button class="btn-sell" style="padding: 0.1rem 0.4rem; font-size: 0.8rem; display: inline-block; width: auto; margin-left: 0.5rem;">Unequip</button>`;
    el.querySelector('button').addEventListener('click', () => {
      state.equipment[charId].splice(index, 1);
      playSfx('click');
      saveState();
      renderEquipModal(charId);
      renderArmy();
    });
    eqList.appendChild(el);
  });
}

