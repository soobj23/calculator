export type Theme = 'neon' | 'retro' | 'space' | 'nature';

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForOperand: boolean;
  memory: number;
}
