const credentials = {
  apiKey: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  userId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
};


const nodeListToChecklistItems = nodeList => {
  return [...nodeList]
    .map(item => item.innerText)
    .filter(item => !!item)
};

const vueMasteryStrategy = () => {
  const getText = doc => doc.querySelector('h2.title').innerText;
  const getChecklistItems = (doc) => {
    const selectors = doc.querySelectorAll('.lessons-list .list-item-title');
    return nodeListToChecklistItems(selectors);
  };

  return { getText, getChecklistItems }
};

const eggHeadStrategy = () => {
  const getText = doc => doc.querySelector('h1').innerText;

  const getChecklistItems = (doc) => {
    const selectors = doc.querySelectorAll('.black.ma0.mb1.no-underline.db.pl0.tl.f4.fw5.sans-serif.pointer.lh-text.relative');
    return nodeListToChecklistItems(selectors);
  };

  return { getText, getChecklistItems }
};

const freeCodeCampStrategy = () => {
  const getText = doc => doc.title;
  const getChecklistItems = doc => {
    const selectors = doc.querySelectorAll('.intro-toc > a > span.list-group-item');
    return nodeListToChecklistItems(selectors);
  };

  return { getText, getChecklistItems }
};

const frontendMastersStrategy = () => {
  const getText = doc => doc.querySelector('h1').innerText;
  const getChecklistItems = doc => {
    const selectors = doc.querySelectorAll('h3');
    return nodeListToChecklistItems(selectors);
  };

  return { getText, getChecklistItems }
};

const pluralsightStrategy = () => {
  const getText = doc => doc.querySelector('h1').innerText + ' ' +doc.querySelector('.course-hero__byline').innerText;
  const getChecklistItems = (doc) => {
    const selectors = doc.querySelectorAll('.l-course-page__content a[target="psplayer"]');
    return nodeListToChecklistItems(selectors);
  };

  return { getText, getChecklistItems }
};



const createStrategy = (strategy) => {
  const getDesc = (window) => window.location.href;
  return { getDesc, ...strategy() };
};

const getStrategyByName = name => {
  const nameToStrategy = {
    'vuemastery': createStrategy(vueMasteryStrategy),
    'egghead': createStrategy(eggHeadStrategy),
    'freecodecamp': createStrategy(freeCodeCampStrategy),
    'frontendmasters': createStrategy(frontendMastersStrategy),
    'pluralsight': createStrategy(pluralsightStrategy)
  };
  return nameToStrategy[name];
};



const createTaskOnHabitica = credentials => task => {
  return fetch('https://habitica.com/api/v3/tasks/user', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Api-Key': credentials.apiKey,
      'X-Api-User': credentials.userId,
    },
    body: JSON.stringify(task),
  });
};

const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

const makeChecklistItem = text => ({
  text,
  id: guid(),
  completed: false
});

const makeTaskItem = ({ text, notes, checklist, type = 'todo' }) => ({
  type,
  text,
  notes,
  checklist,
  collapseChecklist: true,
});



const startImport = async (credentials, strategyName) => {
  const createTaskForUser = createTaskOnHabitica(credentials);
  const { getText, getDesc, getChecklistItems } = getStrategyByName(strategyName);
  const preparedTask = makeTaskItem({
    text: getText(document),
    notes: getDesc(window),
    checklist: getChecklistItems(document).map(makeChecklistItem),
  });
  return await createTaskForUser(preparedTask);
};


startImport(credentials, 'pluralsight');
