export interface Score {
  L: number; // Leadership/Action
  E: number; // Empathy/Sense
}

export interface Choice {
  text: string;
  delta: Score;
}

export interface Question {
  id: number;
  scenario: string;
  choices: Choice[];
}

export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  RESULT = 'RESULT',
}

export interface ResultType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  score: number; // Survival score
  condition: (score: Score) => boolean;
  color: string;
  advice: string[]; // List of specific tips
}