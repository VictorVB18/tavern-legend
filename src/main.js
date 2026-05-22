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
  { id: 'steam_golem', name: "Steam Golem", visual: "/chars/steam_golem.png", rarity: "Rare", chance: 320, color: "#f97316", value: 140, hp: 110, str: 20, anim: 'anim-shake' },
  { id: 'assassin', name: "Shadow Assassin", visual: "/chars/assassin.png", rarity: "Rare", chance: 350, color: "#60a5fa", value: 150, hp: 30, str: 40, anim: 'anim-float' },
  { id: 'knight', name: "Noble Knight", visual: "/chars/knight.png", rarity: "Rare", chance: 500, color: "#3b82f6", value: 250, hp: 80, str: 20, anim: 'anim-float' },
  { id: 'spectral_knight', name: "Spectral Knight", visual: "/chars/knight.png", cssFilter: "hue-rotate(120deg) saturate(1.5) opacity(0.8)", rarity: "Epic", chance: 1500, color: "#c084fc", value: 800, hp: 100, str: 45, anim: 'anim-float' },
  { id: 'vampire', name: "Vampire Lord", visual: "/chars/vampire.png", rarity: "Epic", chance: 1800, color: "#ef4444", value: 900, hp: 100, str: 80, anim: 'anim-float' },
  { id: 'mage', name: "Dark Mage", visual: "/chars/mage.png", rarity: "Epic", chance: 2000, color: "#c084fc", value: 1000, hp: 60, str: 50, anim: 'anim-float' },
  { id: 'necromancer', name: "Necromancer", visual: "/chars/necromancer.png", rarity: "Epic", chance: 2200, color: "#a855f7", value: 1100, hp: 75, str: 65, anim: 'anim-float' },
  { id: 'storm_summoner', name: "Storm Summoner", visual: "/chars/storm_summoner.png", rarity: "Epic", chance: 2500, color: "#06b6d4", value: 1250, hp: 70, str: 55, anim: 'anim-float' },
  { id: 'clockwork_tinker', name: "Clockwork Tinker", visual: "/chars/clockwork_tinker.png", rarity: "Epic", chance: 2600, color: "#06b6d4", value: 1300, hp: 80, str: 60, anim: 'anim-float' },
  { id: 'lunar_warden', name: "Lunar Warden", visual: "/chars/lunar_warden.png", rarity: "Epic", chance: 3000, color: "#06b6d4", value: 1500, hp: 90, str: 70, anim: 'anim-float' },
  { id: 'dark_elf', name: "Dark Elf Ranger", visual: "/chars/elf.png", cssFilter: "hue-rotate(240deg) saturate(1.5) brightness(0.8)", rarity: "Epic", chance: 2800, color: "#a855f7", value: 1400, hp: 85, str: 55, anim: 'anim-float' },
  { id: 'paladin', name: "Holy Paladin", visual: "/chars/paladin.png", rarity: "Epic", chance: 3500, color: "#a855f7", value: 1800, hp: 200, str: 60, anim: 'anim-shake' },
  { id: 'demon', name: "Demon Brute", visual: "/chars/demon.png", rarity: "Epic", chance: 5000, color: "#a855f7", value: 2500, hp: 150, str: 75, anim: 'anim-shake' },
  { id: 'frost_dragon', name: "Frost Dragon", visual: "/chars/dragon.png", cssFilter: "hue-rotate(180deg) saturate(2) brightness(1.2)", rarity: "Legendary", chance: 15000, color: "#fbbf24", value: 8000, hp: 400, str: 180, glow: "0 0 20px #60a5fa", anim: 'anim-pulse-glow' },
  { id: 'pegasus', name: "Pegasus", visual: "/chars/pegasus.png", rarity: "Legendary", chance: 18000, color: "#fcd34d", value: 8500, hp: 320, str: 220, glow: "0 0 20px #fcd34d", anim: 'anim-float' },
  { id: 'gryphon', name: "Majestic Gryphon", visual: "/chars/gryphon.png", rarity: "Legendary", chance: 20000, color: "#fcd34d", value: 9500, hp: 350, str: 250, glow: "0 0 20px #fcd34d", anim: 'anim-pulse-glow' },
  { id: 'tesla_mage', name: "Tesla Mage", visual: "/chars/tesla_mage.png", rarity: "Legendary", chance: 22000, color: "#fbbf24", value: 9000, hp: 340, str: 240, glow: "0 0 20px #06b6d4", anim: 'anim-pulse-glow' },
  { id: 'solar_valkyrie', name: "Solar Valkyrie", visual: "/chars/solar_valkyrie.png", rarity: "Legendary", chance: 30000, color: "#fbbf24", value: 11000, hp: 420, str: 260, glow: "0 0 20px #fbbf24", anim: 'anim-pulse-glow' },
  { id: 'dragon', name: "Elder Dragon", visual: "/chars/dragon.png", rarity: "Legendary", chance: 25000, color: "#fbbf24", value: 10000, hp: 500, str: 200, glow: "0 0 20px #fbbf24", anim: 'anim-pulse-glow' },
  { id: 'phoenix', name: "Fiery Phoenix", visual: "/chars/phoenix.png", rarity: "Legendary", chance: 50000, color: "#f59e0b", value: 25000, hp: 300, str: 350, glow: "0 0 25px #f59e0b", anim: 'anim-pulse-glow' },
  { id: 'archangel', name: "Archangel", visual: "/chars/archangel.png", rarity: "Legendary", chance: 100000, color: "#f59e0b", value: 50000, hp: 400, str: 250, glow: "0 0 30px #f59e0b", anim: 'anim-pulse-glow' },
  { id: 'void_mage', name: "Void Mage", visual: "/chars/mage.png", cssFilter: "invert(1) hue-rotate(180deg) contrast(1.5)", rarity: "Mythic", chance: 300000, color: "#ef4444", value: 150000, hp: 800, str: 600, glow: "0 0 30px #a855f7", anim: 'anim-shake' },
  { id: 'void_stalker', name: "Void Stalker", visual: "/chars/void_stalker.png", rarity: "Mythic", chance: 350000, color: "#a78bfa", value: 180000, hp: 1000, str: 650, glow: "0 0 35px #a78bfa", anim: 'anim-shake' },
  { id: 'clockwork_alchemist', name: "Clockwork Alchemist", visual: "/chars/clockwork_alchemist.png", rarity: "Mythic", chance: 380000, color: "#a78bfa", value: 190000, hp: 1100, str: 680, glow: "0 0 35px #a78bfa", anim: 'anim-shake' },
  { id: 'nebula_serpent', name: "Nebula Serpent", visual: "/chars/nebula_serpent.png", rarity: "Mythic", chance: 420000, color: "#a78bfa", value: 210000, hp: 1300, str: 720, glow: "0 0 35px #a78bfa", anim: 'anim-float' },
  { id: 'time_weaver', name: "Time Weaver", visual: "/chars/time_weaver.png", rarity: "Mythic", chance: 400000, color: "#60a5fa", value: 200000, hp: 1200, str: 700, glow: "0 0 35px #60a5fa", anim: 'anim-pulse-glow' },
  { id: 'abyssal', name: "Abyssal Lord", visual: "/chars/abyssal.png", rarity: "Mythic", chance: 500000, color: "#ef4444", value: 250000, hp: 1500, str: 800, glow: "0 0 40px #ef4444", anim: 'anim-shake' },
  { id: 'star_weaver', name: "Star Weaver", visual: "/chars/star_weaver.png", rarity: "Divine", chance: 2500000, color: "linear-gradient(45deg, #a78bfa, #f472b6)", value: 1250000, hp: 6000, str: 3500, glow: "0 0 60px #f472b6, 0 0 30px #a78bfa", anim: 'anim-pulse-glow' },
  { id: 'cosmic', name: "Cosmic Entity", visual: "/chars/cosmic.png", rarity: "Divine", chance: 5000000, color: "linear-gradient(45deg, #b8860b, #5c4033)", value: 2500000, hp: 9999, str: 5000, glow: "0 0 80px #b8860b, 0 0 40px #5c4033", anim: 'anim-pulse-glow' },
  { id: 'void_singularity', name: "Void Singularity", visual: "/chars/void_singularity.png", rarity: "Eldritch", chance: 7500000, color: "linear-gradient(45deg, #00ffff, #7c3aed)", value: 5000000, hp: 15000, str: 8000, glow: "0 0 80px #00ffff, 0 0 40px #7c3aed", anim: 'anim-pulse-glow', rebirthReq: 1 },
  { id: 'celestial_empress', name: "Celestial Empress", visual: "/chars/celestial_empress.png", rarity: "Eldritch", chance: 10000000, color: "linear-gradient(45deg, #a78bfa, #00ffff)", value: 8000000, hp: 20000, str: 10000, glow: "0 0 80px #a78bfa, 0 0 40px #00ffff", anim: 'anim-float', rebirthReq: 1 },
  { id: 'astral_dragon', name: "Astral Dragon", visual: "/chars/astral_dragon.png", rarity: "Eldritch", chance: 15000000, color: "linear-gradient(45deg, #38bdf8, #ec4899)", value: 12000000, hp: 30000, str: 15000, glow: "0 0 90px #38bdf8, 0 0 45px #ec4899", anim: 'anim-shake', rebirthReq: 1 }
];

const UPGRADES = [
  { id: 'luck', name: "Loaded Dice", desc: "Increases fate multiplier by +0.2x", baseCost: 50, costMult: 1.5 },
  { id: 'speed', name: "Swift Ritual", desc: "Reduces summon cooldown by 10%", baseCost: 100, costMult: 1.6, maxLevel: 20 },
  { id: 'bargain', name: "Merchant's Guild", desc: "Increases gold from dismissing by +10%", baseCost: 200, costMult: 1.8 },
  { id: 'tactics', name: "War Tactics", desc: "Increases party power in boss fights by +5%", baseCost: 500, costMult: 2.0 },
  { id: 'wealth', name: "Tavern Income", desc: "Passively generates +1 Gold every second", baseCost: 300, costMult: 1.5 },
  { id: 'auto', name: "Auto-Summon", desc: "Unlocks constant automatic summoning", baseCost: 5000, costMult: 1, maxLevel: 1 },
  { id: 'auto_sell_module', name: "Contract of Selling", desc: "Unlocks Auto-Dismiss filters for low rarity heroes", baseCost: 100, costMult: 1, maxLevel: 1 },
  { id: 'auto_upgrade_module', name: "Auto-Upgrader", desc: "Automatically purchases the cheapest available upgrade", baseCost: 20000, costMult: 1, maxLevel: 1 }
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
  { id: 'unlock_all', title: "Legendary Collector", desc: "Unlock all heroes (Index 100%)", req: () => Object.keys(state.unlocked).length >= CHARACTERS.filter(c => !c.rebirthReq || state.prestige >= c.rebirthReq).length, rewardText: "+999,999 Gold", reward: () => state.coins += 999999 }
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

// --- ASSET URL RESOLVER ---
const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('data:')) return path;
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Get Vite's base URL (configured to '/tavern-legend/')
  const base = import.meta.env.BASE_URL || '/';
  
  // Combine base and path safely
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
};

// --- PATH REPAIR FOR SUBFOLDER HOSTING ---
CHARACTERS.forEach(c => {
  if (c.visual) c.visual = getAssetUrl(c.visual);
});
DUNGEON_BOSSES.forEach(b => {
  if (b.visual) b.visual = getAssetUrl(b.visual);
});

// --- EXPEDITION CONTRACTS ---
const EXPEDITION_CONTRACTS = [
  {
    id: 'tavern_supply', name: 'Tavern Supply Run', emoji: '🍺',
    desc: 'Gather supplies from the nearby market town.',
    duration: 2 * 60, // 2 minutes
    maxHeroes: 2,
    difficulty: 'Easy',
    diffColor: '#22c55e',
    baseSuccessRate: 80,
    rewards: () => ({
      coins: Math.floor(500 + Math.random() * 500),
      boosts: Math.random() < 0.3 ? [{ type: 'luck', label: 'Luck Boost (+1x)', duration: 5 * 60 * 1000 }] : []
    }),
    destination: '🏘️'
  },
  {
    id: 'forest_hunt', name: 'Forest Hunting Trip', emoji: '🌲',
    desc: 'Hunt for rare beasts in the enchanted forest.',
    duration: 5 * 60, // 5 minutes
    maxHeroes: 3,
    difficulty: 'Medium',
    diffColor: '#fbbf24',
    baseSuccessRate: 65,
    rewards: () => ({
      coins: Math.floor(2000 + Math.random() * 2000),
      boosts: Math.random() < 0.4 ? [{ type: 'luck', label: 'Luck Boost (+1x)', duration: 10 * 60 * 1000 }] : []
    }),
    destination: '🌲'
  },
  {
    id: 'bandit_raid', name: 'Bandit Camp Raid', emoji: '⚔️',
    desc: 'Storm a bandit hideout and seize their treasury.',
    duration: 10 * 60, // 10 minutes
    maxHeroes: 4,
    difficulty: 'Hard',
    diffColor: '#f97316',
    baseSuccessRate: 50,
    rewards: () => ({
      coins: Math.floor(8000 + Math.random() * 8000),
      boosts: Math.random() < 0.5 ? [{ type: 'speed', label: 'Haste Speed (30%)', duration: 15 * 60 * 1000 }] : []
    }),
    destination: '🏕️'
  },
  {
    id: 'dragon_lair', name: "Dragon's Lair Heist", emoji: '🐉',
    desc: 'Infiltrate a dragon hoard for legendary plunder.',
    duration: 20 * 60, // 20 minutes
    maxHeroes: 5,
    difficulty: 'Legendary',
    diffColor: '#c084fc',
    baseSuccessRate: 35,
    rewards: () => ({
      coins: Math.floor(30000 + Math.random() * 30000),
      boosts: [
        { type: 'luck', label: 'Luck Boost (+1x)', duration: 30 * 60 * 1000 },
        { type: 'speed', label: 'Haste Speed (30%)', duration: 30 * 60 * 1000 }
      ]
    }),
    destination: '🏰'
  }
];

// --- GAME STATE ---
const getInitialState = () => ({
  coins: 0,
  totalRolls: 0,
  army: {}, // id: count
  unlocked: {}, // id: true (for Index)
  unlockedAt: {}, // id: timestamp
  upgrades: { luck: 0, speed: 0, bargain: 0, tactics: 0, wealth: 0, auto: 0, auto_sell_module: 0, auto_upgrade_module: 0 },
  autoRollActive: false,
  autoUpgradeActive: false,
  claimedRewards: {}, // id: true
  autoSellConfig: { "Common": false, "Uncommon": false, "Rare": false, "Epic": false },
  lastSaveTime: Date.now(),
  currentDungeonFloor: 1,
  ascensions: {}, // id: level
  relics: {}, // id: count
  equipment: {}, // id: [relic_id, relic_id]
  prestige: 0,
  reduceMotion: false,
  activeAdventures: [], // [{contractId, heroIds, startTime, endTime, status}]
  adventuresLock: {}, // heroId: lockCount (how many expeditions the hero is on)
  expeditionBoosts: null // {luckBoostUntil, speedBoostUntil}
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
  document.body.classList.remove('celestial-mode');
  const h1 = document.querySelector('.header h1');
  if (h1) h1.textContent = "Tavern of Legends";
  
  for (let i = 1; i <= 3; i++) {
    const dataStr = localStorage.getItem(getSaveKey(i));
    const slotEl = document.querySelector(`.save-slot[data-slot="${i}"]`);
    const infoEl = slotEl.querySelector('.slot-info');
    const deleteBtn = slotEl.querySelector('.delete-slot-btn');
    const playBtn = slotEl.querySelector('.play-slot-btn');
    
    if (dataStr) {
      const data = JSON.parse(dataStr);
      if (data.prestige && data.prestige > 0) {
        infoEl.innerHTML = `Gold: ${Math.floor(data.coins)} | Summons: ${data.totalRolls} | <span style="color: #7c3aed; font-weight: bold; text-shadow: 0 0 5px rgba(124, 58, 237, 0.5);">Rebirths: ${data.prestige}</span>`;
      } else {
        infoEl.textContent = `Gold: ${Math.floor(data.coins)} | Summons: ${data.totalRolls}`;
      }
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
    if (state.reduceMotion === undefined) state.reduceMotion = false;
    if (state.autoUpgradeActive === undefined) state.autoUpgradeActive = false;
    if (!state.activeAdventures) state.activeAdventures = [];
    if (!state.adventuresLock) state.adventuresLock = {};
    if (state.expeditionBoosts === undefined) state.expeditionBoosts = null;
    
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
  
  if (state.autoUpgradeActive) {
    toggleAutoUpgrade(true);
  } else {
    toggleAutoUpgrade(false);
  }
  
  updateAutoSellUI();
  updateAccessibilityUI();
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
const getLuckMultiplier = () => {
  const luckBoostActive = state.expeditionBoosts && state.expeditionBoosts.luckBoostUntil > Date.now();
  const luckBoostMult = luckBoostActive ? 2.0 : 1.0; // +1x luck
  return (1.0 + (state.upgrades.luck * 0.2)) * getPrestigeMult() * getRelicMult('luck') * luckBoostMult;
};
const getCooldownMs = () => {
  const speedBoostActive = state.expeditionBoosts && state.expeditionBoosts.speedBoostUntil > Date.now();
  const baseCooldown = Math.max(100, 1000 * Math.pow(0.9, state.upgrades.speed));
  return speedBoostActive ? Math.floor(baseCooldown * 0.7) : baseCooldown;
};
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
  if (document.getElementById('app').style.display !== 'none') {
    if (state.upgrades.wealth > 0) {
      state.coins += state.upgrades.wealth * getSellMultiplier();
    }
    runAutoUpgrade();
    tickExpeditions();
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
  const available = CHARACTERS.filter(c => !c.rebirthReq || state.prestige >= c.rebirthReq);
  const sorted = [...available].sort((a, b) => b.chance - a.chance);
  
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
  
  if (!state.unlocked[char.id]) {
    state.unlockedAt = state.unlockedAt || {};
    state.unlockedAt[char.id] = Date.now();
  }
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
    if (!isAnyModalOpen()) {
      updateDisplay(char);
      
      // Trigger punchy card roll flash shake impact animation (skip if reduceMotion is enabled)
      const displayCard = document.getElementById('current-character-display');
      if (displayCard) {
        displayCard.classList.remove('roll-impact');
        if (!state.reduceMotion) {
          void displayCard.offsetWidth; // Force Reflow
          displayCard.classList.add('roll-impact');
        }
      }
      
      updateStats();
      if (armyChanged) {
        renderArmy();
      }
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

function toggleAutoUpgrade(forceState = null) {
  if (state.upgrades.auto_upgrade_module === 0) return;
  
  const targetState = forceState !== null ? forceState : !state.autoUpgradeActive;
  state.autoUpgradeActive = targetState;
  
  const btn = document.getElementById('auto-upgrade-btn');
  if (state.autoUpgradeActive) {
    btn.classList.add('active');
    btn.textContent = "Auto-Upgrade: ON";
    runAutoUpgrade();
  } else {
    btn.classList.remove('active');
    btn.textContent = "Auto-Upgrade: OFF";
  }
  saveState();
}

function runAutoUpgrade() {
  if (state.upgrades.auto_upgrade_module === 0 || !state.autoUpgradeActive) return;
  
  let purchasedAny = false;
  while (true) {
    const available = UPGRADES.filter(upg => {
      const level = state.upgrades[upg.id] || 0;
      const maxed = upg.maxLevel && level >= upg.maxLevel;
      return !maxed;
    });
    
    if (available.length === 0) break;
    
    available.sort((a, b) => getUpgradeCost(a.id) - getUpgradeCost(b.id));
    
    const cheapest = available[0];
    const cost = getUpgradeCost(cheapest.id);
    
    if (state.coins >= cost) {
      state.coins -= cost;
      state.upgrades[cheapest.id]++;
      purchasedAny = true;
      playSfx('upgrade');
    } else {
      break;
    }
  }
  
  if (purchasedAny) {
    saveState();
    updateStats();
    renderUpgrades();
    renderArmy();
  }
}

// --- MODALS ---
const rulesModal = document.getElementById('rules-modal');
const bossModal = document.getElementById('boss-modal');
const indexModal = document.getElementById('index-modal');
const questsModal = document.getElementById('quests-modal');

const relicsModal = document.getElementById('relics-modal');

function isAnyModalOpen() {
  if (document.getElementById('hero-detail-overlay')) return true;
  const modals = [rulesModal, bossModal, indexModal, questsModal, relicsModal, document.getElementById('expeditions-modal')];
  for (let m of modals) {
    if (m && m.style.display === 'flex') return true;
  }
  return false;
}

function refreshMainUI() {
  renderArmy();
  updateStats();
}

document.getElementById('open-rules-btn').addEventListener('click', () => {
  populateRarityTable();
  rulesModal.style.display = 'flex';
});
document.getElementById('close-rules-btn').addEventListener('click', () => { rulesModal.style.display = 'none'; refreshMainUI(); });

document.getElementById('open-boss-btn').addEventListener('click', () => {
  selectedParty = [];
  renderBossPartySelection();
  document.getElementById('battle-log').style.display = 'none';
  bossModal.style.display = 'flex';
});
document.getElementById('close-boss-btn').addEventListener('click', () => { bossModal.style.display = 'none'; refreshMainUI(); });

document.getElementById('open-index-btn').addEventListener('click', () => {
  renderIndex();
  indexModal.style.display = 'flex';
});
document.getElementById('close-index-btn').addEventListener('click', () => { indexModal.style.display = 'none'; refreshMainUI(); });

document.getElementById('open-quests-btn').addEventListener('click', () => {
  renderQuests();
  questsModal.style.display = 'flex';
});
document.getElementById('close-quests-btn').addEventListener('click', () => { questsModal.style.display = 'none'; refreshMainUI(); });

document.getElementById('open-relics-btn').addEventListener('click', () => {
  renderRelics();
  relicsModal.style.display = 'flex';
});
document.getElementById('close-relics-btn').addEventListener('click', () => { relicsModal.style.display = 'none'; refreshMainUI(); });

// --- EXPEDITION MODAL ---
const expeditionsModal = document.getElementById('expeditions-modal');
document.getElementById('open-expeditions-btn').addEventListener('click', () => {
  renderExpeditions();
  expeditionsModal.style.display = 'flex';
});
document.getElementById('close-expeditions-btn').addEventListener('click', () => { expeditionsModal.style.display = 'none'; refreshMainUI(); });

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
      <img src="${char.visual}" alt="${char.name}" style="mix-blend-mode: multiply; filter: ${imgFilter};" />
      <span class="index-name">${isUnlocked ? char.name : '???'}</span>
      <span style="font-size: 0.8rem; font-family: 'Marcellus SC', serif; color: #5c4033;">${isUnlocked ? char.rarity : 'Unknown Rarity'}</span>
    `;

    if (isUnlocked) {
      el.style.cursor = 'pointer';
      el.title = `View ${char.name}`;
      el.addEventListener('click', () => showHeroDetail(char));
    } else {
      el.style.cursor = 'not-allowed';
    }

    grid.appendChild(el);
  });
}

// Helper functions for Lore and Elements
function getHeroElement(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) { hash = name.charCodeAt(i) + ((hash << 5) - hash); }
  const elements = [
    { name: 'Fire', icon: '🔥', color: '#ef4444' },
    { name: 'Water', icon: '💧', color: '#3b82f6' },
    { name: 'Earth', icon: '⛰️', color: '#22c55e' },
    { name: 'Light', icon: '☀️', color: '#fbbf24' },
    { name: 'Dark', icon: '🌑', color: '#6b7280' },
    { name: 'Void', icon: '🌌', color: '#a78bfa' }
  ];
  return elements[Math.abs(hash) % elements.length];
}

function getHeroLore(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) { hash = name.charCodeAt(i) + ((hash << 5) - hash); }
  const prefix = ["Forged in", "Summoned from", "Banished to", "Awakened in", "A wandering soul from", "A legendary champion of", "Born under the skies of"];
  const suffix = ["the Abyssal Chasm.", "the Eternal Spire.", "the Shattered Peaks.", "the Crimson Wastes.", "the Crystal Forest.", "the Forgotten Kingdom.", "the Celestial Gate."];
  const title = ["Seeking redemption.", "Bound by a blood oath.", "Driven by an endless hunger.", "Awaiting the final battle.", "Lost to time.", "Searching for a worthy master.", "Harboring a dark secret."];
  
  return `${prefix[Math.abs(hash) % prefix.length]} ${suffix[Math.abs(hash >> 2) % suffix.length]} ${title[Math.abs(hash >> 4) % title.length]}`;
}

function showHeroDetail(char) {
  document.getElementById('hero-detail-overlay')?.remove();

  const inArmy = state.army[char.id] || 0;
  const ascLvl = state.ascensions[char.id] || 0;
  const power = getBasePower(char);
  const hp = getBaseHp(char);
  const accentColor = char.color.startsWith('linear') ? '#b8860b' : char.color;

  const element = getHeroElement(char.name);
  const lore = getHeroLore(char.name);
  const discDate = state.unlockedAt && state.unlockedAt[char.id] ? new Date(state.unlockedAt[char.id]).toLocaleDateString() : 'Unknown';

  // Determine Combat Role based on stat ratio
  let role = "Fighter";
  let roleIcon = "⚔️";
  if (hp > power * 3) { role = "Tank"; roleIcon = "🛡️"; }
  else if (power > hp * 0.8) { role = "Glass Cannon"; roleIcon = "🔥"; }
  else if (hp > power * 1.5) { role = "Bruiser"; roleIcon = "🪓"; }

  // Unique visual styling per rarity
  const rarityStyles = {
    Common: { bg: 'rgba(0,0,0,0.1)', border: '4px solid #8b5a2b', shadow: 'inset 0 0 10px rgba(0,0,0,0.5)' },
    Uncommon: { bg: 'radial-gradient(circle, rgba(74,222,128,0.2) 0%, rgba(0,0,0,0.15) 70%)', border: '4px ridge #4ade80', shadow: 'inset 0 0 15px rgba(74,222,128,0.3)' },
    Rare: { bg: 'radial-gradient(circle, rgba(96,165,250,0.25) 0%, rgba(0,0,0,0.2) 70%)', border: '4px double #60a5fa', shadow: 'inset 0 0 20px rgba(96,165,250,0.4)' },
    Epic: { bg: 'radial-gradient(circle, rgba(192,132,252,0.3) 0%, rgba(0,0,0,0.25) 80%)', border: '5px groove #c084fc', shadow: 'inset 0 0 25px rgba(192,132,252,0.5), 0 0 10px rgba(192,132,252,0.4)' },
    Legendary: { bg: 'radial-gradient(circle, rgba(251,191,36,0.35) 0%, rgba(0,0,0,0.3) 80%)', border: '6px double #fbbf24', shadow: 'inset 0 0 30px rgba(251,191,36,0.6), 0 0 15px rgba(251,191,36,0.5)' },
    Mythic: { bg: 'radial-gradient(circle, rgba(167,139,250,0.4) 0%, rgba(0,0,0,0.4) 90%)', border: '6px ridge #a78bfa', shadow: 'inset 0 0 40px rgba(167,139,250,0.7), 0 0 20px rgba(167,139,250,0.6)' },
    Divine: { bg: 'radial-gradient(circle, rgba(244,114,182,0.45) 0%, rgba(255,255,255,0.1) 100%)', border: '6px solid #f472b6', shadow: 'inset 0 0 50px rgba(244,114,182,0.8), 0 0 25px rgba(244,114,182,0.7)' },
    Eldritch: { bg: 'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0.6) 100%)', border: '6px dashed #00ffff', shadow: 'inset 0 0 50px rgba(0,255,255,0.8), 0 0 30px rgba(0,255,255,0.8)' }
  };
  const rStyle = rarityStyles[char.rarity] || rarityStyles.Common;

  const overlay = document.createElement('div');
  overlay.id = 'hero-detail-overlay';
  overlay.className = 'modal-overlay';
  overlay.style.cssText = 'z-index: 3000; display: flex; animation: fadeIn 0.2s ease;';

  overlay.innerHTML = `
    <div class="modal-content parchment-modal" style="position:relative; max-width:480px; width:95%; padding:2.5rem 2rem 1.5rem; text-align:center; box-shadow:0 25px 75px rgba(0,0,0,0.9);">
      
      <!-- Decorative Corners -->
      <div style="position:absolute; top:8px; left:8px; width:20px; height:20px; border-top:3px solid var(--parchment-border); border-left:3px solid var(--parchment-border);"></div>
      <div style="position:absolute; top:8px; right:8px; width:20px; height:20px; border-top:3px solid var(--parchment-border); border-right:3px solid var(--parchment-border);"></div>
      <div style="position:absolute; bottom:8px; left:8px; width:20px; height:20px; border-bottom:3px solid var(--parchment-border); border-left:3px solid var(--parchment-border);"></div>
      <div style="position:absolute; bottom:8px; right:8px; width:20px; height:20px; border-bottom:3px solid var(--parchment-border); border-right:3px solid var(--parchment-border);"></div>

      <button id="hero-detail-close" class="btn btn-secondary" style="position:absolute; top:1.2rem; right:1.2rem; padding:0.2rem 0.6rem; min-width:auto; margin:0; z-index:10;">✕</button>

      <!-- Element Badge -->
      <div style="position:absolute; top:2.5rem; left:2rem; font-size:1.5rem; background:rgba(0,0,0,0.3); border:2px solid ${element.color}; border-radius:50%; width:40px; height:40px; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px ${element.color};" title="${element.name} Element">
        ${element.icon}
      </div>

      <!-- Hero Portrait Container -->
      <div style="width:220px; height:220px; margin:0 auto 1.2rem; border:${rStyle.border}; border-radius:12px; display:flex; align-items:center; justify-content:center; background:${rStyle.bg}; box-shadow:${rStyle.shadow}; overflow:hidden; position:relative;">
        <img src="${char.visual}" alt="${char.name}" style="width:180px; height:180px; object-fit:contain; image-rendering:pixelated; mix-blend-mode:multiply; filter:${char.cssFilter||'none'}; animation:${char.anim} 2s ease-in-out infinite;" />
      </div>

      <h2 style="margin:0 0 0.3rem; font-family:'MedievalSharp',cursive; font-size:2rem; ${char.color.startsWith('linear')?`background:${char.color};-webkit-background-clip:text;-webkit-text-fill-color:transparent;`:`color:${accentColor};`} text-shadow:1px 1px 2px rgba(0,0,0,0.3);">${char.name}</h2>

      <!-- Rarity Ribbon -->
      <div style="margin-bottom:1.2rem; position:relative;">
        <div style="display:inline-block; background:var(--parchment-border); color:var(--parchment-bg); padding:0.3rem 2rem; font-size:1.1rem; font-family:'MedievalSharp',cursive; font-weight:bold; position:relative; box-shadow:0 4px 6px rgba(0,0,0,0.3);">
          ${char.rarity}
          <!-- Ribbon ends -->
          <div style="position:absolute; top:0; left:-15px; width:0; height:0; border-top: 17px solid transparent; border-bottom: 17px solid transparent; border-right: 15px solid var(--parchment-border);"></div>
          <div style="position:absolute; top:0; right:-15px; width:0; height:0; border-top: 17px solid transparent; border-bottom: 17px solid transparent; border-left: 15px solid var(--parchment-border);"></div>
        </div>
      </div>

      <!-- Flavor Text Lore -->
      <p style="font-family:'Marcellus SC',serif; font-size:0.95rem; font-style:italic; color:var(--text-dark); margin:0 0 1.2rem; padding:0 1.5rem; opacity:0.9; line-height:1.4;">
        "${lore}"
      </p>

      <!-- Stats Grid -->
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.6rem; margin-bottom:1rem;">
        <div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:4px; padding:0.8rem 0.5rem; display:flex; flex-direction:column; justify-content:center;">
          <div style="font-size:1.4rem; margin-bottom:0.2rem;">❤️</div>
          <div style="color:var(--text-dark); font-size:0.75rem; font-family:'Marcellus SC',serif; opacity:0.8;">VITALITY</div>
          <div style="color:#ef4444; font-size:1.2rem; font-weight:bold;">${hp.toLocaleString()}</div>
        </div>
        
        <div style="background:rgba(139,90,43,0.1); border:1px solid var(--parchment-border); border-radius:4px; padding:0.8rem 0.5rem; display:flex; flex-direction:column; justify-content:center; box-shadow:inset 0 0 10px rgba(0,0,0,0.05);">
          <div style="font-size:1.4rem; margin-bottom:0.2rem;">${roleIcon}</div>
          <div style="color:var(--text-dark); font-size:0.75rem; font-family:'Marcellus SC',serif; opacity:0.8;">ROLE</div>
          <div style="color:var(--text-dark); font-size:1.1rem; font-family:'MedievalSharp',cursive;">${role}</div>
        </div>

        <div style="background:rgba(251,191,36,0.1); border:1px solid rgba(251,191,36,0.3); border-radius:4px; padding:0.8rem 0.5rem; display:flex; flex-direction:column; justify-content:center;">
          <div style="font-size:1.4rem; margin-bottom:0.2rem;">⚔️</div>
          <div style="color:var(--text-dark); font-size:0.75rem; font-family:'Marcellus SC',serif; opacity:0.8;">STRENGTH</div>
          <div style="color:#d97706; font-size:1.2rem; font-weight:bold;">${power.toLocaleString()}</div>
        </div>
      </div>

      <div style="background:rgba(139,90,43,0.15); border:2px dashed var(--parchment-border); border-radius:4px; padding:0.6rem; font-size:0.95rem; color:var(--text-dark); font-family:'Marcellus SC',serif; margin-bottom:0.6rem;">
        ${inArmy>0?`📦 In Vanguard: <strong style="font-size:1.1rem;">${inArmy}</strong> &nbsp;|&nbsp; 💰 Value: <strong style="color:#b8860b; font-size:1.1rem;">${Math.floor(char.value*getSellMultiplier()).toLocaleString()}G</strong>`:'<span style="opacity:0.6; font-style:italic;">Not currently in your Vanguard</span>'}
        ${ascLvl>0?`<div style="color:#16a34a; font-size:0.85rem; font-weight:bold; margin-top:0.4rem; border-top:1px solid rgba(0,0,0,0.1); padding-top:0.4rem;">✨ Ascended +${ascLvl} ✨</div>`:''}
      </div>

      <!-- Discovery Date & Chance -->
      <div style="font-size:0.75rem; color:var(--text-dark); opacity:0.7; font-family:'Marcellus SC',serif; display:flex; justify-content:space-between; padding:0 0.5rem;">
        <span>Discovered: ${discDate}</span>
        <span>Pull Rate: 1 in ${char.chance.toLocaleString()}</span>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  const close = () => { overlay.remove(); playSfx('click'); };
  document.getElementById('hero-detail-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
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

function updateEnvironmentTheme() {
  const h1 = document.querySelector('.header h1');
  if (state && state.prestige > 0) {
    document.body.classList.add('celestial-mode');
    if (h1 && h1.textContent !== "Astral Sanctuary") h1.textContent = "Astral Sanctuary";
  } else {
    document.body.classList.remove('celestial-mode');
    if (h1 && h1.textContent !== "Tavern of Legends") h1.textContent = "Tavern of Legends";
  }
}

// --- UI UPDATES ---
function updateStats() {
  updateEnvironmentTheme();
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
  
  const isCelestial = state && state.prestige > 0;
  const insetShadow = isCelestial ? 'inset 0 0 40px rgba(124, 58, 237, 0.4)' : 'inset 0 0 50px rgba(139, 90, 43, 0.4)';
  
  if (char.glow) {
    display.style.boxShadow = `0 5px 20px rgba(0, 0, 0, 0.8), ${insetShadow}, ${char.glow}`;
    display.style.borderColor = char.color.startsWith('linear-gradient') ? '#00ffff' : char.color;
  } else {
    display.style.boxShadow = `0 5px 20px rgba(0, 0, 0, 0.8), ${insetShadow}`;
    display.style.borderColor = isCelestial ? '#00ffff' : 'var(--parchment-border)';
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
          <img src="${char.visual}" alt="${char.name}" style="mix-blend-mode: multiply; filter: ${char.cssFilter || 'none'};" />
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
    const btn = document.getElementById('auto-roll-btn');
    if (state.autoRollActive) {
      btn.classList.add('active');
      btn.textContent = "Auto-Summon: ON";
    } else {
      btn.classList.remove('active');
      btn.textContent = "Auto-Summon: OFF";
    }
  } else {
    document.getElementById('auto-roll-btn').style.display = 'none';
  }
  
  if (state.upgrades.auto_sell_module > 0) {
    document.getElementById('auto-sell-config').style.display = 'block';
  } else {
    document.getElementById('auto-sell-config').style.display = 'none';
  }
  
  if (state.upgrades.auto_upgrade_module > 0) {
    document.getElementById('auto-upgrade-btn').style.display = 'block';
    const btn = document.getElementById('auto-upgrade-btn');
    if (state.autoUpgradeActive) {
      btn.classList.add('active');
      btn.textContent = "Auto-Upgrade: ON";
    } else {
      btn.classList.remove('active');
      btn.textContent = "Auto-Upgrade: OFF";
    }
  } else {
    document.getElementById('auto-upgrade-btn').style.display = 'none';
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

// --- IMAGE TRANSPARENCY PROCESSING (FLOOD FILL KEYOUT) ---
const makeImageTransparent = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const width = canvas.width;
        const height = canvas.height;
        
        // Scan margin pixels to robustly find the background color
        let rBg = data[0], gBg = data[1], bBg = data[2], aBg = data[3];
        let foundWhite = false;
        
        const samples = [
          [2, 2], [width - 3, 2], [2, height - 3], [width - 3, height - 3],
          [5, 5], [width - 6, 5], [5, height - 6], [width - 6, height - 6],
          [0, 0]
        ];
        
        for (const [sx, sy] of samples) {
          if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
            const idx = (sy * width + sx) * 4;
            const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
            if (a > 0 && r > 230 && g > 230 && b > 230) {
              rBg = r; gBg = g; bBg = b; aBg = a;
              foundWhite = true;
              break;
            }
          }
        }
        
        // If the background is not already transparent, key out the background color
        if (aBg > 0) {
          const isWhiteBg = rBg > 230 && gBg > 230 && bBg > 230;
          const isBlackBg = rBg < 25 && gBg < 25 && bBg < 25;
          
          let threshold = 55;
          if (isWhiteBg) {
            threshold = 60; // Very tight threshold to prevent interior bleeding
          } else if (isBlackBg) {
            threshold = 50;
          }

          console.log(`[Transparency] Processing: ${src} | Sampled background: RGBA(${rBg},${gBg},${bBg},${aBg})`);

          // Visited map & queue
          const visited = new Uint8Array(width * height);
          const queue = new Int32Array(width * height);
          let head = 0;
          let tail = 0;

          const enqueue = (x, y) => {
            if (x >= 0 && x < width && y >= 0 && y < height) {
              const idx = y * width + x;
              if (visited[idx] === 0) {
                visited[idx] = 1;
                queue[tail++] = idx;
              }
            }
          };

          // Initialize BFS from all borders using a 3-pixel margin
          const margin = 3;
          for (let m = 0; m < margin; m++) {
            for (let x = m; x < width - m; x++) {
              enqueue(x, m);
              enqueue(x, height - 1 - m);
            }
            for (let y = m; y < height - m; y++) {
              enqueue(m, y);
              enqueue(width - 1 - m, y);
            }
          }

          // Also queue the sampled background points
          for (const [sx, sy] of samples) {
            enqueue(sx, sy);
          }

          let mainBgKeyedOut = 0;

          // BFS flood fill - Safe Main Background Keyout
          while (head < tail) {
            const idx = queue[head++];
            const x = idx % width;
            const y = Math.floor(idx / width);
            
            const i = idx * 4;
            const r = data[i];
            const g = data[i+1];
            const b = data[i+2];
            const a = data[i+3];
            
            const distance = Math.sqrt((r - rBg)**2 + (g - gBg)**2 + (b - bBg)**2);
            const isMatch = distance < threshold;

            if (isMatch || a === 0) {
              if (data[i+3] !== 0) {
                data[i+3] = 0; // Key out alpha
                mainBgKeyedOut++;
              }
              
              // Queue neighbors
              enqueue(x + 1, y);
              enqueue(x - 1, y);
              enqueue(x, y + 1);
              enqueue(x, y - 1);
            }
          }
          
          console.log(`[Transparency] BFS Phase: ${src} | Keyed out ${mainBgKeyedOut} core background pixels.`);

          // Step 2: Morphological Erosion of light-colored/fuzzy fringes
          const erosionThreshold = isWhiteBg ? 135 : 120;
          let totalFringeErased = 0;
          
          for (let pass = 0; pass < 5; pass++) {
            const toErase = [];
            
            for (let y = 1; y < height - 1; y++) {
              for (let x = 1; x < width - 1; x++) {
                const idx = y * width + x;
                const i = idx * 4;
                
                if (data[i+3] > 0) {
                  const upTrans = data[((y - 1) * width + x) * 4 + 3] === 0;
                  const downTrans = data[((y + 1) * width + x) * 4 + 3] === 0;
                  const leftTrans = data[(y * width + (x - 1)) * 4 + 3] === 0;
                  const rightTrans = data[(y * width + (x + 1)) * 4 + 3] === 0;
                  
                  if (upTrans || downTrans || leftTrans || rightTrans) {
                    const r = data[i], g = data[i+1], b = data[i+2];
                    const distance = Math.sqrt((r - rBg)**2 + (g - gBg)**2 + (b - bBg)**2);
                    
                    if (distance < erosionThreshold) {
                      toErase.push(i);
                    }
                  }
                }
              }
            }
            
            toErase.forEach(i => {
              data[i+3] = 0;
              totalFringeErased++;
            });
            
            if (toErase.length === 0) break;
          }
          
          console.log(`[Transparency] Erosion Phase: ${src} | Erased ${totalFringeErased} fringe pixels.`);
        }
        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL());
      } catch (e) {
        console.error("Canvas transparent processing failed:", e);
        resolve(src);
      }
    };
    img.onerror = () => {
      resolve(src);
    };
    img.src = src;
  });
};

async function preprocessCharacterVisuals() {
  const transparentCache = {};
  
  // Process characters concurrently
  const charPromises = CHARACTERS.map(async (char) => {
    if (char.visual && char.visual.endsWith('.png') && !char.visual.startsWith('data:')) {
      const originalPath = char.visual;
      try {
        if (transparentCache[originalPath]) {
          char.visual = transparentCache[originalPath];
        } else {
          const res = await makeImageTransparent(char.visual);
          char.visual = res;
          transparentCache[originalPath] = res;
        }
      } catch (e) {
        console.error("Failed to make image transparent:", char.visual, e);
      }
    }
  });

  // Process bosses concurrently
  const bossPromises = DUNGEON_BOSSES.map(async (boss) => {
    if (boss.visual && boss.visual.endsWith('.png') && !boss.visual.startsWith('data:')) {
      const originalPath = boss.visual;
      try {
        if (transparentCache[originalPath]) {
          boss.visual = transparentCache[originalPath];
        } else {
          const res = await makeImageTransparent(boss.visual);
          boss.visual = res;
          transparentCache[originalPath] = res;
        }
      } catch (e) {
        console.error("Failed to make boss visual transparent:", boss.visual, e);
      }
    }
  });

  // Execute concurrently and trigger UI refreshes on success
  Promise.all([...charPromises, ...bossPromises]).then(() => {
    console.log("[Transparency] All character and boss visuals are transparent!");
    if (typeof renderArmy === 'function') renderArmy();
    if (typeof renderBossPartySelection === 'function') renderBossPartySelection();
    if (typeof renderExpeditions === 'function') renderExpeditions();
  });
}

// --- INIT ---
document.getElementById('roll-btn').addEventListener('click', performRoll);
document.getElementById('auto-roll-btn').addEventListener('click', () => toggleAutoRoll());
document.getElementById('auto-upgrade-btn').addEventListener('click', () => toggleAutoUpgrade());
document.getElementById('save-btn').addEventListener('click', () => {
  saveState();
  notify('Game Saved Successfully!', '#2e8b57');
});

function initEmbers() {
  const container = document.getElementById('embers-container');
  if (!container) return;
  for (let i = 0; i < 25; i++) {
    const ember = document.createElement('div');
    ember.className = 'ember';
    
    const size = Math.random() * 8 + 4; // 4px to 12px
    const left = Math.random() * 100; // 0% to 100%
    const duration = Math.random() * 10 + 6; // 6s to 16s
    const delay = Math.random() * 12; // 0s to 12s
    const drift = (Math.random() * 100 - 50); // -50px to 50px
    
    ember.style.width = size + 'px';
    ember.style.height = size + 'px';
    ember.style.left = left + '%';
    ember.style.animationDuration = duration + 's';
    ember.style.animationDelay = '-' + delay + 's'; // Negative delay triggers immediately
    ember.style.setProperty('--drift', drift + 'px');
    
    container.appendChild(ember);
  }
}

// Start at Main Menu immediately, let preprocessing run concurrently in the background
initEmbers();
loadSaveSlotsUI();
preprocessCharacterVisuals();

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

// Reduce Motion Setup
const reduceMotionCheckbox = document.getElementById('reduce-motion-toggle');
if (reduceMotionCheckbox) {
  reduceMotionCheckbox.addEventListener('change', (e) => {
    state.reduceMotion = e.target.checked;
    saveState();
    playSfx('click');
  });
}

function updateAccessibilityUI() {
  const checkbox = document.getElementById('reduce-motion-toggle');
  if (checkbox) {
    checkbox.checked = state.reduceMotion || false;
  }
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

// =============================================================================
// --- GUILD EXPEDITIONS SYSTEM ---
// =============================================================================

// Generates premium pixel-art SVG layers for the scenic trek as Base64 data URIs
const svgToDataUri = (svgStr) => {
  const b64 = btoa(unescape(encodeURIComponent(svgStr)));
  return `url('data:image/svg+xml;base64,${b64}')`;
};

const PIXEL_SVGS = {
  // === STANDARD LUSH FOREST ===
  sky_clouds: svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" shape-rendering="crispEdges"><rect width="120" height="40" fill="none"/><rect x="8" y="6" width="22" height="6" fill="#ffffff"/><rect x="6" y="8" width="26" height="8" fill="#ffffff"/><rect x="4" y="10" width="30" height="6" fill="#f0f4ff"/><rect x="10" y="4" width="10" height="4" fill="#ffffff"/><rect x="14" y="2" width="6" height="4" fill="#e8eeff"/><rect x="70" y="10" width="18" height="5" fill="#ffffff"/><rect x="68" y="12" width="22" height="6" fill="#ffffff"/><rect x="66" y="14" width="26" height="4" fill="#f0f4ff"/><rect x="74" y="8" width="8" height="4" fill="#ffffff"/></svg>`),

  mountains: svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="30" shape-rendering="crispEdges"><rect width="240" height="30" fill="none"/><polygon points="0,30 40,0 80,30" fill="#7c9abf"/><polygon points="40,12 48,4 56,12" fill="#dde9f5"/><polygon points="60,30 110,2 160,30" fill="#6a87ad"/><polygon points="100,14 110,4 120,14" fill="#e8f0f8"/><polygon points="110,14 118,8 126,14" fill="#dde9f5"/><polygon points="150,30 195,6 240,30" fill="#7c9abf"/><polygon points="185,16 195,6 205,16" fill="#dde9f5"/></svg>`),

  hills: svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20" shape-rendering="crispEdges"><rect width="200" height="20" fill="none"/><ellipse cx="50" cy="20" rx="70" ry="18" fill="#4ade80"/><ellipse cx="155" cy="22" rx="75" ry="16" fill="#22c55e"/></svg>`),

  forest_decor: svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="45" shape-rendering="crispEdges"><rect width="320" height="45" fill="none"/><rect x="8" y="20" width="4" height="25" fill="#5c4a1e"/><rect x="2" y="12" width="16" height="16" fill="#15803d"/><rect x="4" y="6" width="12" height="10" fill="#16a34a"/><rect x="6" y="2" width="8" height="6" fill="#22c55e"/><rect x="38" y="22" width="6" height="23" fill="#5c4a1e"/><rect x="30" y="8" width="22" height="18" fill="#14532d"/><rect x="34" y="4" width="14" height="10" fill="#15803d"/><rect x="36" y="0" width="10" height="6" fill="#166534"/><rect x="60" y="28" width="6" height="17" fill="#78716c"/><rect x="56" y="24" width="14" height="12" fill="#a8a29e"/><rect x="58" y="28" width="10" height="8" fill="#d6d3d1"/><rect x="86" y="30" width="16" height="15" fill="#14532d"/><rect x="88" y="32" width="12" height="8" fill="#15803d"/><rect x="90" y="34" width="8" height="4" fill="#22c55e"/><rect x="148" y="18" width="4" height="27" fill="#5c4a1e"/><rect x="142" y="10" width="16" height="14" fill="#15803d"/><rect x="144" y="4" width="12" height="10" fill="#16a34a"/><rect x="146" y="0" width="8" height="6" fill="#22c55e"/><rect x="168" y="28" width="18" height="17" fill="#14532d"/><rect x="170" y="30" width="14" height="10" fill="#166534"/><rect x="172" y="32" width="10" height="6" fill="#15803d"/><rect x="200" y="26" width="8" height="19" fill="#78716c"/><rect x="196" y="22" width="16" height="12" fill="#a8a29e"/><rect x="200" y="28" width="8" height="6" fill="#d6d3d1"/><rect x="225" y="32" width="10" height="13" fill="#166534"/><rect x="227" y="33" width="6" height="8" fill="#15803d"/><rect x="240" y="33" width="4" height="12" fill="#ef4444"/><rect x="238" y="34" width="2" height="6" fill="#dc2626"/><rect x="242" y="34" width="2" height="5" fill="#fca5a5"/><rect x="272" y="18" width="4" height="27" fill="#5c4a1e"/><rect x="266" y="10" width="16" height="14" fill="#16a34a"/><rect x="268" y="4" width="12" height="10" fill="#22c55e"/><rect x="270" y="1" width="8" height="5" fill="#4ade80"/><rect x="296" y="28" width="16" height="17" fill="#14532d"/><rect x="298" y="30" width="12" height="10" fill="#166534"/></svg>`),

  ground: svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="20" shape-rendering="crispEdges"><rect width="64" height="20" fill="#92400e"/><rect width="64" height="6" fill="#15803d"/><rect x="0" y="6" width="64" height="2" fill="#14532d"/><rect x="4" y="1" width="3" height="4" fill="#22c55e"/><rect x="5" y="0" width="1" height="2" fill="#4ade80"/><rect x="18" y="2" width="2" height="3" fill="#22c55e"/><rect x="30" y="1" width="3" height="4" fill="#22c55e"/><rect x="31" y="0" width="1" height="2" fill="#4ade80"/><rect x="46" y="2" width="2" height="3" fill="#22c55e"/><rect x="58" y="1" width="3" height="3" fill="#22c55e"/><rect x="10" y="10" width="4" height="2" fill="#a16207"/><rect x="36" y="12" width="6" height="2" fill="#a16207"/></svg>`),

  // === CELESTIAL SPACE REALM ===
  sky_nebula: svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" shape-rendering="crispEdges"><rect width="120" height="40" fill="none"/><rect x="6" y="4" width="2" height="2" fill="#e879f9"/><rect x="15" y="12" width="3" height="3" fill="#818cf8" opacity="0.8"/><rect x="22" y="6" width="2" height="2" fill="#ffffff"/><rect x="35" y="18" width="4" height="4" fill="#a78bfa" opacity="0.7"/><rect x="42" y="8" width="2" height="2" fill="#ffffff"/><rect x="55" y="14" width="3" height="3" fill="#38bdf8" opacity="0.9"/><rect x="64" y="4" width="2" height="2" fill="#f472b6"/><rect x="75" y="20" width="4" height="4" fill="#818cf8" opacity="0.6"/><rect x="82" y="8" width="2" height="2" fill="#ffffff"/><rect x="95" y="12" width="3" height="3" fill="#a78bfa" opacity="0.8"/><rect x="104" y="6" width="2" height="2" fill="#38bdf8"/><rect x="112" y="18" width="3" height="3" fill="#e879f9" opacity="0.7"/><rect x="10" y="22" width="6" height="3" fill="#7c3aed" opacity="0.3"/><rect x="50" y="26" width="8" height="4" fill="#7c3aed" opacity="0.25"/><rect x="88" y="24" width="7" height="3" fill="#6d28d9" opacity="0.3"/></svg>`),

  space_mountains: svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="30" shape-rendering="crispEdges"><rect width="240" height="30" fill="none"/><polygon points="0,30 40,2 80,30" fill="#1e1b4b"/><polyline points="32,10 40,2 48,10" fill="none" stroke="#00ffff" stroke-width="1"/><polygon points="60,30 110,0 160,30" fill="#1e0a4e"/><polyline points="100,12 110,0 120,12" fill="none" stroke="#a78bfa" stroke-width="1"/><polygon points="150,30 195,4 240,30" fill="#1e1b4b"/><polyline points="185,14 195,4 205,14" fill="none" stroke="#00ffff" stroke-width="1"/><rect x="38" y="6" width="4" height="2" fill="#e879f9" opacity="0.6"/><rect x="108" y="4" width="4" height="2" fill="#00ffff" opacity="0.5"/></svg>`),

  space_hills: svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20" shape-rendering="crispEdges"><rect width="200" height="20" fill="none"/><ellipse cx="50" cy="20" rx="70" ry="18" fill="#4c1d95"/><ellipse cx="155" cy="22" rx="75" ry="16" fill="#5b21b6"/><rect x="20" y="10" width="2" height="2" fill="#00ffff" opacity="0.5"/><rect x="90" y="8" width="2" height="2" fill="#a78bfa" opacity="0.7"/><rect x="140" y="12" width="2" height="2" fill="#00ffff" opacity="0.5"/></svg>`),

  space_decor: svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="45" shape-rendering="crispEdges"><rect width="320" height="45" fill="none"/><rect x="8" y="28" width="4" height="17" fill="#7c3aed"/><rect x="4" y="22" width="12" height="12" fill="#00ffff" opacity="0.5"/><rect x="6" y="16" width="8" height="8" fill="#06b6d4"/><rect x="8" y="10" width="4" height="8" fill="#00ffff"/><rect x="10" y="6" width="2" height="6" fill="#e0f2fe"/><rect x="38" y="25" width="6" height="20" fill="#6d28d9"/><rect x="32" y="16" width="18" height="14" fill="#7c3aed" opacity="0.7"/><rect x="34" y="10" width="14" height="10" fill="#8b5cf6"/><rect x="36" y="6" width="10" height="6" fill="#a78bfa"/><rect x="38" y="2" width="6" height="6" fill="#c4b5fd"/><rect x="60" y="30" width="8" height="15" fill="#374151"/><rect x="56" y="24" width="16" height="12" fill="#4c1d95" opacity="0.8"/><rect x="58" y="20" width="12" height="8" fill="#5b21b6"/><rect x="60" y="16" width="8" height="6" fill="#7c3aed" opacity="0.5"/><rect x="88" y="32" width="16" height="13" fill="#e879f9" opacity="0.6"/><rect x="90" y="34" width="12" height="8" fill="#f0abfc"/><rect x="92" y="36" width="8" height="4" fill="#ffffff" opacity="0.7"/><rect x="148" y="22" width="4" height="23" fill="#7c3aed"/><rect x="142" y="14" width="16" height="14" fill="#00ffff" opacity="0.5"/><rect x="144" y="8" width="12" height="10" fill="#06b6d4"/><rect x="146" y="4" width="8" height="6" fill="#00ffff"/><rect x="148" y="0" width="4" height="6" fill="#e0f2fe"/><rect x="168" y="28" width="6" height="17" fill="#6d28d9"/><rect x="162" y="18" width="18" height="16" fill="#7c3aed" opacity="0.8"/><rect x="164" y="12" width="14" height="10" fill="#8b5cf6"/><rect x="168" y="8" width="6" height="6" fill="#c4b5fd"/><rect x="200" y="26" width="8" height="19" fill="#374151"/><rect x="196" y="20" width="16" height="14" fill="#4c1d95"/><rect x="198" y="14" width="12" height="10" fill="#5b21b6"/><rect x="202" y="10" width="4" height="6" fill="#7c3aed" opacity="0.6"/><rect x="225" y="30" width="12" height="15" fill="#e879f9" opacity="0.7"/><rect x="227" y="32" width="8" height="10" fill="#f0abfc"/><rect x="229" y="34" width="4" height="6" fill="#ffffff" opacity="0.6"/><rect x="272" y="22" width="4" height="23" fill="#7c3aed"/><rect x="266" y="14" width="16" height="14" fill="#06b6d4" opacity="0.6"/><rect x="268" y="8" width="12" height="10" fill="#00ffff" opacity="0.7"/><rect x="270" y="2" width="8" height="8" fill="#e0f2fe"/><rect x="296" y="28" width="16" height="17" fill="#e879f9" opacity="0.6"/><rect x="298" y="30" width="12" height="10" fill="#f0abfc"/></svg>`),

  space_ground: svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="20" shape-rendering="crispEdges"><rect width="64" height="20" fill="#1e0940"/><rect width="64" height="5" fill="#2e1065"/><rect x="0" y="5" width="64" height="1" fill="#00ffff" opacity="0.6"/><rect x="4" y="1" width="2" height="3" fill="#00ffff" opacity="0.7"/><rect x="20" y="2" width="2" height="2" fill="#a78bfa"/><rect x="36" y="1" width="2" height="3" fill="#00ffff" opacity="0.7"/><rect x="52" y="2" width="2" height="2" fill="#a78bfa"/><rect x="8" y="10" width="6" height="4" fill="#ec4899" opacity="0.5"/><rect x="9" y="11" width="4" height="2" fill="#f0abfc"/><rect x="38" y="10" width="6" height="4" fill="#ec4899" opacity="0.5"/><rect x="39" y="11" width="4" height="2" fill="#f0abfc"/></svg>`),

  // === CRITTER SVG INNER CONTENT ===
  rabbit_inner: `<rect x="5" y="8" width="6" height="5" fill="#f1f5f9"/><rect x="4" y="9" width="8" height="4" fill="#e2e8f0"/><rect x="11" y="10" width="2" height="3" fill="#f1f5f9"/><rect x="12" y="11" width="1" height="2" fill="#fda4af"/><rect x="3" y="8" width="2" height="3" fill="#f1f5f9"/><rect x="6" y="6" width="4" height="4" fill="#f1f5f9"/><rect x="5" y="3" width="2" height="5" fill="#f1f5f9"/><rect x="9" y="3" width="2" height="5" fill="#f1f5f9"/><rect x="5" y="1" width="1" height="3" fill="#fda4af"/><rect x="10" y="1" width="1" height="3" fill="#fda4af"/><rect x="7" y="7" width="2" height="2" fill="#fda4af"/><rect x="13" y="12" width="2" height="2" fill="#f1f5f9"/><rect x="3" y="12" width="2" height="2" fill="#f1f5f9"/>`,
  slime_inner: `<rect x="4" y="8" width="8" height="6" fill="#4ade80"/><rect x="3" y="9" width="10" height="4" fill="#22c55e"/><rect x="2" y="10" width="12" height="3" fill="#4ade80"/><rect x="3" y="13" width="10" height="2" fill="#16a34a"/><rect x="5" y="6" width="6" height="4" fill="#4ade80"/><rect x="6" y="4" width="4" height="4" fill="#86efac"/><rect x="5" y="7" width="2" height="2" fill="#14532d"/><rect x="9" y="7" width="2" height="2" fill="#14532d"/><rect x="6" y="8" width="1" height="1" fill="#ffffff"/><rect x="10" y="8" width="1" height="1" fill="#ffffff"/><rect x="7" y="10" width="2" height="1" fill="#ef4444"/><rect x="3" y="11" width="2" height="2" fill="#86efac"/><rect x="11" y="11" width="2" height="2" fill="#86efac"/>`,
  wisp_inner: `<rect x="7" y="2" width="2" height="2" fill="#e0f2fe"/><rect x="6" y="4" width="4" height="4" fill="#38bdf8"/><rect x="5" y="5" width="6" height="4" fill="#7dd3fc"/><rect x="6" y="7" width="4" height="4" fill="#38bdf8"/><rect x="7" y="10" width="2" height="4" fill="#0ea5e9"/><rect x="3" y="6" width="2" height="2" fill="#7dd3fc" opacity="0.6"/><rect x="11" y="6" width="2" height="2" fill="#7dd3fc" opacity="0.6"/>`
};

let _pendingExpeditionContract = null;
let _selectedExpeditionHeroes = [];

function getExpeditionSuccessRate(contract, heroIds) {
  const totalPower = heroIds.reduce((sum, hid) => {
    const c = CHARACTERS.find(ch => ch.id === hid);
    return sum + (c ? getBasePower(c) : 0);
  }, 0);
  const luckBuff = (state.expeditionBoosts && state.expeditionBoosts.luckBoostUntil > Date.now()) ? 1.15 : 1.0;
  const powerBonus = Math.min(30, Math.floor(totalPower / 100));
  return Math.min(95, Math.floor(contract.baseSuccessRate + powerBonus) * luckBuff);
}

function getEffectiveDuration(contract) {
  const speedBuff = state.expeditionBoosts && state.expeditionBoosts.speedBoostUntil > Date.now();
  return speedBuff ? Math.floor(contract.duration * 0.7) : contract.duration;
}

function renderExpeditions() {
  const isCelestial = state.prestige > 0;

  // === ACTIVE EXPEDITIONS ===
  const activeList = document.getElementById('active-expeditions-list');
  if (!activeList) return;

  const currentAdvIds = new Set((state.activeAdventures || []).map(a => a.startTime));

  // Remove cards for adventures no longer in state
  activeList.querySelectorAll('.active-adventure-card').forEach(card => {
    const ts = parseInt(card.dataset.advStart, 10);
    if (!currentAdvIds.has(ts)) card.remove();
  });

  // Show empty state if no active
  const existingEmpty = activeList.querySelector('.no-active-state');
  if ((state.activeAdventures || []).length === 0) {
    if (!existingEmpty) {
      activeList.innerHTML = `<p class="no-active-state" style="color:var(--text-secondary); font-style:italic; text-align:center; width:100%;">No active expeditions. Send heroes on a contract below!</p>`;
    }
  } else {
    if (existingEmpty) existingEmpty.remove();
  }

  // Update or create active adventure cards
  (state.activeAdventures || []).forEach((adv) => {
    const contract = EXPEDITION_CONTRACTS.find(c => c.id === adv.contractId);
    if (!contract) return;

    const now = Date.now();
    const total = adv.endTime - adv.startTime;
    const elapsed = Math.max(0, now - adv.startTime);
    const progress = Math.min(1, elapsed / total);
    const remaining = Math.max(0, Math.ceil((adv.endTime - now) / 1000));
    const isComplete = adv.status === 'complete';

    const heroPortraits = adv.heroIds.map(hid => {
      const c = CHARACTERS.find(ch => ch.id === hid);
      if (!c) return '';
      return `<img src="${c.visual}" class="scenic-walking-hero" alt="${c.name}" title="${c.name}" style="filter:${c.cssFilter || 'none'};" />`;
    }).join('');

    // Position heroes 5%→78% of width as progress goes 0→1
    const heroLeftPct = isComplete ? 78 : Math.min(78, 5 + 73 * progress);
    const timerText = isComplete ? '✅ Arrived!' : `⏳ ${Math.floor(remaining / 60)}m ${remaining % 60}s`;
    const barColor = isCelestial
      ? 'linear-gradient(90deg, #7c3aed, #00ffff)'
      : 'linear-gradient(90deg, #b8860b, #f59e0b)';

    const layers = isCelestial ? [
      `<div class="parallax-layer layer-sky" style="background-image:${PIXEL_SVGS.sky_nebula};"></div>`,
      `<div class="parallax-layer layer-mountains" style="background-image:${PIXEL_SVGS.space_mountains};"></div>`,
      `<div class="parallax-layer layer-hills" style="background-image:${PIXEL_SVGS.space_hills};"></div>`,
      `<div class="parallax-layer layer-decor" style="background-image:${PIXEL_SVGS.space_decor};"></div>`,
      `<div class="parallax-layer layer-ground" style="background-image:${PIXEL_SVGS.space_ground};"></div>`,
    ] : [
      `<div class="parallax-layer layer-sky" style="background-image:${PIXEL_SVGS.sky_clouds};"></div>`,
      `<div class="parallax-layer layer-mountains" style="background-image:${PIXEL_SVGS.mountains};"></div>`,
      `<div class="parallax-layer layer-hills" style="background-image:${PIXEL_SVGS.hills};"></div>`,
      `<div class="parallax-layer layer-decor" style="background-image:${PIXEL_SVGS.forest_decor};"></div>`,
      `<div class="parallax-layer layer-ground" style="background-image:${PIXEL_SVGS.ground};"></div>`,
    ];

    const critterA = isCelestial
      ? `<div class="pixel-critter critter-wisp" style="animation-delay:-3s;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" shape-rendering="crispEdges">${PIXEL_SVGS.wisp_inner}</svg></div>`
      : `<div class="pixel-critter critter-rabbit" style="animation-delay:-2s;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18" shape-rendering="crispEdges">${PIXEL_SVGS.rabbit_inner}</svg></div>`;
    const critterB = isCelestial
      ? `<div class="pixel-critter critter-wisp" style="animation-delay:-7s;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" shape-rendering="crispEdges">${PIXEL_SVGS.wisp_inner}</svg></div>`
      : `<div class="pixel-critter critter-slime" style="animation-delay:-5s;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18" shape-rendering="crispEdges">${PIXEL_SVGS.slime_inner}</svg></div>`;

    let card = activeList.querySelector(`.active-adventure-card[data-adv-start="${adv.startTime}"]`);

    if (!card) {
      // Build new card DOM — only done once per expedition
      card = document.createElement('div');
      card.className = 'active-adventure-card';
      card.dataset.advStart = adv.startTime;
      card.style.border = `2px solid ${contract.diffColor}40`;
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <strong style="font-family:'MedievalSharp',cursive; font-size:0.95rem;">${contract.emoji} ${contract.name}</strong>
          <span style="background:${contract.diffColor}22; color:${contract.diffColor}; border:1px solid ${contract.diffColor}55; border-radius:4px; padding:0.1rem 0.5rem; font-size:0.75rem; font-weight:bold;">${contract.difficulty}</span>
        </div>

        <div class="expedition-scene-container">
          ${layers.join('')}
          <div class="critters-layer">${critterA}${critterB}</div>
          <div class="scenic-explorers-container" style="left:${heroLeftPct}%;">${heroPortraits}</div>
          <div class="scenic-destination${isComplete ? ' destination-reached' : ''}">${contract.destination}</div>
        </div>

        <div class="expedition-progress-container">
          <div class="expedition-progress-bar" style="width:${Math.round(progress * 100)}%; background:${barColor}; transition:width 1s linear;"></div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem; margin-bottom:0.5rem;">
          <span class="adv-timer">${timerText}</span>
          <span style="color:var(--text-secondary);">${adv.heroIds.length} hero${adv.heroIds.length > 1 ? 'es' : ''}</span>
        </div>

        <button class="btn btn-primary claim-adv-btn" data-adv-start="${adv.startTime}" ${isComplete ? '' : 'disabled'} style="width:100%; margin:0;">
          ${isComplete ? '🎁 Claim Rewards' : '⌛ In Progress...'}
        </button>
      `;
      card.querySelector('.claim-adv-btn').addEventListener('click', () => {
        const idx = (state.activeAdventures || []).findIndex(a => a.startTime === adv.startTime);
        if (idx !== -1 && state.activeAdventures[idx].status === 'complete') {
          claimExpeditionRewards(idx);
        }
      });
      activeList.appendChild(card);
    } else {
      // Fine-grained DOM update — never recreate the card, never reset animations
      const explorersEl = card.querySelector('.scenic-explorers-container');
      if (explorersEl) explorersEl.style.left = heroLeftPct + '%';

      const progressBar = card.querySelector('.expedition-progress-bar');
      if (progressBar) progressBar.style.width = Math.round(progress * 100) + '%';

      const timerEl = card.querySelector('.adv-timer');
      if (timerEl) timerEl.textContent = timerText;

      const destEl = card.querySelector('.scenic-destination');
      if (destEl && isComplete && !destEl.classList.contains('destination-reached')) {
        destEl.classList.add('destination-reached');
      }

      const claimBtn = card.querySelector('.claim-adv-btn');
      if (claimBtn) {
        claimBtn.disabled = !isComplete;
        claimBtn.textContent = isComplete ? '🎁 Claim Rewards' : '⌛ In Progress...';
      }
    }
  });

  // === CONTRACTS LIST — only built once ===
  const contractsList = document.getElementById('expedition-contracts-list');
  if (!contractsList || contractsList.children.length > 0) return;

  EXPEDITION_CONTRACTS.forEach(contract => {
    const rewardPreview = {
      tavern_supply: '~750 Gold, possible Luck Boost',
      forest_hunt: '~3,000 Gold, possible Luck Boost',
      bandit_raid: '~12,000 Gold, possible Haste Boost',
      dragon_lair: '~45,000 Gold + Both Boosts'
    }[contract.id] || 'Rewards';

    const durMins = Math.floor(contract.duration / 60);
    const durSecs = contract.duration % 60;
    const durStr = durMins > 0 ? `${durMins}m${durSecs > 0 ? durSecs + 's' : ''}` : `${durSecs}s`;

    const el = document.createElement('div');
    el.className = 'contract-card';
    el.style.border = `2px solid ${contract.diffColor}55`;
    el.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
        <strong style="font-family:'MedievalSharp',cursive; font-size:1rem;">${contract.emoji} ${contract.name}</strong>
        <span style="background:${contract.diffColor}22; color:${contract.diffColor}; border:1px solid ${contract.diffColor}55; border-radius:4px; padding:0.15rem 0.6rem; font-size:0.8rem; font-weight:bold;">${contract.difficulty}</span>
      </div>
      <p style="font-size:0.85rem; opacity:0.85; margin:0.3rem 0 0.6rem;">${contract.desc}</p>
      <ul style="list-style:none; padding:0; margin:0 0 0.8rem; font-size:0.82rem; display:flex; flex-direction:column; gap:0.25rem;">
        <li>⏱️ Duration: <strong>${durStr}</strong></li>
        <li>👥 Max Heroes: <strong>${contract.maxHeroes}</strong></li>
        <li>🎲 Base Success: <strong style="color:${contract.diffColor}">${contract.baseSuccessRate}%</strong></li>
        <li>💰 Rewards: ${rewardPreview}</li>
      </ul>
      <button class="btn btn-primary send-expedition-btn" data-contract-id="${contract.id}" style="width:100%; margin:0;">⚔️ Send Expedition</button>
    `;
    el.querySelector('.send-expedition-btn').addEventListener('click', () => openExpeditionSelect(contract));
    contractsList.appendChild(el);
  });
}

function openExpeditionSelect(contract) {
  _pendingExpeditionContract = contract;
  _selectedExpeditionHeroes = [];

  const mainView = document.getElementById('expeditions-main-view');
  const selectView = document.getElementById('expeditions-select-view');
  if (!mainView || !selectView) return;

  mainView.style.display = 'none';
  selectView.style.display = 'block';

  // Fill contract info
  const infoEl = document.getElementById('expeditions-select-contract-info');
  const durMins = Math.floor(contract.duration / 60);
  const durSecs = contract.duration % 60;
  const durStr = durMins > 0 ? `${durMins}m${durSecs > 0 ? durSecs + 's' : ''}` : `${durSecs}s`;
  infoEl.innerHTML = `
    <strong style="font-size:1.1rem;">${contract.emoji} ${contract.name}</strong>
    <p style="margin:0.4rem 0 0; font-size:0.9rem;">
      <strong>Difficulty:</strong> <span style="color:${contract.diffColor}">${contract.difficulty}</span> &nbsp;|
      <strong>Duration:</strong> ${durStr} &nbsp;|
      <strong>Max Heroes:</strong> ${contract.maxHeroes}
    </p>
  `;

  // Fill hero list
  const heroGrid = document.getElementById('expedition-hero-select-list');
  heroGrid.innerHTML = '';

  const availableChars = Object.keys(state.army)
    .filter(id => state.army[id] > 0 && !(state.adventuresLock[id] > 0))
    .map(id => CHARACTERS.find(c => c.id === id))
    .filter(Boolean)
    .sort((a, b) => getBasePower(b) - getBasePower(a));

  if (availableChars.length === 0) {
    heroGrid.innerHTML = `<p style="text-align:center; color:var(--text-secondary);">No available heroes. Heroes on other expeditions cannot be used.</p>`;
  } else {
    availableChars.forEach(char => {
      const el = document.createElement('label');
      el.className = 'expedition-hero-card';
      el.style.cssText = 'display:flex; align-items:center; gap:0.6rem; padding:0.6rem; cursor:pointer;';
      el.innerHTML = `
        <input type="checkbox" data-id="${char.id}" style="color:${char.color.startsWith('linear') ? '#b8860b' : char.color};" />
        <img src="${char.visual}" alt="${char.name}" style="width:32px; height:32px; object-fit:contain; image-rendering:pixelated; filter:${char.cssFilter || 'none'}" />
        <div>
          <div style="font-size:0.85rem; font-weight:bold;">${char.name}</div>
          <div style="font-size:0.75rem; opacity:0.8;">Power: ${getBasePower(char)}</div>
        </div>
      `;
      el.querySelector('input[type=checkbox]').addEventListener('change', updateExpeditionSelectFooter);
      heroGrid.appendChild(el);
    });
  }

  updateExpeditionSelectFooter();

  // Re-bind Back button
  const cancelBtn = document.getElementById('expedition-cancel-select-btn');
  const newCancelBtn = cancelBtn.cloneNode(true);
  cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
  newCancelBtn.addEventListener('click', () => {
    selectView.style.display = 'none';
    mainView.style.display = 'block';
    const contractsList = document.getElementById('expedition-contracts-list');
    if (contractsList) contractsList.innerHTML = '';
    renderExpeditions();
  });

  // Re-bind Embark button
  const embarkBtn = document.getElementById('expedition-embark-btn');
  const newEmbarkBtn = embarkBtn.cloneNode(true);
  embarkBtn.parentNode.replaceChild(newEmbarkBtn, embarkBtn);
  newEmbarkBtn.addEventListener('click', () => {
    if (_selectedExpeditionHeroes.length === 0) return;
    launchExpedition(_pendingExpeditionContract, _selectedExpeditionHeroes);
    selectView.style.display = 'none';
    mainView.style.display = 'block';
    const contractsList = document.getElementById('expedition-contracts-list');
    if (contractsList) contractsList.innerHTML = '';
    renderExpeditions();
  });
}

function updateExpeditionSelectFooter() {
  const contract = _pendingExpeditionContract;
  if (!contract) return;
  const checked = document.querySelectorAll('#expedition-hero-select-list input[type=checkbox]:checked');
  _selectedExpeditionHeroes = [...checked].map(cb => cb.dataset.id);

  // Enforce max heroes cap
  if (_selectedExpeditionHeroes.length >= contract.maxHeroes) {
    document.querySelectorAll('#expedition-hero-select-list input[type=checkbox]:not(:checked)').forEach(cb => cb.disabled = true);
  } else {
    document.querySelectorAll('#expedition-hero-select-list input[type=checkbox]').forEach(cb => cb.disabled = false);
  }

  const totalPower = _selectedExpeditionHeroes.reduce((sum, hid) => {
    const c = CHARACTERS.find(ch => ch.id === hid);
    return sum + (c ? getBasePower(c) : 0);
  }, 0);
  const successRate = getExpeditionSuccessRate(contract, _selectedExpeditionHeroes);

  const totalPowerEl = document.getElementById('expedition-select-total-power');
  const successRateEl = document.getElementById('expedition-select-success-rate');
  const embarkBtn = document.getElementById('expedition-embark-btn');

  if (totalPowerEl) totalPowerEl.textContent = totalPower;
  if (successRateEl) {
    successRateEl.textContent = `${Math.round(successRate)}%`;
    successRateEl.style.color = successRate >= 80 ? '#22c55e' : successRate >= 60 ? '#fbbf24' : '#ef4444';
  }
  if (embarkBtn) embarkBtn.disabled = _selectedExpeditionHeroes.length === 0;
}

function launchExpedition(contract, heroIds) {
  const now = Date.now();
  const durationMs = getEffectiveDuration(contract) * 1000;
  const adv = {
    contractId: contract.id,
    heroIds: [...heroIds],
    startTime: now,
    endTime: now + durationMs,
    status: 'active'
  };
  if (!state.activeAdventures) state.activeAdventures = [];
  state.activeAdventures.push(adv);

  if (!state.adventuresLock) state.adventuresLock = {};
  heroIds.forEach(hid => {
    state.adventuresLock[hid] = (state.adventuresLock[hid] || 0) + 1;
  });

  saveState();
  playSfx('upgrade');
  notify(`${contract.emoji} Expedition launched: ${contract.name}!`, contract.diffColor);
}

function claimExpeditionRewards(index) {
  const adv = state.activeAdventures[index];
  if (!adv || adv.status !== 'complete') return;

  const contract = EXPEDITION_CONTRACTS.find(c => c.id === adv.contractId);
  if (!contract) return;

  const successRate = getExpeditionSuccessRate(contract, adv.heroIds);
  const success = Math.random() * 100 <= successRate;
  let rewardsSummary = '';

  if (success) {
    const rewards = contract.rewards();
    state.coins += rewards.coins;
    rewardsSummary = `<span style="color:#22c55e; font-weight:bold; font-size:1.2rem;">SUCCESS!</span><br/>`;
    rewardsSummary += `💰 Gold Earned: <span style="color:gold; font-weight:bold;">${rewards.coins.toLocaleString()}</span><br/><br/>`;

    if (rewards.boosts && rewards.boosts.length > 0) {
      if (!state.expeditionBoosts) state.expeditionBoosts = {};
      rewards.boosts.forEach(boost => {
        if (boost.type === 'luck') {
          state.expeditionBoosts.luckBoostUntil = Date.now() + boost.duration;
          rewardsSummary += `✨ <strong>${boost.label}</strong> activated!<br/>`;
        } else if (boost.type === 'speed') {
          state.expeditionBoosts.speedBoostUntil = Date.now() + boost.duration;
          rewardsSummary += `⚡ <strong>${boost.label}</strong> activated!<br/>`;
        }
      });
    }
    playSfx('battleWin');
  } else {
    const pityCoins = Math.floor(contract.rewards().coins * 0.1);
    state.coins += pityCoins;
    rewardsSummary = `<span style="color:#ef4444; font-weight:bold; font-size:1.2rem;">FAILURE!</span><br/>`;
    rewardsSummary += `<span style="font-size:1.1rem;">Pity payout: <span style="color:gold; font-weight:bold;">${pityCoins} Gold</span> for their efforts.</span><br/><br/>`;
    rewardsSummary += `Your heroes return home tired but completely safe!`;
    playSfx('battleLose');
  }

  // Release hero locks
  adv.heroIds.forEach(hid => {
    state.adventuresLock[hid] = Math.max(0, (state.adventuresLock[hid] || 1) - 1);
  });

  state.activeAdventures.splice(index, 1);
  saveState();
  updateStats();
  renderArmy();

  // Force contracts to rebuild on next renderExpeditions call
  const contractsList = document.getElementById('expedition-contracts-list');
  if (contractsList) contractsList.innerHTML = '';
  renderExpeditions();

  alertPopup('Expedition Report', rewardsSummary);
}

function alertPopup(title, contentHtml) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.zIndex = '2000';

  const content = document.createElement('div');
  content.className = `modal-content parchment-modal`;
  content.style.maxWidth = '500px';
  content.style.textAlign = 'center';
  content.style.padding = '2.5rem';

  content.innerHTML = `
    <h2 style="font-family:'MedievalSharp',cursive; margin-bottom:1.5rem; text-shadow:none;">${title}</h2>
    <div style="font-size:1.05rem; line-height:1.8; color:var(--text-dark); margin-bottom:2rem;">${contentHtml}</div>
    <button class="btn btn-primary close-popup-btn" style="margin:0; padding:0.6rem 2.5rem;">Dismiss</button>
  `;

  overlay.appendChild(content);
  document.body.appendChild(overlay);

  const close = () => { overlay.remove(); playSfx('click'); };
  content.querySelector('.close-popup-btn').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
}

function tickExpeditions() {
  // 1. Update active adventures
  if (state.activeAdventures && state.activeAdventures.length > 0) {
    const modal = document.getElementById('expeditions-modal');
    const mainView = document.getElementById('expeditions-main-view');
    if (modal && modal.style.display !== 'none' && mainView && mainView.style.display !== 'none') {
      renderExpeditions();
    }

    // Check for newly-completed adventures
    let saveNeeded = false;
    (state.activeAdventures || []).forEach(adv => {
      if (adv.status === 'active' && Date.now() >= adv.endTime) {
        adv.status = 'complete';
        saveNeeded = true;
        const contract = EXPEDITION_CONTRACTS.find(c => c.id === adv.contractId);
        if (contract) notify(`${contract.emoji} "${contract.name}" returned! Claim your rewards!`, '#22c55e');
        playSfx('upgrade');
      }
    });

    if (saveNeeded) {
      saveState();
      renderArmy();
    }
  }

  // 2. Tick boost HUD timer badges
  const hud = document.getElementById('boosts-hud');
  if (!hud) return;

  const now = Date.now();
  const luckActive = state.expeditionBoosts && state.expeditionBoosts.luckBoostUntil > now;
  const speedActive = state.expeditionBoosts && state.expeditionBoosts.speedBoostUntil > now;

  if (luckActive || speedActive) {
    hud.style.display = 'flex';
    hud.innerHTML = '';

    if (luckActive) {
      const rem = Math.ceil((state.expeditionBoosts.luckBoostUntil - now) / 1000);
      const m = Math.floor(rem / 60).toString().padStart(2, '0');
      const s = (rem % 60).toString().padStart(2, '0');
      hud.innerHTML += `
        <div class="hud-boost-badge luck-boost">
          <span style="display:inline-block; animation:anim-float 1.5s ease-in-out infinite;">✨</span>
          <span><strong>Luck Boost (+1.0x)</strong>: <span style="font-family:monospace; font-weight:bold;">${m}:${s}</span></span>
        </div>
      `;
    }

    if (speedActive) {
      const rem = Math.ceil((state.expeditionBoosts.speedBoostUntil - now) / 1000);
      const m = Math.floor(rem / 60).toString().padStart(2, '0');
      const s = (rem % 60).toString().padStart(2, '0');
      hud.innerHTML += `
        <div class="hud-boost-badge speed-boost">
          <span style="display:inline-block; animation:anim-float 1.5s ease-in-out infinite;">⚡</span>
          <span><strong>Haste Speed (30%)</strong>: <span style="font-family:monospace; font-weight:bold;">${m}:${s}</span></span>
        </div>
      `;
    }
  } else {
    hud.style.display = 'none';
  }
}
