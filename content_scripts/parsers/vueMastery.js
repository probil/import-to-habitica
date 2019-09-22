import { nodeListToChecklistItems } from './utils'

export default () => {
  const getText = doc => doc.querySelector('h2.title').innerText;
  const getChecklistItems = (doc) => {
    const selectors = doc.querySelectorAll('.lessons-list .list-item-title');
    return nodeListToChecklistItems(selectors);
  };

  return { getText, getChecklistItems }
};
