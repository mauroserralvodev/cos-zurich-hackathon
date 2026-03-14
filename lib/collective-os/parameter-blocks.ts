import type { ParameterBlockId } from "./types";

export const PARAMETER_BLOCK_OPTIONS: {
  id: ParameterBlockId;
  label: string;
  description: string;
}[] = [
  {
    id: "age",
    label: "Age",
    description: "Population split by age group.",
  },
  {
    id: "income",
    label: "Income",
    description: "Low, medium and high income distribution.",
  },
  {
    id: "education",
    label: "Education",
    description: "Basic, secondary and higher education levels.",
  },
  {
    id: "urbanContext",
    label: "Urban context",
    description: "Urban, suburban and rural composition.",
  },
  {
    id: "ideology",
    label: "Ideology",
    description: "Political and social orientation of the population.",
  },
  {
    id: "institutionalTrust",
    label: "Institutional trust",
    description: "Confidence in institutions and official messaging.",
  },
  {
    id: "innovationAdoption",
    label: "Innovation adoption",
    description: "How fast different groups adopt new products.",
  },
  {
    id: "priceSensitivity",
    label: "Price sensitivity",
    description: "How strongly price affects user decisions.",
  },
];

export const DEFAULT_PARAMETER_BLOCKS: ParameterBlockId[] = [

];