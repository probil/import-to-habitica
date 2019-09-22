import { nodeListToChecklistItems } from './utils'

export default () => {
  const getText = doc => doc.querySelector('h1').innerText;
  const getChecklistItems = doc => {
    const selectors = doc.querySelectorAll('h3');
    return nodeListToChecklistItems(selectors);
  };

  return { getText, getChecklistItems }
};
