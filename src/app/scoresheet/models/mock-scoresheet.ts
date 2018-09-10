import { ScoreCategory } from './score-category';
import { ScoreMetric } from './score-metric';
import { UserScoresheetElement } from './user-scoresheet-element';
import { ParentScoreCategory } from './parent-score-category';

/**
 * PARENT SCORE CATEGORIES
 */
export const buildingSkills: ParentScoreCategory = {
  id: 1,
  name: 'Building Skills'
};

export const tumblingSkills: ParentScoreCategory = {
  id: 2,
  name: 'Tumbling Skills'
};

export const overallRoutine: ParentScoreCategory = {
  id: 3,
  name: 'Overall Routine'
};

export const others: ParentScoreCategory = {
  id: 4,
  name: 'Others'
};

/**
 * SCORE CATEGORES
 */

export const stunts: ScoreCategory = {
  id: 1,
  name: 'Stunts',
  parentScoreCategory: buildingSkills
};

export const pyramids: ScoreCategory = {
  id: 2,
  name: 'Pyramids',
  parentScoreCategory: buildingSkills
};

export const tosses: ScoreCategory = {
  id: 3,
  name: 'Tosses',
  parentScoreCategory: buildingSkills
};

export const quantityCoed: ScoreCategory = {
  id: 4,
  name: 'Quantity/Coed',
  parentScoreCategory: buildingSkills
};

export const standingTumbling: ScoreCategory = {
  id: 5,
  name: 'Standing Tumbling',
  parentScoreCategory: tumblingSkills
};
export const runningTumbling: ScoreCategory = {
  id: 6,
  name: 'Running Tumbling',
  parentScoreCategory: tumblingSkills
};
export const jumps: ScoreCategory = {
  id: 7,
  name: 'Jumps',
  parentScoreCategory: tumblingSkills
};
export const routineComposition: ScoreCategory = {
  id: 8,
  name: 'Routine Composition',
  parentScoreCategory: overallRoutine
};
export const performance: ScoreCategory = {
  id: 9,
  name: 'Performance',
  parentScoreCategory: overallRoutine
};
export const dance: ScoreCategory = {
  id: 10,
  name: 'Dance',
  parentScoreCategory: overallRoutine
};

export const comments: ScoreCategory = {
  id: 10,
  name: 'Observations',
  parentScoreCategory: others
};
/**
 * SCORE METRICS
 */
export const difficulty: ScoreMetric = {
  id: 1,
  name: 'Difficulty'
};
export const technique: ScoreMetric = {
  id: 2,
  name: 'Technique'
};
export const creativity: ScoreMetric = {
  id: 3,
  name: 'Creativity'
};
export const text: ScoreMetric = {
  id: 4,
  name: 'text'
};

export const SCORESHEETS: UserScoresheetElement[] = [
  // Building skills
  {
    id: 1,
    minScore: 1,
    maxScore: 5,
    value: '',
    scoreMetric: difficulty,
    scoreCategory: stunts
  },
  {
    id: 2,
    minScore: 1,
    maxScore: 5,
    value: '',
    scoreMetric: technique,
    scoreCategory: stunts
  },
  {
    id: 3,
    minScore: 1,
    maxScore: 2.5,
    value: '',
    scoreMetric: creativity,
    scoreCategory: stunts
  },
  {
    id: 4,
    minScore: 1,
    maxScore: 5,
    value: '',
    scoreMetric: difficulty,
    scoreCategory: pyramids
  },
  {
    id: 5,
    minScore: 1,
    maxScore: 5,
    value: '',
    scoreMetric: technique,
    scoreCategory: pyramids
  },
  {
    id: 6,
    minScore: 1,
    maxScore: 2.5,
    value: '',
    scoreMetric: creativity,
    scoreCategory: pyramids
  },
  {
    id: 7,
    minScore: 1,
    maxScore: 5,
    value: '',
    scoreMetric: difficulty,
    scoreCategory: tosses
  },
  {
    id: 8,
    minScore: 1,
    maxScore: 5,
    value: '',
    scoreMetric: technique,
    scoreCategory: tosses
  },
  {
    id: 9,
    minScore: 1,
    maxScore: 5,
    value: '',
    scoreMetric: difficulty,
    scoreCategory: quantityCoed
  },
  // Tumbling skills
  {
    id: 10,
    minScore: 1,
    maxScore: 5,
    value: '',
    scoreMetric: difficulty,
    scoreCategory: standingTumbling
  },
  {
    id: 11,
    minScore: 1,
    maxScore: 5,
    value: '',
    scoreMetric: technique,
    scoreCategory: standingTumbling
  },
  {
    id: 12,
    minScore: 1,
    maxScore: 5,
    value: '',
    scoreMetric: difficulty,
    scoreCategory: runningTumbling
  },
  {
    id: 13,
    minScore: 1,
    maxScore: 5,
    value: '',
    scoreMetric: technique,
    scoreCategory: runningTumbling
  },
  {
    id: 14,
    minScore: 1,
    maxScore: 5,
    value: '',
    scoreMetric: difficulty,
    scoreCategory: jumps
  },
  {
    id: 15,
    minScore: 1,
    maxScore: 5,
    value: '',
    scoreMetric: technique,
    scoreCategory: jumps
  },
  // Overall routine
  {
    id: 16,
    minScore: 1,
    maxScore: 2,
    value: '',
    scoreMetric: difficulty,
    scoreCategory: routineComposition
  },
  {
    id: 17,
    minScore: 1,
    maxScore: 2,
    value: '',
    scoreMetric: difficulty,
    scoreCategory: performance
  },
  {
    id: 18,
    minScore: 1,
    maxScore: 2,
    value: '',
    scoreMetric: difficulty,
    scoreCategory: dance
  },
  // Comments
  {
    id: 19,
    minScore: 0,
    maxScore: 0,
    value: '',
    scoreMetric: text,
    scoreCategory: comments
  }
];
