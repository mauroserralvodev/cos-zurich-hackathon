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
  sentiment: number;
  sentimentLabel: "Positive" | "Neutral" | "Negative";
  zoneType: "Zurich Core" | "Urban Belt" | "Rural";
  x: number;
  y: number;
  topDriver?: string;
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

export type DashboardPhase = "setup" | "stimulus" | "results";

export type StimulusType =
  | "advertising"
  | "government"
  | "political"
  | "product-launch";

export type SimulationResult = {
  publicAcceptance: number;
  purchaseIntent: number;
  trustImpact: number;
  virality: number;
  negativeReaction: number;
};

export type StimulusFormState = {
  type: StimulusType;

  title: string;
  description: string;

  tone: "Neutral" | "Optimistic" | "Urgent" | "Provocative";
  channel: "Social media" | "Billboard" | "TV" | "Press";

  audienceGoal: string;

  pricePoint: string;
  cta: string;
  brandName: string;

  policyArea: string;
  impactScope: "Local" | "Regional" | "National";
  institutionSource: string;

  candidate: string;
  issueFocus: string;
  slogan: string;
};

export type ParameterBlockId =
  | "age"
  | "income"
  | "education"
  | "urbanContext"
  | "ideology"
  | "institutionalTrust"
  | "innovationAdoption"
  | "priceSensitivity";

export type SentimentDistribution = {
  positive: number;
  neutral: number;
  negative: number;
};

export type SegmentSummary = {
  label: string;
  count: number;
  share: number;
  averageSentiment: number;
  positiveRate: number;
  negativeRate: number;
};

export type DriverSummary = {
  label: string;
  spread: number;
  strongestPositive: string;
  strongestNegative: string;
};

export type SimulationAnalysis = {
  sentimentDistribution: SentimentDistribution;
  polarization: number;
  topSupportiveSegments: SegmentSummary[];
  topResistantSegments: SegmentSummary[];
  zoneBreakdown: SegmentSummary[];
  leadingDrivers: DriverSummary[];
};

export type SimulationTraceEntry = {
  level: "info" | "success" | "warning";
  message: string;
  highlight?: string[];
};

export type OperationalReview = {
  status: "stable" | "review" | "escalate" | "error";
  riskBand: "low" | "medium" | "high" | "unknown";
  consistencyChecks: string[];
  recommendedAction: string;
  reviewNotes: string[];
};