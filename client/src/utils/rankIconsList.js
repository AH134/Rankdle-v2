const rankSrc = (rankName, gameName) => {
  return `/images/games/${gameName}/rank-icons/${rankName}.webp`;
};

const lolRankNames = [
  "iron",
  "bronze",
  "silver",
  "gold",
  "platinum",
  "diamond",
  "master",
  "grandmaster",
  "challenger",
];

const valRankNames = [
  "iron",
  "bronze",
  "silver",
  "gold",
  "platinum",
  "diamond",
  "ascendant",
  "immortal",
  "radiant",
];

const apexRankNames = [
  "bronze",
  "silver",
  "gold",
  "platinum",
  "diamond",
  "master",
  "predator",
];

const rankIconsList = {
  lol: lolRankNames.map((rankName, index) => {
    return {
      id: index,
      name: rankName,
      src: rankSrc(rankName, "lol"),
    };
  }),
  valorant: valRankNames.map((rankName, index) => {
    return {
      id: index,
      name: rankName,
      src: rankSrc(rankName, "valorant"),
    };
  }),
  apex: apexRankNames.map((rankName, index) => {
    return {
      id: index,
      name: rankName,
      src: rankSrc(rankName, "apex"),
    };
  }),
};

export default rankIconsList;
