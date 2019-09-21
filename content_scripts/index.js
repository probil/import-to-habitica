const frontendMastersStrategy = {
  name: 'FrontendMasters',
  regexp: /^https:\/\/frontendmasters\.com\/courses\/(?:[\w-]+)\/?$/
};


const eggheadStrategy = {
  name: 'EggHead',
  regexp: /^https:\/\/egghead\.io\/courses\/(?:[\w-]+)\/?$/
};

const detectStrategy = () => {
  const strategies = [
    frontendMastersStrategy,
    eggheadStrategy,
  ];
  return strategies.find(strategy => new RegExp(strategy.regexp).test(location.href));
};

chrome.runtime.onMessage.addListener((_, __, sendResponse) => {
  console.log("something happening from the extension");
  sendResponse({
    strategy: detectStrategy(),
  });
});
