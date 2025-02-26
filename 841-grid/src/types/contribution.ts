export interface ContributionData {
  index: number;
  amount: number;
  source: string;
  color: string;
}

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  index: number;
  level: ContributionLevel;
  amount: number;
  source: string;
  color: string;
} 