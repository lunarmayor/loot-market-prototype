const loot = require("./data/loot.json");

const fs = require("fs");

const lootMap = loot.reduce((fullMap, loot, i) => {
  let bag = loot[(i + 1).toString()];

  let positions = Object.keys(bag).map(position => {
    fullMap[bag[position]] = position;
  });

  return fullMap;
}, {});

fs.writeFileSync("itemToPositionMap.json", JSON.stringify(lootMap));
