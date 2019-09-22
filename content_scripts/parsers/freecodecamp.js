import { nodeListToChecklistItems } from './utils'

export default () => {
  const getText = doc => doc.title;
  const getChecklistItems = doc => {
    const selectors = doc.querySelectorAll('.intro-toc > a > span.list-group-item');
    return nodeListToChecklistItems(selectors);
  };

  return { getText, getChecklistItems }
};
