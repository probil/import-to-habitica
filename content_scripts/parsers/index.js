import vueMasteryParser from './vueMastery';
import eggHeadParser from './eggHead';
import freecodecampParser from './freecodecamp';
import frontendMastersParser from './frontendMasters';
import pluralsightParser from './pluralsight';

import {
  VUEMASTERY,
  EGGHEAD,
  FREECODECAMP,
  FRONTENDMASTERS,
  PLURALSIGHT,
} from '../constants/resources'

const createStrategy = (strategy) => {
  const getDesc = (window) => window.location.href;
  return { getDesc, ...strategy() };
};

export const getParserByStrategy = name => {
  const nameToStrategy = {
    [VUEMASTERY]: createStrategy(vueMasteryParser),
    [EGGHEAD]: createStrategy(eggHeadParser),
    [FREECODECAMP]: createStrategy(freecodecampParser),
    [FRONTENDMASTERS]: createStrategy(frontendMastersParser),
    [PLURALSIGHT]: createStrategy(pluralsightParser)
  };
  return nameToStrategy[name];
};

