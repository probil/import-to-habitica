import { getParserByResource } from './parsers'
import { FRONTENDMASTERS, EGGHEAD } from './constants/resources'

const frontendMastersStrategy = {
  regexp: /^https:\/\/frontendmasters\.com\/courses\/(?:[\w-]+)\/?$/,
  resource: FRONTENDMASTERS
};


const eggheadStrategy = {
  regexp: /^https:\/\/egghead\.io\/courses\/(?:[\w-]+)\/?$/,
  resource: EGGHEAD,
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
    const parser = getParserByResource(strategy.resource);
    if(parser) {
      const { getText, getDesc, getChecklistItems } = parser;
      task = {
        text: getText(document),
        notes: getDesc(window),
        checklist: getChecklistItems(document)
      };
    }
  }

  sendResponse({
    strategy,
    task
  });
});
