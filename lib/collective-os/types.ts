export type AgeGroup = "18-24" | "25-39" | "40-64" | "65+";
export type Ideology = "Right" | "Left" | "Apolitical" | "Other";
export type Income = "Low" | "Medium" | "High";
export type Education = "Basic" | "Secondary" | "Higher";
export type AreaType = "Urban" | "Suburban" | "Rural";
export type Trust = "Low" | "Medium" | "High";
export type Adoption = "Early" | "Mainstream" | "Late";
export type PriceSensitivity = "Low" | "Medium" | "High";
export type MapMode = "map" | "satellite";

export type Person = {
  id: number;
  name: string;
  age: number;
  ageGroup: AgeGroup;
  ideology: Ideology;
  income: Income;
  education: Education;
  areaType: AreaType;
  trust: Trust;
  adoption: Adoption;
  priceSensitivity: PriceSensitivity;
  x: number;
  y: number;
};

export type ManualStats = {
  right: number;
  left: number;
  apolitical: number;
  other: number;

  lowIncome: number;
  mediumIncome: number;
  highIncome: number;

  age18_24: number;
  age25_39: number;
  age40_64: number;
  age65Plus: number;

  basicEducation: number;
  secondaryEducation: number;
  higherEducation: number;

  urban: number;
  suburban: number;
  rural: number;

  lowTrust: number;
  mediumTrust: number;
  highTrust: number;

  earlyAdopters: number;
  mainstreamAdopters: number;
  lateAdopters: number;

  lowPriceSensitivity: number;
  mediumPriceSensitivity: number;
  highPriceSensitivity: number;
};