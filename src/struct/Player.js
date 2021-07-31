const { UNITS, SUPER_UNITS } = require('../static/parsed.json');
const SUPER_UNIT_ENUMS = UNITS.map(unit => unit.name);

module.exports = {
	parse(data) {
		const parseUnits = (data, item, category) => {
			const UNIT = UNITS.find(unit => unit.village === item.village && unit.category === category && unit.name === item.name);
			const SUPER_UNIT = SUPER_UNITS.find(unit => unit.name === item.name && item.village === 'home');

			const newItem = {};
			newItem.name = item.name;
			newItem.level = item.level;
			newItem.village = item.village;
			newItem.maxLevel = item.maxLevel;
			newItem.isSuperTroop = item.name in SUPER_UNIT_ENUMS;
			if (newItem.isSuperTroop) newItem.superTroopIsActive = item.superTroopIsActive;

			if (SUPER_UNIT) {
				newItem.id = SUPER_UNIT.id;
				newItem.housingSpace = SUPER_UNIT.housingSpace;
				newItem.originalName = SUPER_UNIT.original;
				newItem.minOriginalLevel = SUPER_UNIT.minOriginalLevel;
				newItem.trainingCost = SUPER_UNIT.resourceCost;
				newItem.cooldown = SUPER_UNIT.cooldown;
				newItem.boostDuration = SUPER_UNIT.duration;

				const original = UNITS.find(unit => unit.village === 'home' && unit.name === SUPER_UNIT.original);
				newItem.unlockTownHallLevel = original.levels.findIndex(level => level >= newItem.minOriginalLevel) + 1;
				newItem.unlockCost = original.unlock.cost;
				newItem.unlockTime = original.unlock.time;
				newItem.unlockResource = original.unlock.resource;
				newItem.unlockBuilding = original.unlock.building;
				newItem.unlockBuildingLevel = original.unlock.buildingLevel;

				const origin = data.troops.find(troop => troop.village === 'home' && troop.name === original.name);
				newItem.upgradeCost = original.upgrade.cost[origin.level - 1] ?? 0;
				newItem.upgradeResource = original.upgrade.resource;
				newItem.upgradeTime = original.upgrade.time[origin.level - 1] ?? 0;
				newItem.hallMaxLevel = original.levels[data.townHallLevel - 1];
			}

			if (UNIT) {
				newItem.id = UNIT.id;
				newItem.housingSpace = UNIT.housingSpace;
				newItem.unlockCost = UNIT.unlock.cost;
				newItem.unlockTime = UNIT.unlock.time;
				newItem.unlockResource = UNIT.unlock.resource;
				newItem.unlockBuilding = UNIT.unlock.building;
				newItem.unlockTownHallLevel = UNIT.unlock.hall;
				newItem.unlockBuildingLevel = UNIT.unlock.buildingLevel;
				newItem.upgradeResource = UNIT.upgrade.resource;
				newItem.upgradeCost = UNIT.upgrade.cost[newItem.level - 1] ?? 0;
				newItem.upgradeTime = UNIT.upgrade.time[newItem.level - 1] ?? 0;
				newItem.hallMaxLevel = UNIT.levels[(item.village === 'home' ? data.townHallLevel : data.builderHallLevel) - 1];
			}

			return newItem;
		};

		return Object.assign(data, {
			name: data.name,
			tag: data.tag,
			townHallLevel: data.townHallLevel,
			townHallWeaponLevel: data.townHallWeaponLevel ?? null,
			expLevel: data.expLevel,
			trophies: data.trophies,
			bestTrophies: data.bestTrophies,
			warStars: data.warStars,
			attackWins: data.attackWins,
			defenseWins: data.defenseWins,
			builderHallLevel: data.builderHallLevel ?? null,
			versusTrophies: data.versusTrophies ?? null,
			bestVersusTrophies: data.bestVersusTrophies ?? null,
			versusBattleWins: data.versusBattleWins ?? null,
			donations: data.donations,
			donationsReceived: data.donationsReceived,
			role: data.role ?? null,
			clan: data.clan ?? null,
			league: data.league ?? null,
			legendStatistics: data.legendStatistics ?? null,
			achievements: data.achievements ?? [],
			labels: data.labels ?? [],
			troops: data.troops.map(item => parseUnits(data, item, 'troop')) ?? [],
			spells: data.spells.map(item => parseUnits(data, item, 'spell')) ?? [],
			heroes: data.heroes.map(item => parseUnits(data, item, 'hero')) ?? []
		});
	}
};
