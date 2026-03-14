import type { ManualStats } from "./types";
import type { SimulationResult, StimulusFormState } from "./types";

export const DEFAULT_STIMULUS_FORM: StimulusFormState = {
  type: "advertising",
  title: "",
  description: "",
  tone: "Neutral",
  channel: "Social media",
  pricePoint: "",
  cta: "",
};

export const DEFAULT_SIMULATION_RESULT: SimulationResult = {
  publicAcceptance: 68,
  purchaseIntent: 42,
  trustImpact: 57,
  virality: 61,
  negativeReaction: 23,
};

export const ACCENT = "#FF5500";

export const ZURICH_PATH = `M578 95L585 51L602.5 68.5L627 40L612 11.5L652 0L718 40L746.5 95L764 153L845 179.5L983 142L995.5 104.5H1030.5V142L1079 159.5L1052.5 262.5L1030.5 312.5L995.5 299L898.5 240.5V341L1038 371L1098.5 401.5L1142 441L1112 460.5L1089.5 464L1122 535.5L1242 559L1248 612L1224 750.5L1283 861H1333.5V888H1283L1260 968.527L1322 998L1356.5 1050.5L1428 1154.5L1443.5 1249.5L1428 1294L1333.5 1346L1368 1381.5L1333.5 1436L1175 1493H1038L984 1526H824.5L586.5 1381.5L465.5 1165.5L423 1083.5V1201.59L555 1448.5L677.5 1481.5L824.5 1634L767 1663.5V1756.5L721.5 1784.5L619.5 1731.5L515.5 1590L287.5 1618L138.5 1566L69 1346L218.5 1201.59L129 1228.5L13 968.527L47 851L13 703L0 612L129 483L140 422L309.5 385.5L297 357.5H234L218.5 312.5L372.5 200L489 262.5L452.5 341V472L465.5 464L517 349.5L553 299V179.5L578 95Z`;

export const VIEWBOX_WIDTH = 1443.5;
export const VIEWBOX_HEIGHT = 1784.5;

export const SAMPLE_NAMES = [
  "Luca Meier",
  "Anna Keller",
  "Noah Weber",
  "Mia Schmid",
  "Elias Frei",
  "Lea Baumann",
  "Jonas Huber",
  "Nina Steiner",
  "David Brunner",
  "Sofia Vogel",
  "Lina Graf",
  "Jan Roth",
  "Clara Ziegler",
  "Leo Koch",
  "Emma Hofmann",
  "Paul Zimmermann",
];

export const DEFAULT_STATS: ManualStats = {
  right: 40,
  left: 40,
  apolitical: 10,
  other: 10,

  lowIncome: 25,
  mediumIncome: 55,
  highIncome: 20,

  age18_24: 14,
  age25_39: 31,
  age40_64: 37,
  age65Plus: 18,

  basicEducation: 20,
  secondaryEducation: 45,
  higherEducation: 35,

  urban: 52,
  suburban: 33,
  rural: 15,

  lowTrust: 22,
  mediumTrust: 48,
  highTrust: 30,

  earlyAdopters: 16,
  mainstreamAdopters: 59,
  lateAdopters: 25,

  lowPriceSensitivity: 18,
  mediumPriceSensitivity: 50,
  highPriceSensitivity: 32,
};