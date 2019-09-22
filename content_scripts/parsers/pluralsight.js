import { nodeListToChecklistItems } from './utils'

export default () => {
  const getText = doc => doc.querySelector('h1').innerText + ' ' +doc.querySelector('.course-hero__byline').innerText;
  const getChecklistItems = (doc) => {
    const selectors = doc.querySelectorAll('.l-course-page__content a[target="psplayer"]');
    return nodeListToChecklistItems(selectors);
  };

  return { getText, getChecklistItems }
};
