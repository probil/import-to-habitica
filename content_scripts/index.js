import { getParserByStrategy } from './parsers'
import { FRONTENDMASTERS, EGGHEAD } from './constants/resources'

const frontendMastersStrategy = {
  regexp: /^https:\/\/frontendmasters\.com\/courses\/(?:[\w-]+)\/?$/,
  strategy: FRONTENDMASTERS
};


const eggheadStrategy = {
  regexp: /^https:\/\/egghead\.io\/courses\/(?:[\w-]+)\/?$/,
  strategy: EGGHEAD,
};

const detectStrategy = () => {
  const strategies = [
    frontendMastersStrategy,
    eggheadStrategy,
  ];
  return strategies.find(strategy => new RegExp(strategy.regexp).test(location.href));
};

chrome.runtime.onMessage.addListener((_, __, sendResponse) => {
  const strategy = detectStrategy();
  let task = null;
  if(strategy) {
    const parser = getParserByStrategy(strategy);
    if(parser) {
      const { getText, getDesc, getChecklistItems } = getParserByStrategy(strategy)
      task = {
        text: getText(document),
        notes: getDesc(window),
        checklist: getChecklistItems(document).map(makeChecklistItem),
      };
    }
  }

  sendResponse({
    strategy,
    task
  });
});
