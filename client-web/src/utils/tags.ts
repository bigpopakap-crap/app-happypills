export interface MoodLevel {
  value: 2 | 1 | 0 | -1 | -2;
  emoji: '😀' | '🙂' | '😐' | '🙁' | '😞' | '😶';
}

export const NONE: MoodLevel = {
  value: 0,
  emoji: '😶'
};

export const STRONG_POSITIVE: MoodLevel = {
  value: 2,
  emoji: '😀'
};

export const POSITIVE: MoodLevel = {
  value: 1,
  emoji: '🙂'
};

export const NEUTRAL: MoodLevel = {
  value: 0,
  emoji: '😐'
};

export const NEGATIVE: MoodLevel = {
  value: -1,
  emoji: '🙁'
};

export const STRONG_NEGATIVE: MoodLevel = {
  value: -2,
  emoji: '😞'
};
